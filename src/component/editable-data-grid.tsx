import { Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

interface EditableDataGridProps {
  rows: readonly any[];
  columns: GridColDef[];
}

const EditableDataGrid: React.FC<EditableDataGridProps> = ({
  rows,
  columns,
}) => {
  return (
    <Paper elevation={10} sx={{ padding: 2 }}>
      <Typography variant="h4" px={1} py={2}>
        用户信息管理
      </Typography>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          columnVisibilityModel={{
            autoWidth: true,
          }}
        />
      </Paper>
    </Paper>
  );
};

export default EditableDataGrid;
