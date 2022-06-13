import React, { useState } from 'react'
import { Modal } from 'antd';


export const AddFolderButton = ({ currentFolder }) => {
    const ROOT_FOLDER = { name: "Root", id: null, path: [] }
    const currentUser = { uid: '62a09f91c76dd2ce41e19f21' }
    
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function handleSubmit() {
        if (currentFolder == null) return
        
        const path = [...currentFolder.path]
        if (currentFolder !== ROOT_FOLDER) {
            path.push({ name: currentFolder.name, id: currentFolder.id })
        }
        console.log(name)
        const addFolder = async () => {
            const response = await fetch('http://localhost:8080/api/add-folder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': "Bearer " + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: name,
                    parentId: currentFolder.id,
                    userId: currentUser.uid,
                    path: path
                })
            })
            return response.json()
        }
        addFolder()
        setName("")
        closeModal()
    }
    return (
        <>
            <button onClick={openModal}> add folder</button>
            <Modal
                title="20px to Top"
                style={{ top: 20 }}
                visible={open}
                onOk={() => handleSubmit()}
                onCancel={() => setOpen(false)}
            >
                <input type="text" name="name" id="name" onChange={e => setName(e.target.value)} />
            </Modal>
        </>
    )
}
