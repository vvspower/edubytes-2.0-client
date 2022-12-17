import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as interfaces from '../interface/Interfaces'


const instance = axios.create({
    baseURL: "http://127.0.0.1:9000/resources",
    timeout: 100000,
});



export default class Resource {
    private _token: string

    constructor() {
        this._token = this._token = sessionStorage.getItem("token")!;

    }

    public async uploadResource(data: interfaces.Resource) {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.ResourceResponse> = await instance.post(`/upload`, data)
        console.log(response)
        return response
    }

    public async getResources() {
        const response: AxiosResponse<interfaces.ReturnedResourceResponse> = await instance.get(`/`)
        console.log(response)
        return response
    }

    public async getUserResourcesWithAuth() {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.ReturnedResourceResponse> = await instance.get(`/user`)
        return response
    }

    public async getUserResourcesWithNoAuth(username: string) {
        const response: AxiosResponse<interfaces.ReturnedResourceResponse> = await instance.get(`/${username}`)
        return response
    }

    public async getOneResource(id: string) {
        const response: AxiosResponse<interfaces.ReturnedResourceResponseSingle> = await instance.get(`/${id}`)
        return response
    }

    public async searchResources(board: string, subject: string, query: string) {
        const response: AxiosResponse<interfaces.ReturnedResourceResponse> = await instance.get(`/search/${board}/${subject}/${query}`)
        return response
    }

    public async changeRating(id: string, rating: number) {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.ResourceResponse> = await instance.post(`/rating/${id}`, { "rating": rating })
        return response
    }
}



