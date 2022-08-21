import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SignInPage from './SignInPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SignInPage/>
    </div>
  )
}

export default App
