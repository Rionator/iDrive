import { niceBytes } from "../utils/utils"

export const downloadFile = async (id) => {
  const response = await fetch(`http://localhost:8080/api/download/${id}`, {
    method: 'GET',
    responseType: "blob",
    headers: {
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf',
      'authorization': "Bearer " + localStorage.getItem('token')
    }
  })
  const blob = await response.blob
  const url = window.URL.createObjectURL(new Blob([blob]))
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    `FileName.pdf`,
  );

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode.removeChild(link);
  // return response
}


export const getFiles = async (setData) => {

  const response = await fetch(`http://localhost:8080/api/files-user`, {
    method: 'GET',
    headers: {
      'authorization': "Bearer " + localStorage.getItem('token')
    }
  })
  if(response.status === 204) {
    const data = []
    setData(data)
  } else {
    const data = await response.json()
    setData(data)
  }
}

export const loginFetch = async (name, email, password) => {
  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'x-access-token': location.Storage('')
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
  return response
}
export const getLaunchById = (id) => (
  fetch(`http://localhost:8080/file/${id}`)
    .then(res => res.json())
)

export const deleteFile = async (id) => {
  const response = await fetch(`http://localhost:8080/api/delete-file/${id}`, {
    method: 'DELETE',
    headers: {
      'authorization': "Bearer " + localStorage.getItem('token')
    }
  })
  return response.json()
}

export const uploadFile = async (formData) => {
  const response = await fetch(`http://localhost:8080/api/create-file`, {
    method: 'POST',
    headers: {
      'authorization': "Bearer " + localStorage.getItem('token')
    },
    body: formData
  })

  return response.json()
}

export const getUsers = async() => {
  const response = await fetch(`http://localhost:8080/api/users`, {
    method: 'GET',
    headers: {
      'authorization': "Bearer " + localStorage.getItem('token')
    }
  })
  return response;
}
export const getUser = async(id) => {
  const response = await fetch(`http://localhost:8080/api/users/${id}`, {
    method: 'GET',
    headers: {
      'authorization': "Bearer " + localStorage.getItem('token')
    }
  })
  return response.json();
}

export const blockUser = async(id, isBlocked) => {
  const response = await fetch(`http://localhost:8080/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': "Bearer " + localStorage.getItem('token')
    },
    body: JSON.stringify({
      isBlocked,
    })
  })
  return response
}