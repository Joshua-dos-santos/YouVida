import React, {useEffect, useState} from "react";
import Postsapi from "../Services/Posts";
import Posts from "../Components/Posts/Posts";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from 'react-router-dom';

const Timeline = () => {

    const [posts, setPosts] = useState([])
    const {user} = useAuth0();
    const navigate = useNavigate();

    const AddNewPost = () => {
        navigate('/AddNewPost');
    }

    const getPosts = () => {
        Postsapi
            .fetchAllPosts()
            .then((res) => {
                setPosts(res.data)
            })
    }

    useEffect(() => {
        getPosts();
    }, []);

    return(
        <div>
            <button style={{marginLeft: '3vw', marginTop: '3vh'}} onClick={AddNewPost}>Add new</button>
            <Posts posts={posts} user={user}/>
        </div>
    )
}

export default Timeline