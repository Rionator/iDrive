import React, { useContext, useState } from 'react'
import 'antd/dist/antd.css'
import FilesList from '../../components/files-list/FilesList';
import UploadItem from '../../components/upload-item/upload-item'
// import UploadItem from '../../components/upload-item/upload-test'
import { Layout } from 'antd'
import Nav from '../../components/navbar/Nav'
import { UserContext } from '../../contexts/AuthContext';

const { Header, Footer, Content } = Layout

const Dashboard = () => {
  const {isLogged, setIsLogged, isAdmin, setIsAdmin} = useContext(UserContext)

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <h1>My Drive</h1>
        <UploadItem />
        <FilesList/>
      </Content>
      <Footer>Supinfo 2022</Footer>
    </Layout>
  )
}

export default Dashboard