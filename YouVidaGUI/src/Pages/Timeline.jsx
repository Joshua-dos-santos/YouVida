import React, {useEffect, useState} from "react";
import Postsapi from "../Services/Posts";
import Posts from "../Components/Posts/Posts";
import {useAuth0} from "@auth0/auth0-react";
import UserAPI from "../Services/Users";

const Timeline = () => {

    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const {user} = useAuth0();

    const getPosts = () => {
        Postsapi
            .fetchAllPosts()
            .then((res) => {
                setPosts(res.data)
            })
    }

    const getUsers = () => {
        UserAPI
            .getUsers()
            .then((res) => {
                setUsers(res.data)
            })
    }

    useEffect(() => {
        getPosts();
        getUsers()
    }, [posts]);

    return(
        <div>
            <Posts posts={posts} user={user}/>
        </div>
    )
}

export default Timeline