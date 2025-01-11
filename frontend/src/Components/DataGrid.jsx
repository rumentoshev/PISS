import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import PropTypes from "prop-types";

async function fetchData() {
  try {
    const userid = sessionStorage.getItem("userID");
    const response = await fetch(
      `http://localhost:8000/all_user_coll/${userid}`
    );
    if (!response.ok) {
      throw new Error(`Error with status: ${response.statusText}`);
    }
    const collections = await response.json();
    return collections;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      setRows(fetchedData);
    };
    loadData();
  }, []);

  const handleRedirect = (collection_name) => () => {
    navigate(`/coll/${collection_name}`);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id, collection_name) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id, collection_name) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id, collection_name) => {
    try {
      const user_id = sessionStorage.getItem("userID");
      const response = await fetch(
        `http://localhost:8000/delete_coll/${user_id}_${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete collection");
      }

      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    try {
      const response = await fetch(
        `http://localhost:8000/change_collection/${newRow.id}_${newRow.collection_name}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update row: ${response.statusText}`);
      }

      const updatedRow = await response.json();
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
      );
      window.location.reload();
      return updatedRow;
    } catch (error) {
      console.error("Error saving row:", error);

      return { ...newRow, isNew: true };
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddClick = async () => {
    try {
      const user_id = sessionStorage.getItem("userID");
      if (!user_id) {
        throw new Error("User ID not found in session storage");
      }

      const response = await fetch(
        `http://localhost:8000/create_collection/${user_id}_${inputValue}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add the value to the database");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error adding value:", error);
    } finally {
      setInputValue("");
    }
  };

  const columns = [
    {
      field: "collection_name",
      color: "white",
      headerName: "Collection Name",
      width: 180,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 300,
      cellClassName: "actions",
      getActions: (params) => {
        const { id, row } = params;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: "primary.main" }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, row.collection_name)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id, row.collection_name)} // Pass as a function reference
            color="inherit"
          />,
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRedirect(row.collection_name)}
            style={{
              backgroundColor: "orange", // Set background color to orange
            }}
          >
            View Collection
          </Button>,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "40vh",
        width: "100%",
        backgroundColor: "white",
        "& .MuiDataGrid-root": {
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
        },
        "& .MuiDataGrid-cell": {
          borderColor: "black",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#f5f5f5",
          color: "black",
          borderBottom: "1px solid black",
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "#f5f5f5",
          color: "black",
          borderTop: "1px solid black",
        },
        "& .MuiDataGrid-toolbarContainer": {
          backgroundColor: "#f5f5f5",
        },
        "& .MuiButton-root": {
          color: "black",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      <div>
        <input
          style={{ width: '35vw' }}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter the name of the new collection"
        />
        <button onClick={handleAddClick}>Add</button>
      </div>
    </Box>
  );
}
