import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import vfoto1 from './pages/img/foto1.jpg'
import vfoto2 from './pages/img/foto2.jpg'
import './pages/Produto/produto'
import './pages/Header/header'
import './pages/Home/home'
import './pages/Formulario/formulario'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://www.heroisdapizza.com.br/" target="_blank">
          <img src={vfoto1} className="logo" alt="Vite logo" />
        </a>
        <a href="https://www.dominos.com.br/" target="_blank">
          <img src={vfoto2} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.dominos.com.br/" target="_blank">
          <img src={vfoto2} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Turma 3AN + React</h1>

    </>
  )
}

export default App
