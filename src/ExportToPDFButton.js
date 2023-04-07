import { Share } from "@mui/icons-material";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { getOrderPDF } from "./api_calls";
import { useCustomSnackbar } from "./snackbar_utils";

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
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();

  const handleExport = () => {
    setExporting(true);
    getOrderPDF(order_id)
      .then(response => response.blob())
      .then(blob => download_blob(blob, `order_${order_id}.pdf`))
      .catch(err => {
        showErrorSnackbar("export-pdf-error", "שגיאה בייצוא ל-PDF");
      })
      .finally(setExporting(false));
  };


  return (<>
    <Button startIcon={<Share sx={{ ml: 1 }} />} onClick={handleExport}>ייצא ל-PDF</Button>
    <Backdrop open={exporting} sx={{ color: '#fff' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  </>);
};

export default ExportToPDFButton;
