import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as interfaces from '../interface/Interfaces'


const instance = axios.create({
    baseURL: "http://127.0.0.1:5000/suggestions",
    timeout: 100000,
});


export default class Suggestions {
    private _token: string

    constructor() {
        this._token = localStorage.getItem("token")!;
    }

    public async getSuggestedUsers(username: string) {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.ResponseSuggestedUser> = await instance.get(`/from_user/${username}`)
        return response
    }

    public async getSuggestedPosts(post_id: string) {
        const response: AxiosResponse<interfaces.ResponseSuggestedPost> = await instance.get(`/from_post/${post_id}`)
        return response
    }

    public async getSuggestedResources() {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.ReturnedResourceResponse> = await instance.get(`/resources`)
        return response
    }

}
