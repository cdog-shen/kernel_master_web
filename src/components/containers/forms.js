import { Fragment, useState } from "react";

export function DynEditableForm({ title, headerArr, dataArr, editEffect }) {
  const [editIdx, setEditIdx] = useState(-1);
  const [formData, setFormData] = useState(dataArr);

  const handleEditClick = (index) => {
    setEditIdx(index);
  };

  const handleInputChange = (e, rowIndex, key) => {
    const newData = [...formData];
    newData[rowIndex][key] = e.target.value;
    setFormData(newData);
  };

  const handleSaveClick = (rowIndex) => {
    const fetchData = formData[rowIndex];
    if (editEffect) {
      try {
        const [status, info] = editEffect(fetchData);
        console.log(info);
        if (status) {
          setEditIdx(-1);
        }
      } catch (error) {
        console.error("Error when update data:", error);
      }
    }
  };

  const renderCellValue = (value, rowIndex, key) => {
    if (Array.isArray(value)) {
      return (
        <div>
          <input
            key={`${rowIndex}-${key}`}
            type="text"
            value={value ? value : "[]"}
            onChange={(e) => handleInputChange(e, rowIndex, key)}
            className="px-2 py-1 border rounded mb-1"
          />
        </div>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <div>
          <input
            type="text"
            value={value ? JSON.stringify(value) : "{}"}
            onChange={(e) => handleInputChange(e, rowIndex, key)}
            className="px-2 py-1 border rounded mb-1"
          />
        </div>
      );
    } else {
      return (
        <input
          type="text"
          value={value ? value : ""}
          onChange={(e) => handleInputChange(e, rowIndex, key)}
          className="px-2 py-1 border rounded"
        />
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full overflow-x-auto">
      <p className="text-sm mt-2">{title ? title : "A DynEditableForm"}</p>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headerArr.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {formData.map((dataObj, rowIndex) => (
              <tr key={rowIndex}>
                {Object.entries(dataObj).map(([key, value], colIndex) => (
                  <td
                    key={colIndex}
                    className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {editIdx === rowIndex
                      ? renderCellValue(value, rowIndex, key)
                      : Array.isArray(value)
                      ? value.join(", ")
                      : typeof value === "object" && value !== null
                      ? JSON.stringify(value)
                      : value}
                  </td>
                ))}
                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editIdx === rowIndex ? (
                    <button
                      onClick={() => handleSaveClick(rowIndex)}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(rowIndex)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
