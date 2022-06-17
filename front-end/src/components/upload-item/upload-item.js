import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { uploadFile } from '../../api/getAPI'
// import UploadTest from './upload-test';
import './upload-item.css'

function UploadItem(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [fileName, setFileName] = useState('Submit')
  const path = props.path

  const changeHandler = e => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.files[0].name)
    setIsSelected(true);
    // handleSubmission()
  }

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append('input_file', selectedFile);
    uploadFile(formData)
    window.location.reload(false);
  }

  return (
    // <input type="file" name='file' className='UploadFile' icon={<UploadOutlined />} />
    <>
      <div>
        <input type="file" name='input_file' id="input_file" className='inputfile' onChange={changeHandler} />
        <label htmlFor="input_file"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg> <strong>Choose a file</strong></label>
      </div>
      {
        (isSelected) &&
        <div>
          <button className='inputfile' id="btn-upload" onClick={handleSubmission}></button>
          <label htmlFor="btn-upload"><strong>Upload</strong> "{fileName}"</label>
        </div>
      }
      {/* <UploadTest /> */}
    </>
  )
}

export default UploadItem