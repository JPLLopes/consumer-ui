import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./App.css";
import { createConsumer, Consumer } from '@rails/actioncable';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const uploadProducts = async (file) => {
  let formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:3000/products/upload", {
    method: "POST",
    body: formData
  })

  return response;
}

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const consumer = createConsumer('ws://localhost:3000/cable');

  const getProducts = async (page, rowsPerPage) => {
    try {
      const response = await fetch(`http://localhost:3000/products/from_sqlserver?page=${page + 1}&per_page=${rowsPerPage}`);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const responseJSON = await response.json();
      setData(responseJSON);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    consumer.subscriptions.create("ProductsChannel", {
      received: async (message) => {
        if (message === "DONE") {
          getProducts(page, rowsPerPage);
        }
      }
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    getProducts(page, rowsPerPage);
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return <>
    <Button
      className="upload-btn"
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={async (event) => {
          await uploadProducts(event.target.files[0]);
        }}
        multiple
      />
    </Button>

    {data.length !== 0 &&
      <DataTable data={data} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
    }
  </>
}

export default App;
