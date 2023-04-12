import React, {useState} from "react";
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

    const addPost = () => {
        Postsapi
            .postNewPost({title: 'YOLO', body: 'New Post', createdBy: user.sub})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return(
        <div>
            <button style={{marginLeft: '3vw'}} onClick={getPosts}>Get Posts</button>
            <button style={{marginLeft: '3vw'}} onClick={AddNewPost}>Add new</button>
            <Posts posts={posts}/>
        </div>
    )
}

export default Timeline