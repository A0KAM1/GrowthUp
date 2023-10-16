import React from 'react'
import ReactDOM from 'react-dom/client'
import Exemplo from './Exemplo.jsx'
import Menu from './Menu.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Exemplo />
    <Menu />
  </React.StrictMode>,
)
