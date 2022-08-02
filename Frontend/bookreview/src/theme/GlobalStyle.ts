import { createGlobalStyle } from 'styled-components'

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
        background: linear-gradient(90deg, #FF6489 0%, #F9B24E 100%);
        opacity:40%;
        border-radius: 2px;
    }
    *::-webkit-scrollbar-track {
        background: transparent;
    }
`