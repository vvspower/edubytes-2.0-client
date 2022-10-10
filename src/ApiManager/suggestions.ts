import axios, { AxiosInstance, AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:9000/suggestions",
    timeout: 100000,
});

interface Details {
    bio: string
    pfp: string
    verified: string
}

export interface SuggestedPost {
    _id: string;
    username: string;
    content: string;
    image: string;
    created: string;
    target: string;
    subject: string;
    tags: string[];
    user_pfp: string
}

export interface SuggestedUser {
    _id: string
    username: string
    created: string
    partnerd: string
    details: Details
}

export interface ResponseSuggestedUser {
    data: SuggestedUser[],
    success: boolean
}

export interface ResponseSuggestedPost {
    data: SuggestedPost[],
    success: boolean
}


export default class Suggestions {
    private _token: string

    constructor() {
        this._token = sessionStorage.getItem("token")!;
    }

    public async getSuggestedUsers(username: string) {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<ResponseSuggestedUser> = await instance.get(`/from_user/${username}`)
        return response
    }

    public async getSuggestedPosts(post_id: string) {
        const response: AxiosResponse<ResponseSuggestedPost> = await instance.get(`/from_post/${post_id}`)
        return response
    }

}
