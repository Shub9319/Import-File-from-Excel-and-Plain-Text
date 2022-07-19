import MaterialTable from 'material-table'
import React from 'react'
import { useState } from 'react'
import exportFromJSON from 'export-from-json'
import AddIcon from '@material-ui/icons/Add';

export const Display = (props) => {
  
  const [tableData, settableData] = useState(props.data)
  const [selectdata, setselectdata] = useState([]);
  
  let column = [];
  function fetchcolumns(){ props.header.map((head) => {
    let obj = { title: `${head}`, field: `${head}` } 
    column.push(obj);
    return null;
  })
}
  fetchcolumns();
 const csvdataexport=()=>{
  // const csvData=[];
  //  const coldata= column.map(col=>col.title);
  //  csvData.push(coldata);
  //  const rows= selectdata.map(rowdata=>coldata.map(col=>rowdata[col]))
  const fileName='filename1';
  const exportType="csv"
  const data = selectdata
  exportFromJSON({data,fileName,exportType})
  // var csvbuilder= new CsvBuilder("data.csv").setColumns(coldata).addRows(rows).exportFile();
  
 }
 const xlxdataexport=()=>{
  const fileName='filename1';
  const exportType="xls"
  const data = selectdata
  exportFromJSON({data,fileName,exportType})
 }

 const textdataexport=()=>{
  const fileName='filename1';
  const exportType="txt"
  const data = selectdata
  exportFromJSON({data,fileName,exportType})
  
 }
 
  return (
    <div style={{ width: "24cm", margin: "auto auto" }}>

      <MaterialTable
        title="Data Inside CSV File is"
        columns={column}
        data={tableData}
        editable={{
          onRowAdd: (newrow) => new Promise((resolve, reject) => {
            // console.log(newrow);
            settableData([...tableData, newrow]); //add this in data
            setTimeout(() => resolve(), 500);
          }),
          onRowUpdate: (newrow, oldrow) => new Promise((resolve, reject) => {
            // console.log(newrow, oldrow);
            const temp = [...tableData];
            temp[oldrow.tableData.id] = newrow;
            settableData(temp);
            setTimeout(() => resolve(), 500);
          }),
          onRowDelete: (selectedData) => new Promise((resolve, reject) => {
            const temp = [...tableData];
            temp.splice(selectedData.tableData.id, 1);
            settableData(temp);
            setTimeout(() => resolve(), 500);
          }),


        }}
        actions={[
          {
            icon: () => <button>Export as JSon</button>,
            onClick:()=>textdataexport(),
            tooltip :"Download selected data",
            
          },
          {
            icon: () => <button>Export as CSV</button>,
            onClick:()=>csvdataexport(),
            tooltip :"Export as CSV",
            
          },
          {
            icon: () => <button>Export as XLS</button>,
            onClick:()=>xlxdataexport(),
            tooltip :"Export as xls",
            
          },
          {
            icon:"delete",
            tooltip: "Delete selected data",
            onClick:(e,rowdata)=>{
              const updatedata=tableData.filter(rows=> !rowdata.includes(rows))
              settableData(updatedata);
            }
          }

        ]}
        
        onSelectionChange={(selectrow)=>
          setselectdata(selectrow)
        }
        
        options={{
          filtering: true, paginationType: "stepped", paginationPosition: "top",
          showFirstLastPageButtons: false,
          addRowPosition: "first",
          exportButton: true, pageSizeOptions: [5, 10, 20, 30, 50, 100], exportFileName: "provide file name",
          actionsColumnIndex: -1,
          selection: true,
          exportAllData:true,
          grouping:true,
          columnsButton:true,
          search:false,
          headerStyle: {
            backgroundColor: '#efefef',
            fontWeight: 'bold',
            
          },
        }}
        icons={{Add:()=><AddIcon/>}}
      />
      

    </div>
  )
}
