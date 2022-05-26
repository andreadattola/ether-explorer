import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import { getApiName } from "utils/getApiName";
import { Load } from "./Load";

export const MuiTable = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [dataTable, setDataTable] = React.useState();
  const options = {
    filterType: 'select',
  };
  React.useEffect(() => {
    if (
      !props.results ||
      props.results.length === 0 ||
      props.results === "Invalid API Key"
    )
      return;
      console.log('props.results', props)
    const { results } = props;
    console.log("results", results);
    const columns = Object.keys(results[0]).map(
      (column) =>
        (column = {
          name: column,
          label: column,
          options: {
            filter: true,
            sort: true,
          },
        })
    );
    setDataTable({ columns, data: results });
  }, [props.results]);
  useEffect(() => {
     if(!dataTable || dataTable.length === 0) return 
    setLoading(false);
  }, [dataTable]);
  if (loading) return <Load/>;
  return (
    <MUIDataTable
      title={getApiName(props.title) || 'Table'}
      data={dataTable.data || []}
      columns={dataTable.columns}
      options={options}
    />
  );
};
