import { DownloadJson } from "./DownloadJson"
import CsvDownload from "react-json-to-csv";
import * as styles from "../styles/WrapperDownloadButtons.module.css";

export const WrapperDownloadButtons = (props) =>{
    const {result, apiSelected} = props
    return(
        <div className={styles.wrapperDownloadButtons} >
        <CsvDownload  className={styles.csvButton} data={result}>Scarica la tabella in formato CSV</CsvDownload>
        <DownloadJson name={apiSelected} json={result}>
          {" "}
          Scarica il file in formato Json{" "}
        </DownloadJson>
        </div>
    )
}