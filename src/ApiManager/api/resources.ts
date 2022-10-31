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

    public async uploadFileToGoogleDrive(file: any) {//the file
        let reader = new FileReader(); //this for convert to Base64
        reader.readAsDataURL(file)//start conversion...
        reader.onload = async function (e) {
            //.. once finished..
            let rawLog = (<string>reader?.result).split(",")[1]!; //extract only thee file data part
            let dataSend = {
                dataReq: { data: rawLog, name: file.name, type: file.type },
                fname: "uploadFilesToGoogleDrive",
            };
            const response: AxiosResponse<any> = await drive_instance.post("/exec", JSON.stringify(dataSend))
            console.log(response.data)
            return response.data.url
        };
    }

    // "username": username,
    // "resource_title": content["resource_title"],
    // "resource_type": content["resource_type"],
    // "preview_image": content["preview_image"],
    // "price": content["price"],
    // "rating": content["rating"],
    // "file_type": content["file_type"],
    // # will be an array, single element in array in pdf, or else multiple links of images
    // "subject": content["subject"],
    // 'link': content["link"], # this will be a list
    // "created": content["created"],

    public async uploadResource(data: interfaces.Resource) {
        instance.defaults.headers.common["Authorization"] = this._token
        const response: AxiosResponse<interfaces.ResourceResponse> = await instance.post(`/upload`, data)
        return response.data.data
    }
}



