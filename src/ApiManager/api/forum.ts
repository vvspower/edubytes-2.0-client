import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as interfaces from '../interface/Interfaces'


const instance = axios.create({
  baseURL: "http://127.0.0.1:9000/community/forums",
  timeout: 100000,
});






export default class Forum {
  private async uploadImage(form: FormData) {
    const response: any = await instance.post(
      "https://api.cloudinary.com/v1_1/disle0uxb/image/upload",
      form
    );
    return response.data.url.toString();
  }


  public async createPost(content: string, target: string, subject: string, tags: string[], img: FormData | undefined) {
    let image = ""
    if (img !== undefined) {
      image = await this.uploadImage(img!)
    }
    instance.defaults.headers.common["Authorization"] =
      sessionStorage.getItem("token")!;
    const response: AxiosResponse<interfaces.IDefaultResponse> = await instance.post(
      "/post", { content, image, target, subject, tags, }
    );
    return response;
  }


  public async getPostsTargetGeneral(target: string) {
    delete axios.defaults.headers.common["Authorization"];
    const response: AxiosResponse<interfaces.IGetPostsResponse> = await instance.get(
      `/post/i/${target}/general`
    );
    return response.data;
  }


  public async getPostById(id: string) {
    delete axios.defaults.headers.common["Authorization"];
    const response: AxiosResponse<interfaces.ISinglePost> = await instance.get(
      `/post/${id}`
    );
    return response;
  }

  // http://127.0.0.1:9000/community/forums/post/user/vvspower

  public async getPostUser(username: string) {
    delete axios.defaults.headers.common["Authorization"];
    const response: AxiosResponse<interfaces.IMultiplePosts> = await instance.get(
      `/post/user/${username}`
    );
    return response;
  }


  public async postLike(like: boolean, id: string) {
    instance.defaults.headers.common["Authorization"] =
      sessionStorage.getItem("token")!;
    if (like) {
      const response: AxiosResponse<interfaces.IDefaultResponse> = await instance.post(
        `/post/like/${id}/like`
      );
      return response.data.success
    } else {
      const response: AxiosResponse<interfaces.IDefaultResponse> = await instance.delete(
        `/post/like/${id}`
      );
      return response.data.success
    }
  }

  public async getReplies(post_id: string) {
    instance.defaults.headers.common["Authorization"] =
      sessionStorage.getItem("token")!;
    const response: AxiosResponse<interfaces.IGetRepliesResponse> = await instance.get(`/reply/${post_id}`)
    return response.data.data
  }

  public async postReply(post_id: string, content: string, image: string = "") {
    instance.defaults.headers.common["Authorization"] =
      sessionStorage.getItem("token")!;
    const response: AxiosResponse<interfaces.IPostReply> = await instance.post(`/reply/${post_id}`, {
      content, image
    })
    return response
  }

  public async getTopPosts(target: string) {
    const response: AxiosResponse<interfaces.ITopPostsResponse> = await instance.get(`/post/top/${target}`)
    return response
  }
}


// http://127.0.0.1:9000/community/forums/post/top/ALEVEL