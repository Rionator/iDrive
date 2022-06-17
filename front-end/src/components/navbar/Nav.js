import React from 'react'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Space, Typography } from 'antd';
import './Nav.css'
import { AddFolderButton } from '../add-folder/AddFolderButton';
import { useFolder } from '../../hooks/useFolder';


// const menu = (
//   <Menu
//     items={[
//       {
//         key: '1',
//         label: (
//           <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//             1st menu item
//           </a>
//         ),
//       },
//       {
//         key: '2',
//         label: (
//           <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
//             2nd menu item
//           </a>
//         ),
//       },
//       {
//         key: '3',
//         label: (
//           <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
//             3rd menu item
//           </a>
//         ),
//       },
//     ]}
//   />
// );

// const { Title } = Typography;

const Nav = () => {
  const { folder } = useFolder()

  const handleTestSubmit = () => {
    console.log('bien sur frère')
  }
  // const folder = { name: "Root", id: 'sdfz3q1f3qf321zfzdsfg', path: [] }
  return (

    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item key='Home'><Link to='/'>Home</Link></Menu.Item>

      <Menu.SubMenu key="SubMenu" title="" icon={<SettingOutlined style={{ fontSize: '1.5em' }} />}>
        <Menu.Item key="two">
          <Link to='/login'>Sign in</Link>
        </Menu.Item>
        <Menu.Item key="three">
          <Link to='/register'>Sign up</Link>
        </Menu.Item>
        <Menu.Item key="four" onClick={() => handleTestSubmit()}>
          <AddFolderButton currentFolder={folder} />
        </Menu.Item>
        <Menu.Item key='upload-item'>
          <Link to='/upload-file'>Upload File</Link>
        </Menu.Item>
      </Menu.SubMenu>
      {/* <div onClick={e => e.preventDefault()} className='right-list-container flexbox'>
        <Space size="middle" style={{ display: 'flex' }}>
          <Dropdown
            overlay={menu}
            placement={'bottom'}
            arrow={{ pointAtCenter: true }}
          >
            <SettingOutlined style={{ fontSize: '1.5em' }} />
          </Dropdown>

          <Title level={4} type="warning">Oussem</Title>
          <Avatar size={40} icon={<UserOutlined />} />
        </Space>
      </div> */}
    </Menu>
    //https://ant.design/components/breadcrumb/#API
    // <Breadcrumb>
    //   <Breadcrumb.Item href="/">
    //     <HomeOutlined />
    //   </Breadcrumb.Item>
    // </Breadcrumb>
  )
}

export default Nav