import React from 'react'
import { Token } from '../interfaces/Token'

interface GlobalContextInterface {
    states: {
        allPosts: never[],
        token:Token,
        loading: boolean,
        reloadData: boolean
    },
    setters: {
        setAllPosts: React.Dispatch<React.SetStateAction<never[]>>,
        setToken: React.Dispatch<React.SetStateAction<Token>>,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setReloadData: React.Dispatch<React.SetStateAction<boolean>>,
    }
}
export const GlobalContext = React.createContext<GlobalContextInterface>({} as GlobalContextInterface)