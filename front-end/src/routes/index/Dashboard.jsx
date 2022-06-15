import React, { useState } from 'react'
import 'antd/dist/antd.css'
import FilesList from '../../components/files-list/FilesList';
import UploadItem from '../../components/upload-item/upload-item'
import { Layout } from 'antd'
import Nav from '../../components/navbar/Nav'

const { Header, Footer, Content } = Layout

const Dashboard = () => {
  const [currentPath, setCurrentPath] = useState('my-drive')


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Nav />
      </Header>
      <Content>
        <h1>{currentPath}</h1>
        {/* <UploadItem path={currentPath} /> */}
        <FilesList path={currentPath}/>
      </Content>
      <Footer>Supinfo 2022</Footer>
    </Layout>
  )
}

export default Dashboard