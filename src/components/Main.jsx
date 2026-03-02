import React, { useContext } from 'react'
import { useAuth } from './AuthContext'

const Main = () => {
    const {user} = useAuth()
    console.log(user)
  return (
    <div>
        {/* Pár hirdetés sablonnak, habiszi bemutatkozas, elerhetosegek, lehetőségek miket lehet csinalni az oldalon */}
        <header>Main</header>
    </div>
  )
}

export default Main
