import React from 'react'
import { Token } from '../interfaces/Token';
import { GlobalContext } from './GlobalContext'

type GlobalStateProps = {
    children: React.ReactNode;
}

export default function GlobalState(props: GlobalStateProps) {

    const [allPosts, setAllPosts] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [reloadData, setReloadData] = React.useState(false)
    const [token, setToken] = React.useState<Token>({
        token: '',
        id: ''
    })

    const states = { allPosts, token, loading, reloadData }
    const setters = { setAllPosts, setToken, setLoading, setReloadData }

    return (
        <GlobalContext.Provider value={{ states, setters }}>
            {props.children}
        </GlobalContext.Provider>
    )
}