import axios, { AxiosInstance, AxiosResponse } from "axios";


const instance = axios.create({
    baseURL: "https://api.cloudinary.com/v1_1/disle0uxb",
    timeout: 100000,
});

export default class Cloudinary {

    public async uploadImage(form: FormData) {
        instance.defaults.headers.delete["Authorization"]
        const response: any = await instance.post(
            "/image/upload",
            form
        );
        return response.data.url.toString();
    }
}