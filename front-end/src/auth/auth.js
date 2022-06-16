import jwt_decode from "jwt-decode";

export function getIsUser(key = "token") {
    const itemStr = localStorage.getItem(key)

    if (!itemStr) {
        console.log('No token User')
        return null
    }

    // const item = JSON.parse(itemStr)
    // const decodedItem = jwt_decode(item.token)
    const decodedItem = jwt_decode(itemStr)
    const now = new Date()


    // if (now.getTime() > decodedItem.exp * 1000) {
    //     localStorage.removeItem(key)
    //     return false
    // }
    return true
}

export function getIsAdmin(key = "token") {
    const itemStr = localStorage.getItem(key)

    if (!itemStr) {
        console.log('No token Admin')
        return null
    }

    // const item = JSON.parse(itemStr)
    const decodedItem = jwt_decode(itemStr)

    if (decodedItem.is_admin) {
        return true
    }
    return false
}

export function setTokenWithExpiry() {
    localStorage.removeItem("token")
};