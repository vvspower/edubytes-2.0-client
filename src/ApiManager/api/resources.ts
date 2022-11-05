import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as interfaces from '../interface/Interfaces'


const instance = axios.create({
    baseURL: "http://127.0.0.1:9000/resources",
    timeout: 100000,
});

const drive_instance = axios.create({
    baseURL: "https://script.google.com/macros/s/AKfycbzahMBn4ZbghLAMQG2zCLMd1f7PuxDDSVOr7DreZ9U1kD4rD48W8oo-nLJVbq7g2eP-bg",
    timeout: 100000,
})



export default class Resource {
    private _token: string

    constructor() {
        this._token = this._token = sessionStorage.getItem("token")!;

    }

    public async uploadImage(form: FormData) {
        const response: any = await instance.post(
            "https://api.cloudinary.com/v1_1/disle0uxb/image/upload",
            form
        );
        return response.data.url.toString();
    }



    public async uploadResource(data: interfaces.Resource) {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.ResourceResponse> = await instance.post(`/upload`, data)
        console.log(response)
        return response
    }
}




