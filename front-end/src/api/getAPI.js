// export const getLastLaunches = () => (
//   fetch('https://api.spacex.land/rest/launches-past?offset=0&limit=3')
//     .then(res => res.json())
// )

// export const getNextLaunch = () => (
//   fetch('https://api.spacex.land/rest/launch-next')
//     .then(res => res.json())
// )

export const getFiles = async () => {
  const response = await fetch(`http://localhost:8080/api/files-user`, {
    method: 'GET',
    headers: {
      'authorization': "Bearer " + localStorage.getItem('token')
    }
  })
  return response.json()
}
// export const getAllLaunches = () => (
//   fetch('https://localhost:8080/api/file-user/')
//     .then(res => res.json())
// )

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