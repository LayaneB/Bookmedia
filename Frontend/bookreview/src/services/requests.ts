import axios from "axios"
import { BooksDTO } from "../interfaces/feed/BooksDTO"
import { PostBookDTO } from "../interfaces/feed/PostBookDTO"
import { ProfileDTO } from "../interfaces/profile/ProfileDTO"
import { SignupDTO } from "../interfaces/signup/SignupDTO"
import { Token } from "../interfaces/Token"

const baseurl = 'http://localhost:3003/'

const tokenJson = window.sessionStorage.getItem("token")
const token: Token = tokenJson && JSON.parse(tokenJson)

const headers = {
    headers: {
        Authorization: token?.token as string
    }
}

// endpoints da entidade user

export const getUser = async (
    endpoint: string,
    setData: React.Dispatch<React.SetStateAction<ProfileDTO>>,
): Promise<void> => {
    try {
        const response: any = await axios.get(baseurl + endpoint, headers)
        setData(response.data.userData)
    } catch (error: any) {
        console.log(error.response.data.error)
    }
}

export const logIn = async (endpoint: string, body: { email: string, password: string }, setData: React.Dispatch<React.SetStateAction<Token>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
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

export const signup = async (endpoint: string, body: SignupDTO, setData: React.Dispatch<React.SetStateAction<Token>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    console.log(body)
    try {
        const response: any = await axios.post(baseurl + endpoint, body)
        setData(response.data.token)
        setLoading(false)
    } catch (error: any) {
        setLoading(false)
        console.log(error.response.data.error)
    }
}


// endpoints da entidade Book
export const getAllBooks = async (endpoint: string, setData: React.Dispatch<React.SetStateAction<BooksDTO[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    try {

        const response: any = await axios.get(baseurl + endpoint, headers)
        setData(response.data.books)
        setLoading(false)
    } catch (error: any) {
        setLoading(false)
        console.log(error.response.data.error)
    }
}


export const getBookByUser = async (endpoint: string, setData: React.Dispatch<React.SetStateAction<BooksDTO[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    try {
        const response: any = await axios.get(baseurl + endpoint, headers)
        setData(response.data.books)
        setLoading(false)
    } catch (error: any) {
        setLoading(false)
        console.log(error.response.data.error)
    }
}

export const postBook = async (endpoint: string, body: PostBookDTO, setReload: React.Dispatch<React.SetStateAction<boolean>>, reload: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    try {

        console.log(body)

        await axios.post(baseurl + endpoint, body, headers)
        setReload(!reload)
        setLoading(false)
    } catch (error: any) {
        setLoading(false)
        console.log(error.response.data.error)
    }
}

export const deleteBookById = async (endpoint: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setReload: React.Dispatch<React.SetStateAction<boolean>>, reload: boolean) => {
    setLoading(true)
    try {
    
        await axios.delete(baseurl + endpoint, headers)
        setReload(!reload)
        setLoading(false)
    } catch (error: any) {
        setLoading(false)
        console.log(error.response.data.error)
    }
}



