import { createGlobalStyle } from 'styled-components'
import { colors } from './Colors'

export const GlobalStyle = createGlobalStyle`
    *{
        padding: 0;
        margin:0;
        box-sizing: border-box;
        font-family: 'IBM Plex Sans', sans-serif;
    }
    *::-webkit-scrollbar {
        width: 4px;
    }
    *::-webkit-scrollbar-thumb {
        background: ${colors.primaryOrange};
        opacity:40%;
        border-radius: 2px;
    }
    *::-webkit-scrollbar-track {
        background: transparent;
    }
`