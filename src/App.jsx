import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inputs from './Inputs'
import Banner from './Banner'

function App() {

  return (
    <div className='p-8 bg-gray-300'>
      <Banner />
      <Inputs />
    </div>
  )
}

export default App
