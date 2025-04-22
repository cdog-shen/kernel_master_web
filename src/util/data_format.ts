import { GridColDef } from "@mui/x-data-grid";

export function transformJsonToKeyValueArray(json: Record<string, any>): {
  k: string;
  v:
    | Record<string, any>
    | string
    | number
    | boolean
    | null
    | ReturnType<typeof transformJsonToKeyValueArray>;
}[] {
  return Object.entries(json).map(([key, value]: [string, any]) => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return { k: key, v: "Empty array" };
      }
      return {
        k: key,
        v: value.map((item, index) => ({ key: index, v: item })),
      };
    } else if (typeof value === "object" && value !== null) {
      return { k: key, v: transformJsonToKeyValueArray(value) };
    }
    return { k: key, v: value };
  });
}

export function transformJson2TableMeta(
  json: Record<string, any>,
  headerMap: Record<string, string>,
  isFlex: number = 1
): GridColDef[] {
  return Object.keys(json).map((key) => ({
    field: key,
    headerName: headerMap[key] || key,
    // width: 10,
    type: ["string", "number", "boolean", "date"].includes(typeof json[key])
      ? (typeof json[key] as GridColDef["type"])
      : undefined,
    flex: isFlex,
  }));
}

export function transformJson2TableData(
  json: Record<string, any>,
  col: GridColDef[]
): Record<string, any>[] {
  return json.map((item: Record<string, any>) => {
    const row: Record<string, any> = {};
    col.forEach((column) => {
      row[column.field] = item[column.field];
    });
    return row;
  });
}
