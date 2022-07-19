import React from 'react'
import { useState } from 'react';
import { parse } from 'papaparse'
import { Display } from './Display';
import "./Import.css";
import importicon from "../../assets/images/importicon.png";

export const Import = () => {
    const [flag, setflag] = useState(false)
    const [data, setdata] = useState([])
    const [header, setheader] = useState([])

    const readFile = (e) => {
        e.preventDefault();
        // console.log(e.dataTransfer.files[0]);
        // console.log("hi");
        Array.from(e.dataTransfer.files).filter(file => file.type === "application/vnd.ms-excel").map(async file => {
            const text = await file.text();
            console.log(text);
            const result = parse(text, { header: true });
            setheader(...header, result.meta.fields)
            setdata(...data, result.data)
            setflag(true);
        })
    }
    return (
        <div>
            <div className='dragbox'
                onDragOver={(e) => {
                    e.preventDefault();
                    setheader([]);
                    setdata([]);
                    setflag(false);
                }}
                onDrop={readFile}
            >
                <div className='dragboxcontent'>
                    <p><img src={importicon} /></p>
                    <br/>
                    <p>Drag & Drop your files here</p>
                </div>
            </div>
            <hr />
            <div >
                {flag ? <Display data={data} header={header} /> : ""}
            </div>
        </div>
    )
}
