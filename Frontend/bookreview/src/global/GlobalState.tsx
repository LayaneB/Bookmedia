import React from 'react'
import { Token } from '../interfaces/Token';
import { GlobalContext } from './GlobalContext'

type GlobalStateProps = {
    children: React.ReactNode;
}

export default function GlobalState(props: GlobalStateProps) {

    const [loading, setLoading] = React.useState(false)
    const [reloadData, setReloadData] = React.useState(false)
    const [token, setToken] = React.useState<Token>({
        token: '',
        id: ''
    })

    const states = { token, loading, reloadData }
    const setters = { setToken, setLoading, setReloadData }

    return (
        <GlobalContext.Provider value={{ states, setters }}>
            {props.children}
        </GlobalContext.Provider>
    )
}