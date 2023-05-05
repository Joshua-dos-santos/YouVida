import Profile from "../Components/UserProfile/Profile";
import Posts from "../Components/Posts/Posts";
import React, {useEffect, useState} from "react";
import UserAPI from "../Services/Users";
import Postsapi from "../Services/Posts";
import UserFollowersAPI from "../Services/UserFollowers";
import {useSearchParams} from "react-router-dom";

const GuestProfile = () => {

    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
    const [userFollowers, setUserFollowers] = useState([])
    const [userFollowing, setUserFollowing] = useState([])

    const[searchParams] = useSearchParams();

    const GetUserById = () => {
        UserAPI.getUserById(searchParams.get("id"))
            .then(res =>{
                setUser(res.data);
            })
            .catch(err => console.log(err))
    }

    const getPosts = () => {
        Postsapi.fetchPostsByUser(user.userId).then((res) => {
            setPosts(res.data);
        });
    }

    const getFollows = () => {
        UserFollowersAPI.fetchAllUserFollowers().then((followerRes) => {
            const followerData = followerRes.data.filter(item => item.userId === user.userId);
            setUserFollowers(followerData);
            const followingData = followerRes.data.filter(item => item.followerId === user.userId);
            setUserFollowing(followingData);
        });
    }

    useEffect(() =>{
        GetUserById();
    }, [])

    useEffect(() =>{
        getPosts();
        getFollows();
    }, [user])

    return(
        <div>
            <Profile postCount={posts.length} user={user} followerCount={userFollowers.length} followingCount={userFollowing.length} profilepic={user.profilepic}/>
            {
                posts.map((item)=>{
                    return <Posts post={item} getPosts={getPosts} key={item.postId}/>
                })
            }
        </div>
    )
}

export default GuestProfile