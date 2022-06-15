import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';



const UploadTest = () => {
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
    
        onChange(info) {
            console.log(info)
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
    
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            setLabelButton('Upload')
        },
    };

    const [selectedFile, setSelectedFile] = useState(null)
    const [labelButton, setLabelButton] = useState('Click to Upload')

    return(
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>{labelButton}</Button>
        </Upload>
    )
};

export default UploadTest;