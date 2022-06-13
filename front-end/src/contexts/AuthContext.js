import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(username, password) {
    return auth.createUserWithUsernameAndPassword(username, password)
  }

  function login(username, password) {
    return auth.signInWithUsernameAndPassword(username, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(username) {
    return auth.sendPasswordResetUsername(username)
  }

  function updateEmail(username) {
    return currentUser.updateUsername(username)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}