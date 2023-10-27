import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './Exemplo.css'

function Exemplo() {
  const [user, setUser] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={async () => 
          await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: "Vinicius",
              email: "vini@email.com",
              password: "123"
            })
          })
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(err => console.error(err))
        }>
          the user is {user.name}
        </button>
      </div>
    </>
  )
}

export default Exemplo
