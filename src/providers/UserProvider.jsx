import React, { createContext } from 'react'
import { auth, generateUserDocument } from '../firebase'

export const UserContext = createContext({ user: null });

const UserProvider = (props) => {
   const [user, setUser] = React.useState(null)

   React.useEffect(() => {
      auth.onAuthStateChanged(async userAuth => {
         const user = await generateUserDocument(userAuth);
         setUser({ user });
      });
   }, [])
   return (
      <UserContext.Provider value={user}>
         {props.children}
      </UserContext.Provider>
   )
}

export default UserProvider
