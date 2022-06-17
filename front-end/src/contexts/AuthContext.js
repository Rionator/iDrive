import React from "react"

export const UserContext = React.createContext()

// export const UserProvider = (props) => {
//     const [isAdmin, setIsAdmin] = React.useState(false);
//     const [isLogged, setIsLogged] = React.useState(false);
//     return (
//         <UserContext.Provider value={{ isAdmin, setIsAdmin, isLogged, setIsLogged }} >
//           {props.children}
//         </UserContext.Provider>
//     );
// }