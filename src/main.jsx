import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {LoginPage} from './formComponents/loginPage'
import { ThemeContext } from './context/themeContext'
import { createTheme,ThemeProvider } from '@mui/material'
import SignInPage from './formComponents/SignInPage'

const theme = createTheme(
  {
      palette : {
         primary : {
          main : '#ff2a6b'
         },
         secondary : {
          main :'#ff2a6b',
         },
         custom : {
          main : '#ff2a6b'
         },     
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  </React.StrictMode>
)
