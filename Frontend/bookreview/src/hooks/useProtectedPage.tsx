import { useContext, useEffect } from 'react'
import { GlobalContext } from '../global/GlobalContext'


export const useProtectedPage = () => {
    const { setters } = useContext(GlobalContext);
    const { setToken } = setters

    useEffect(() => {
        const tokenNow = window.localStorage.getItem('token')
        tokenNow && setToken(JSON.parse(tokenNow))
    }, [])

}