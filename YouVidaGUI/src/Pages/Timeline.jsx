import React, {useEffect, useState} from "react";
import Postsapi from "../Services/Posts";
import Posts from "../Components/Posts/Posts";
import {useAuth0} from "@auth0/auth0-react";

const Timeline = () => {

    const [posts, setPosts] = useState([])
    const {user} = useAuth0();

    const getPosts = () => {
        Postsapi
            .fetchAllPosts()
            .then((res) => {
                setPosts(res.data)
            })
    }

    useEffect(() => {
        getPosts();
    }, [posts]);

    return(
        <div>
            <Posts posts={posts} user={user}/>
        </div>
    )
}

export default Timeline