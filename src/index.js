import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import {Import} from "./components/Drag/Import"
import Header from "./components/Header";
import { FileImport } from './components/TextImport/FileImport';

ReactDOM.render(
  <>
  <Router> 
  <Header/>
  <App/>
    <Routes>
   <Route path='drag' element={<Import/>}></Route>
   <Route path="text-import" element={<FileImport/>}></Route>
   </Routes>
  </Router>
  </>,
  document.getElementById('root')
);


