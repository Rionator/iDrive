import React, { useEffect, useState } from 'react'
import moment, { relativeTimeRounding } from "moment";
import { getFiles, deleteFile, downloadFile } from '../../api/getAPI'
import { SearchOutlined, DeleteFilled, EditFilled, DownloadOutlined } from '@ant-design/icons';
import { Table, Input, Button } from 'antd'

function FilesList(props) {
    const [filesList, setFilesList] = useState([])
    const [loading, setLoading] = useState(false)
    const path = props.path

    useEffect(() => {
        getFiles(setFilesList)
    }, [setFilesList])

    const onDeleteItem = (item) => {
        deleteFile(item)
        setFilesList(pre => {
            return pre.filter(filesList => filesList._id !== item)
        })
    }

    const onEditNameItem = (item) => {
        console.log('TODO:')
    }

    const onDownloadNameItem = (item) => {
        downloadFile(item)
    }
    const columns = [

        {
            title: 'Name',
            dataIndex: 'filename',
            width: '50%',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder='Search by file name'
                            value={selectedKeys}
                            onChange={(e) => { setSelectedKeys(e.target.value ? [e.target.value] : []); confirm({ closeDropdown: false }) }}
                            onPressEnter={() => confirm()}
                            onBlur={() => confirm()}
                        />
                        <Button onClick={() => confirm()} type='primary'>Search</Button>
                        <Button onClick={() => clearFilters()} type='danger'>Reset</Button>
                    </>
                )
            },
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.filename.toLowerCase().includes(value.toLowerCase()),
            sorter: (a, b) => a.filename.length - b.filename.length
        },
        {
            title: 'Date d\'upload',
            dataIndex: 'uploadDate',
            width: '20%',
            sorter: (a, b) => new Date(b.date) - new Date(a.date),
            render: cts => <p>{moment(cts).format('MMMM do YYYY [at] HH:mm [UTC]')}</p>
        },
        {
            title: 'Length',
            dataIndex: 'length',
            width: '15%',
            sorter: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
            title: 'Download',
            dataIndex: '_id',
            width: '5%',
            render: item => <DownloadOutlined onClick={(e) => onDownloadNameItem(item)} />
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            width: '5%',
            render: item => <EditFilled onClick={(e) => onEditNameItem(item)} />
        },
        {
            title: 'Delete',
            dataIndex: '_id',
            width: '5%',
            render: item => <DeleteFilled style={{ color: 'red' }} onClick={(e) => onDeleteItem(item)} />
        }
    ]
    return (
        <Table
            loading={loading}
            dataSource={filesList}
            columns={columns}
            rowKey='_id'
        />
    )
}

export default FilesList