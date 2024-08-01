import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as interfaces from '../interface/Interfaces'
import Cloudinary from "../cloudinaryApi/cloudinary";


const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/community/forums",
  timeout: 100000,
});

const cloudinaryApi = new Cloudinary()

export default class Forum {
  public async createPost(content: string, target: string, subject: string, tags: string[], img: FormData | undefined) {
    let image = ""
    if (img !== undefined) {
      image = await cloudinaryApi.uploadImage(img!)
    }
    instance.defaults.headers.common["Authorization"] =
      localStorage.getItem("token")!;
    const response: AxiosResponse<interfaces.IDefaultResponse> = await instance.post(
      "/post", { content, image, target, subject, tags, }
    );
    return response;
  }

  public async updatePost(content: string, id: string) {
    instance.defaults.headers.common["Authorization"] = localStorage.getItem("token")!;
    const response: AxiosResponse<interfaces.IDefaultResponse> = await instance.put(`/post/${id}`, {
      content: content
    })
    return response
  }

  public async deletePost(id: string) {
    instance.defaults.headers.common["Authorization"] = localStorage.getItem("token")!;
    const response: AxiosResponse<interfaces.IDefaultResponse> = await instance.delete(`/post/${id}`)
    return response
  }


  public async getPostsTargetGeneral(target: string, number: number) {
    delete axios.defaults.headers.common["Authorization"];
    const response: AxiosResponse<interfaces.IGetPostsResponse> = await instance.get(
      `/post/i/${target}/general/${number.toString()}`
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


  public async getPostUser(username: string) {
    delete axios.defaults.headers.common["Authorization"];
    const response: AxiosResponse<interfaces.IMultiplePosts> = await instance.get(
      `/post/user/${username}`
    );
    return response;
  }


  public async postLike(like: boolean, id: string) {
    instance.defaults.headers.common["Authorization"] =
      localStorage.getItem("token")!;
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
      localStorage.getItem("token")!;
    const response: AxiosResponse<interfaces.IGetRepliesResponse> = await instance.get(`/reply/${post_id}`)
    return response.data.data
  }

  public async postReply(post_id: string, content: string, image: string = "") {
    instance.defaults.headers.common["Authorization"] =
      localStorage.getItem("token")!;
    const response: AxiosResponse<interfaces.IPostReply> = await instance.post(`/reply/${post_id}`, {
      content, image
    })
    return response
  }

  public async getTopPosts(target: string) {
    const response: AxiosResponse<interfaces.ITopPostsResponse> = await instance.get(`/post/top/${target}`)
    return response
  }

  public async searchPost(query: string) {
    instance.defaults.headers.common["Authorization"] =
      localStorage.getItem("token")!;
    const response: AxiosResponse<interfaces.IGetPostsResponse> = await instance.get(`/post/search/${query}`)
    return response
  }
}


// http://127.0.0.1:9000/community/forums/post/top/ALEVEL