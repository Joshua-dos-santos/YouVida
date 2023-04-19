import React, {useEffect, useState} from "react";
import Postsapi from "../Services/Posts";
import Posts from "../Components/Posts/Posts";

const Timeline = () => {

    const [posts, setPosts] = useState([])

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
            {
                posts.map((item)=>{
                    return <Posts post={item} key={item.postId}/>
                })
            }
        </div>
    )
}

export default Timeline