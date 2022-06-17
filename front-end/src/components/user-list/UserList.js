import React, { useEffect, useState } from 'react'
import { getUsers,getUser, blockUser} from '../../api/getAPI'
import { SearchOutlined, StopOutlined, LoginOutlined } from '@ant-design/icons';
import { Table, Input, Button } from 'antd'
import { getIsBlocked } from '../../auth/auth';

const UserList = () => {
    const [usersList, setUsersList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchUsers = async() => {
            const response = await getUsers()
            if(response.status === 204) {
                const data = []
                setUsersList(data)
              } else {
                const data = await response.json()
                const result = data.filter(row => !row.isAdmin)
                setUsersList(result)
                console.log(usersList)
              }
        }
        fetchUsers()
    }, [setUsersList])

    // const handleBlockButton = (item) => {
    //     const blocked = getIsBlocked()
    //     return (
    //         (blocked) ?
    //         (<StopOutlined style={{color: 'red'}}onClick={(e) => onBlocked(item)} />)
    //         :
    //         (<StopOutlined style={{color: 'grey'}} onClick={(e) => onUnBlock(item)} />)
    //     )
    // }

    // const onUnBlock = (item) => {
    //     console.log('unBlock')
    // }
    

    const onImpersonate = (item) => {
        console.log('Impersonate')
    }

    const userCheckBlocked = async(item) => {
        const user = await getUser(item)
        return user.isBlocked
    }
    const onBlocked = async(item, e) => {
        const isBlocked = await userCheckBlocked(item)
        console.log(isBlocked)
        blockUser(item, !isBlocked)
        if(!isBlocked) {
            e.target.innerHTML = 'unBlock'
            e.target.style.color = 'blue'
        } else {
            e.target.innerHTML='Block'
            e.target.style.color = 'red'
        }
    }


    const columns = [

        {
            title: 'Username',
            dataIndex: 'name',
            width: '30',
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
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '30%',
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
            sorter: (a, b) => a.email.length - b.email.length
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            width: '30%',
        },
        {
            title: 'Block',
            dataIndex: '_id',
            width: '5%',
            render: item => <span style={{color: 'red', cursor: 'pointer'}} onClick={(e) => onBlocked(item, e)}>Block</span>
        },
        {
            title: 'Impressionate',
            dataIndex: '_id',
            width: '5%',
            render: item => <LoginOutlined onClick={(e) => onImpersonate(item)} />
        },
    ]
    return (
        <Table
            loading={loading}
            dataSource={usersList}
            columns={columns}
            rowKey='_id'
        />
    )

}

export default UserList

