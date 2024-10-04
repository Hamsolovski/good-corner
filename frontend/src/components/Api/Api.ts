import axios from "axios"
import { ApiResult } from "../../types/api"

const api = axios.create({
    baseURL: "http://localhost:3000/"
})

export const getCategories = async():Promise<ApiResult[]> => {
    const {data} = await api.get('/categories')
    return data
}

export const getTags = async():Promise<ApiResult[]> => {
    const {data} = await api.get('/tags')
    return data
}