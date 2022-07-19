import express from  "express";
import fs from 'fs';
import path from "path";
import React from "react";
import ReactDomServer from "react-dom/server";
import App from '../src/App';

const app= express();
const PORT= 5000;
app.use('^/$',(req,res,next)=>{
    fs.readFile(path.resolve('./build/index.html'),'utf-8',(err,data)=>{
        if(err)
        {
            console.log(err);
            return(
                res.status(500).send("An error Occuured")
            )
        }
        return(
            res.send(data.replace('<div id="root"></div>',`<div id="root">${ReactDomServer.renderToString(<App/>)}</div>`))
        )
    })
})

app.listen(PORT,()=>{console.log(`App running on PORT ${PORT}`)})
app.use(express.static(path.resolve(__dirname,'..','build')));