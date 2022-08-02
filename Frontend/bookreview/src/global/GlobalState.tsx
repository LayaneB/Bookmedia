import React from 'react'
import { GlobalContext } from './GlobalContext'

type GlobalStateProps = {
    children: React.ReactNode; 
}

export default function GlobalState(props: GlobalStateProps) {
    
    const [allPosts, setAllPosts] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [reloadData, setReloadData] = React.useState(false)
    const [token, setToken] = React.useState('')
    

    // useEffect(() => {
    //     const getToken = window.sessionStorage.getItem("token")
    //     getToken && getRequest(`posts`, setAllPosts)
    // }, [reloadData])
  
    // const postRequest = async (endpoint,body, header, setData, setError) => {
    //     let headers
    //     const token =window.sessionStorage.getItem("token")

    //     header ? headers = header : headers = {
    //         headers: {
    //             Authorization: token
    //         }
    //     }
    //     setLoading(true)
    //     await axios.post(`${baseURL}/${endpoint}`, body, headers)
    //     .then((response)=>{
    //         setData && setData(response.data.token)
    //         setLoading(false)
    //         setReloadData(!reloadData)
    //     })
    //     .catch((err)=>{
    //         setLoading(false)
    //         setError && setError.setOpen(true)
    //         setError &&  setError.setMessageError(err.response.data)
    //     })
    // }

    // const putRequest = async (endpoint,body) => {
       
    //     const token =window.sessionStorage.getItem("token")

    //     let headers = {
    //         headers: {
    //             Authorization: token
    //         }
    //     }
    //     setLoading(true)
    //     await axios.post(`${baseURL}/${endpoint}`, body, headers)
    //     .then((response)=>{
    //         setLoading(false)
    //         setReloadData(!reloadData)
    //     })
    //     .catch((err)=>{
    //         setLoading(false)
    //         console.log(err.response.data)
    //     })
    // }

    // const getRequest = (endpoint: string, setData:React.Dispatch<React.SetStateAction<never[]>>) => {
    //     const token = window.sessionStorage.getItem("token") || "tem"
    //     const headers = {
    //         headers: {
    //             Authorization: token
    //         }
    //     }
    //     setLoading(true)
    //     const baseURL = 'jj'
    //     axios.get(`${baseURL}/${endpoint}`, headers)
    //     .then((response)=>{
    //         setData(response.data)
    //         setLoading(false)
    //     })
    //     .catch(()=>{
    //         setLoading(false)
    //     })
    // }


 

    const states = { allPosts, token, loading, reloadData }
    const setters = { setAllPosts, setToken, setLoading, setReloadData }
    // const requests = { getRequest, postRequest, putRequest, deleteRequest}

    return (
        <GlobalContext.Provider value={{ states, setters }}>
            {props.children}
        </GlobalContext.Provider>
    )
}