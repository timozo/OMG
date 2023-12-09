import { DataGrid } from "@mui/x-data-grid";

export default function AllCourses() {
  const rows = [
    { id: 1, col1: "Hello", col2: "World", col3: 1000 },
    { id: 2, col1: "DataGridPro", col2: "is Awesome", col3: 1212 },
    { id: 3, col1: "MUI", col2: "is Amazing", col3: 1212 },
  ];

  const columns = [
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
    { field: "col3", headerName: "Column 3", width: 150, type: "number" },
  ];

  return (
    <div style={{ background: "white" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
