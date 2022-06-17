import jwt_decode from "jwt-decode";

export function getIsUser(key = "token") {
    const itemStr = localStorage.getItem(key)

    if (!itemStr) {
        // console.log('No token User')
        return null
    }

    // const item = JSON.parse(itemStr)
    // const decodedItem = jwt_decode(item.token)
    const decodedItem = jwt_decode(itemStr)


    // if (now.getTime() > decodedItem.exp * 1000) {
    //     localStorage.removeItem(key)
    //     return false
    // }
    return true
}

export function getIsAdmin(key = "token") {
    const itemStr = localStorage.getItem(key)

    if (!itemStr) {
        // console.log('No token Admin')
        return null
    }

    // const item = JSON.parse(itemStr)
    const decodedItem = jwt_decode(itemStr)
    console.log(decodedItem)
    if (decodedItem.isAdmin) {
        return true
    }
    return false
}

export function getIsBlocked(key = "token") {
    const itemStr = localStorage.getItem(key)

    if (!itemStr) {
        // console.log('No token Admin')
        return null
    }

    // const item = JSON.parse(itemStr)
    const decodedItem = jwt_decode(itemStr)
    if (decodedItem.isBlocked) {
        return true
    }
    return false
}

export function getUserInfos(key="token") {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
        // console.log('No token Admin')
        return null
    }

    // const item = JSON.parse(itemStr)
    const decodedItem = jwt_decode(itemStr)
    return decodedItem
}
export function clearToken() {
    localStorage.removeItem("token")
    try {
        localStorage.removeItem("adminToken")
    } catch (error) {
        console.log(error)
    }
}