import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import  LoginPage  from './components/LoginPage/Login'
import HomePage from './components/HomePage/Home'
import SignUp from './components/SignUpPge/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/Login' element={<LoginPage/>} />
        <Route path='/SignUp' element={<SignUp/>} />
      </Routes>
    </>
  )
}

export default App
