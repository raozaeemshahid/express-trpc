import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import APIClient from './trpc'

function App() {
  const [count, setCount] = useState(0)
  const data = APIClient.getUser.query()
  const anotherAPI = APIClient.myProcedure.query()

  data.then(data => {
    console.log(data)
  })
  anotherAPI.then(data => {
    data.data.userEmail
  })

  const createUser = () => {

    const newUser = APIClient.createUser.mutate({
      name: "Rao Zaeem"
    })

    newUser.then(data => {
      console.log({newUser: data})
    }) 
    return newUser

  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={createUser}>
          createUser
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
