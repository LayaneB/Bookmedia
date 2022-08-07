import React from 'react'
import { Token } from '../interfaces/Token'

interface GlobalContextInterface {
    states: {
        token:Token,
        loading: boolean,
        reloadData: boolean
    },
    setters: {
        setToken: React.Dispatch<React.SetStateAction<Token>>,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setReloadData: React.Dispatch<React.SetStateAction<boolean>>,
    }
}
export const GlobalContext = React.createContext<GlobalContextInterface>({} as GlobalContextInterface)