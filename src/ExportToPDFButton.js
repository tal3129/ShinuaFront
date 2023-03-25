import { Share } from "@mui/icons-material";
import { Alert, Backdrop, Button, CircularProgress, Snackbar } from "@mui/material";
import { useState } from "react";

const fetch_pdf = (order_id) => {
  return fetch("http://localhost:8000/orders/gQnhAxx0HTEowoaoeyg9/export_pdf"); // FIXME
};

const download_blob = (blob, filename) => {
  // this is a bit of a hack
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

const ExportToPDFButton = ({ order_id }) => {
  const [exporting, setExporting] = useState(false);
  const [exportingErrorOpen, setExportingErrorOpen] = useState(false);

  const handleClose = () => {
    setExportingErrorOpen(false);
  };

  const handleExport = () => {
    setExporting(true);
    fetch_pdf(order_id)
      .then(response => response.blob())
      .then(blob => download_blob(blob, `order_${order_id}.pdf`))
      .catch(err => {
        console.error(err);
        setExportingErrorOpen(true);
      })
      .finally(setExporting(false));
  };

  return (<>
    <Button startIcon={<Share sx={{ml: 1}} />} onClick={handleExport}>ייצא ל-PDF</Button>
    <Snackbar open={exportingErrorOpen} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Error while exporting
      </Alert>
    </Snackbar>
    <Backdrop open={exporting} sx={{ color: '#fff'}}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  </>);
};

export default ExportToPDFButton;
