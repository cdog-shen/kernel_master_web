import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";

interface EditableDataGridProps {
  title: string;
  rows: readonly any[];
  columns: readonly GridColDef[];
  funObject: {
    new?: Function;
    edit?: Function;
    delete?: Function;
    refresh?: Function;
  };
}

const EditableDataGrid: React.FC<EditableDataGridProps> = ({
  title,
  rows,
  columns,
  funObject,
}) => {
  const [selectionModel, setSelectionModel] = useState<any>([]);
  const [open, setOpen] = useState(0);

  const handleOpen = (index: number) => setOpen(index);
  const handleClose = () => setOpen(0);

  return (
    <Paper elevation={10} sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ m: 1, px: 2 }}>
        {title}
      </Typography>
      {/* // edit Dialog */}
      <Dialog open={open === 1} onClose={handleClose}>
        <DialogTitle>修改</DialogTitle>
        {}
        <DialogContent>
          {selectionModel.length > 0
            ? `选中 ${selectionModel.length} 行`
            : "请选中一行进行修改"}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button
            onClick={() => {
              handleClose();
              funObject.edit ? funObject.edit(selectionModel) : null;
            }}
            color="primary"
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>

      {/* // delete Dialog */}
      <Dialog open={open === 2} onClose={handleClose}>
        <DialogTitle>删除确认</DialogTitle>
        <DialogContent>
          {selectionModel.length > 0
            ? `确定删除第 ${selectionModel} 行吗？`
            : "请选中一行进行删除"}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button
            onClick={() => {
              handleClose();
              funObject.delete ? funObject.delete(selectionModel) : null;
            }}
            color="error"
          >
            删除
          </Button>
        </DialogActions>
      </Dialog>
      <Paper sx={{ height: 400, width: "100%", px: 1, py: 2, m: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          // disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          rowSelectionModel={selectionModel}
          sx={{ border: 0 }}
          columnVisibilityModel={{
            autoWidth: true,
          }}
        />
      </Paper>
      {funObject.refresh && (
        <Button
          color="inherit"
          variant="contained"
          onClick={() => (funObject.refresh ? funObject.refresh() : null)}
          sx={{ m: 1, px: 2, py: 1 }}
        >
          刷新
        </Button>
      )}
      {funObject.edit && selectionModel.length == 1 && (
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            handleOpen(1);
            console.log(selectionModel);
            funObject.edit ? funObject.edit() : null;
          }}
          sx={{ m: 1, px: 2, py: 1 }}
        >
          修改
        </Button>
      )}
      {funObject.delete && selectionModel.length == 1 && (
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            handleOpen(2);
            funObject.delete ? funObject.delete() : null;
          }}
          sx={{ m: 1, px: 2, py: 1 }}
        >
          删除
        </Button>
      )}
      {funObject.new && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => (funObject.new ? funObject.new() : null)}
          sx={{ m: 1, px: 2, py: 1 }}
        >
          新建
        </Button>
      )}
    </Paper>
  );
};

export default EditableDataGrid;
