import React, { useState, useEffect, useReducer } from "react";
import UserPost from "./UserPost/UserPost";
import Forum, { IPost, ISinglePost } from "../../ApiManager/forum";
import axios, { AxiosError, AxiosResponse } from "axios";

const MainPost = () => {
    const forumApi = new Forum();
    const [post, setPost] = useState<IPost>();
    const [found, setFound] = useState<boolean>(true);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const id = new URLSearchParams(window.location.search).get("v");

    const getPost = async () => {
        try {
            const response: AxiosResponse<ISinglePost> = await forumApi.getPostById(
                id!
            );
            setPost(response.data.data);
            forceUpdate();
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError<ISinglePost>
                setFound(false)
            }
        };
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div style={{ marginTop: "60px", paddingBottom: "20px" }}>
            {post?._id ? (
                <UserPost
                    _id={post?._id!}
                    username={post?.username!}
                    content={post?.content!}
                    image={post?.image!}
                    created={post?.created!}
                    target={post?.target!}
                    subject={post?.subject!}
                    tags={post?.tags!}
                    user_pfp={post?.user_pfp!}
                    likes={post?.likes!}
                />
            ) : null}
            {!found ? <p>Post not found</p> : null}
        </div>
    );
};

export default MainPost;
