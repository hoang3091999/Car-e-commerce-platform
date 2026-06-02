import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import  LoginPage  from './components/LoginPage/Login'
import HomePage from './components/HomePage/Home'
import SignUp from './components/SignUpPge/SignUp'
import Newcar from './components/NewcarPage/Newcar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Newcar/>} />
        <Route path='/Login' element={<LoginPage/>} />
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/Newcar' element={<Newcar/>} />
      </Routes>
    </>
  )
}

export default App
