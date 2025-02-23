import { Fragment, useState } from "react";

export function PopOutDialog({ head, hint, newEffect, headerArr }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(
    headerArr?.reduce((acc, header) => {
      acc[header] = null;
      return acc;
    }, {})
  );

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="mb-4 flex justify-end">
      <button
        onClick={() => handleOpen()}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {head ? head : "Pop Out"}
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {head ? head : "Pop Out"}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {headerArr?.map((header) => (
                <Fragment key={header}>
                  <label className="block text-lg font-medium text-gray-700">
                    {header}
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData[header] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [header]: e.target.value })
                    }
                  />
                </Fragment>
              ))}
            </div>
            <div className="mb-4 text-gray-500 text-sm">
              {hint ? hint : "请填写以上表单字段，然后点击保存。"}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                onClick={() => handleClose(false)}
              >
                关闭
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => {
                  console.log("formData:", formData);
                  if (newEffect) {
                    newEffect(formData);
                  }
                  handleClose(false);
                }}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
