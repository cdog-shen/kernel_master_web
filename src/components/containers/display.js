export function DisplayCard({
  header,
  singleLayerObject = {},
  valueMapFun = (data) => {
    switch (typeof data) {
      case "boolean":
        return `${data ? "Yes" : "No"}`;

      case "object":
        if (Array.isArray(data)) {
          return `${data.join(", ")}`;
        } else if (data === null) {
          return "N/A";
        } else {
          return `${JSON.stringify(data)}`;
        }

      case "undefined":
        return "undefined";

      default:
        return `${data}`;
    }
  },
}) {
  var id = 0;
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 m-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{header}</h2>
      <div className="space-y-4">
        {/* Name */}
        {Object.entries(singleLayerObject).map((kvArray) => {
          return (
            <div key={id++} className="flex items-center">
              <span className="text-gray-600 font-medium w-32">
                {kvArray[0]}
              </span>
              <span className="text-gray-800">
                {valueMapFun(kvArray[1]) || "N/A"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
