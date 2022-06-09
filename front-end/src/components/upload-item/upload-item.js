import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { uploadFile } from '../../api/getAPI'

function UploadItem(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const path = props.path

  const changeHandler = e => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0])
    setIsSelected(true);
  }

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append('input_file', selectedFile);
    uploadFile(formData)
  }

  return (
    // <input type="file" name='file' className='UploadFile' icon={<UploadOutlined />} />
    <div>
      <input type="file" name="input_file" id="input_file" onChange={changeHandler} />
      {
        isSelected ?
          <button onClick={handleSubmission}>Submit</button> :
          <p>Select a file</p>
      }
    </div>
  )
}

export default UploadItem