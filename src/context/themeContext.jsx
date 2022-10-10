import { createTheme } from "@mui/material"
import { createContext } from "react"
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

  const ThemeContext = createContext(theme)

  export {ThemeContext}