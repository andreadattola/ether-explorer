import React from "react";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/material/Icon";
import { downloadJson } from "../utils/downloadJson";
export const DownloadJson = (props) => {
  const { name, json, children } = props;
  const startDownload = () => {
    const jsonToDownload = new Blob([JSON.stringify(json, undefined, 2)], {
      type: "application/json",
    });
    downloadJson(jsonToDownload, name);
  };
  return (
    <Button
      onClick={startDownload}
      variant="outlined"
      startIcon={<GetAppIcon />}
    >
      {children}
    </Button>
  );
};
