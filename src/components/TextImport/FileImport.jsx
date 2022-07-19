import React from 'react'
import { useState } from 'react';
import { Display } from '../Drag/Display';
import { parse } from 'papaparse'

export const FileImport = () => {
    const [selectedFile, setselectedFile] = useState([])
    let csvstring="";
    const [headers, setheaders] = useState([])
    const [flag, setflag] = useState(false);
    const [data, setdata] = useState([]);
    const onchangefile = (e) => {
        if (e.target.files[0].type === "text/plain") {
            setselectedFile(e.target.files)
            document.getElementById("wrongfile").innerHTML = "";
            // alert("selection confirmed");
        }
        else {
            document.getElementById("wrongfile").innerHTML = "Choose Correct File !!";
            // alert("wrong selection");
        }
    }

   

    const onuploadfile=()=>{
        console.log(selectedFile);
        Array.from(selectedFile).
            map(async file => {
                const text = await file.text();
                let rows = text.split('\n');
                rows.forEach(row =>
                {
                    let filterrow =row.split(" ").filter(a=>a);
                    let temp=filterrow.join();
                    csvstring+=temp+'\n';
                })
                const result = parse(csvstring, { header: true });
                // console.log(result.data);
                setdata(...data, result.data)
                setheaders(...headers, result.meta.fields)
                setflag(true);
            })
    
}

    return (
        <div style={{ margin: "auto  auto", textAlign: "center" }}>
            <h2>Upload Text File</h2>
            <input type="file" name="file1" id="file1" onChange={onchangefile} onClick={()=>{
                setheaders([]);
                setflag(false);
                setdata([]);
                setselectedFile([]);
            }} />
            <p><button disabled={selectedFile.length ? "" : "true"} onClick={onuploadfile}>Upload!</button></p>
            <p style={{ color: "red", fontWeight: "bold" }} id="wrongfile"></p>
            <div >
                {flag ? <Display data={data} header={headers} /> : ""}
            </div>
        </div>
    )
}