import React, { useEffect, useState } from 'react'
import axios from "axios";
import Menu from './components/Menu';

function App() {
 

  return (
    <div className='container'>
      <Menu></Menu>

      <h1 className='text-center'>Гланая</h1>
      <p className='text-center'>Добро пожаловать в нашу Ветеринарную клинику!</p>
    </div>
   
  )
}

export default App


