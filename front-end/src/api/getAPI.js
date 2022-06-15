// export const getLastLaunches = () => (
//   fetch('https://api.spacex.land/rest/launches-past?offset=0&limit=3')
//     .then(res => res.json())
// )

// export const getNextLaunch = () => (
//   fetch('https://api.spacex.land/rest/launch-next')
//     .then(res => res.json())
// )

export const downloadFile = async (id) => {
  const response = await fetch(`http://localhost:8080/api/download/${id}`, {
    method: 'GET',
    headers: {
      'authorization': "Bearer " + localStorage.getItem('token')
    }
  })
  return response
}

export const getFiles = async (setData) => {
  const response = await fetch(`http://localhost:8080/api/files-user`, {
    method: 'GET',
    headers: {
      'authorization': "Bearer " + localStorage.getItem('token')
    }
  })
  setData(await response.json())
}
// export const getAllLaunches = () => (
//   fetch('https://localhost:8080/api/file-user/')
//     .then(res => res.json())
// )

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