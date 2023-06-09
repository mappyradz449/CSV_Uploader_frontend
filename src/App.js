//import logo from './logo.svg'; 
//import { useState,useEffect } from 'react';
import axios from 'axios';
//import Papa from 'papaparse'
import { useRef,useState,useEffect } from 'react';
import './App.css';

import { uploadFile } from './services/api';

//compnents
//import Header from './components/Headers';
function App() {
  
  //const [data, setData] = useState('');
  const [file,setFile] = useState('');
  const [report,setReport] = useState({
    'totalData': 0,
    'totalUploaded': 0,
    'totalDuplicate': 0,
    'totalInvalid': 0,
    'totalIncomplete': 0,
  });
   
  const fileInputRef = useRef();

  const logo = 'https://img.freepik.com/free-photo/closeup-black-computer-keyboard-del-button_53876-64694.jpg?w=1800&t=st=1686166785~exp=1686167385~hmac=9a6c7c2cd84225c2b295e74da3dc7c08391ed08b2b19afb1123c7abad779a11f'
  //set the backend URL
const API_URL = 'http://localhost:8000';
  const  uploadFile = async (data) => {
    try{
       let response =  await axios
       .post(`${API_URL}/upload`, data);  
       console.log(response.data);
       console.log(response.data, typeof response.data)

        setReport(response.data);
        
        console.log(report);

       return response.data;
    }catch(error){
        console.error('Error while calling the api',error.message);
    }
}
  useEffect(() => {
    ///in this function we call apis
    const getCSV = async () => {
      if(file){
        const data = new FormData();
        data.append("name",file.name);
        data.append("file",file);
       
        //whenever we get the file we have to call the api
        let response = await uploadFile(data); //call api
        
      }
    }
    getCSV();
  },[file])
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   Papa.parse(file, {
  //     header: true,
  //     complete: (results) => {
  //       setData(results.data);
  //     },
  //   });
  // };

  // const handleFileUpload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     const response = await axios.post('http://localhost:8000/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     //setReport(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  console.log(file);

  return (
    <div className='container'>

      <img src={logo} alt='banner'/>
      <div className='wrapper'>
        <h1>Upload CSV file!</h1>

        <button onClick={() => onUploadClick()}>Upload</button>
        <input type="file" 
          accept=".csv"
          ref={fileInputRef}
          style={{display : 'none'}}
          //onChange={handleFileUpload}
          onChange={(e) => setFile(e.target.files[0])} //among multiple files select teh first one
        />
        {report && (
          <div>
          <h2>Summary Report</h2>
          <p>Total Data: {report.totalData}</p>
          <p>Total Successfully Uploaded: {report.totalUploaded}</p>
          <p>Total Duplicate: {report.totalDuplicate}</p>
          <p>Total Invalid: {report.totalInvalid}</p>
          <p>Total Incomplete: {report.totalIncomplete}</p>
        </div>
        )}

    
       
      </div>
``
      
    </div>
  );
}

export default App;
