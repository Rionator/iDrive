import jwt_decode from "jwt-decode";

export function getAdminStatus(key = "token") {
  const itemStr = localStorage.getItem(key)

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const decodedItem = jwt_decode(item.token)

  // compare the expiry time of the item with the current time
  if (decodedItem.isAdmin) {
    // If the item is expired, delete the item from storage
    // and return null
    return true
  }
  return false
}

export default function getUserStatus(key = "token") {
    const itemStr = localStorage.getItem(key)
  
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
  
    const item = JSON.parse(itemStr)
    const decodedItem = jwt_decode(item.token)
    const now = new Date()
  
    // compare the expiry time of the item with the current time
    if (now.getTime() > decodedItem.exp * 1000) {
      // If the item is expired, delete the item from storage
      // and return null
      setTokenWithExpiry(key)
      return false
    }
    return true
  }

export function setTokenWithExpiry(key = "token") {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      return false
    }
  };