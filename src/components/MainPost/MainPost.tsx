import React, { useState, useEffect, useReducer } from "react";
import UserPost from "./UserPost/UserPost";
import Forum, { IPost, ISinglePost } from "../../ApiManager/api/forum";
import axios, { AxiosError, AxiosResponse } from "axios";
import SuggestedPosts from "./RightBar/SuggestedPosts/SuggestedPosts";
import styles from './mainpost.module.sass'
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import Suggestions, { ResponseSuggestedPost, SuggestedPost } from "../../ApiManager/api/suggestions";
import UserInfo from "./RightBar/UserInfo/UserInfo";

const MainPost = () => {
    const forumApi = new Forum();
    const suggestedApi = new Suggestions
    const [post, setPost] = useState<IPost>();
    const [topPost, setTopPost] = useState<IPost[]>([]);
    const [found, setFound] = useState<boolean>(true);
    const [suggested, setSuggested] = useState<SuggestedPost[]>([])
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const id = new URLSearchParams(window.location.search).get("v");
    const user = useSelector((state: RootState) => state.user.value);


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

    const getSuggestedPosts = async () => {
        const response: AxiosResponse<ResponseSuggestedPost> = await suggestedApi.getSuggestedPosts(id!)
        setSuggested(response.data.data)
        forceUpdate()
    }



    useEffect(() => {
        getPost();
        getSuggestedPosts()
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.middle} style={{ marginTop: "60px", paddingBottom: "20px" }}>
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
            <div className={styles.right}>
                {post?.username ? <UserInfo username={post?.username!} /> : null}
                <SuggestedPosts posts={suggested} />
            </div>
        </div>
    );
};

export default MainPost;
