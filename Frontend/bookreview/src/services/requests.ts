import axios from "axios"
import { BooksDTO } from "../interfaces/feed/BooksDTO"

const baseurl = 'http://localhost:3003/'

export const postRequest = async (endpoint: string, body: { email: string, password: string }, setData: React.Dispatch<React.SetStateAction<string>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    try {
        const response: any = await axios.post(baseurl + endpoint, body)

        setData(response.data.token)
        setLoading(false)
    } catch (error: any) {
        setLoading(false)
        console.log(error.response.data.error)
    }
}

export const getRequest = async (endpoint: string, setData: React.Dispatch<React.SetStateAction<BooksDTO[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    try {

        const token =window.sessionStorage.getItem("token")

        let headers = {
            headers: {
                Authorization: token as string
            }
        }

        const response: any = await axios.get(baseurl + endpoint, headers)
        setData(response.data.books)
        setLoading(false)
    } catch (error: any) {
        setLoading(false)
        console.log(error.response.data.error)
    }
}

