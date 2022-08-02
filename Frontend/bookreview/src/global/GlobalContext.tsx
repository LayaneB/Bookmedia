import React from 'react'

interface GlobalContextInterface {
    states: {
        allPosts: never[];
        token: string;
        loading: boolean;
        reloadData: boolean;
    },
    setters: {
        setAllPosts: React.Dispatch<React.SetStateAction<never[]>>,
        setToken: React.Dispatch<React.SetStateAction<string>>,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setReloadData: React.Dispatch<React.SetStateAction<boolean>>,
    }
}
export const GlobalContext = React.createContext<GlobalContextInterface>({} as GlobalContextInterface)