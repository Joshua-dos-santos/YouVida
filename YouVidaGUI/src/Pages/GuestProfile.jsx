import Profile from "../Components/UserProfile/Profile";
import Posts from "../Components/Posts/Posts";
import React, {useEffect, useState} from "react";
import UserAPI from "../Services/Users";
import Postsapi from "../Services/Posts";
import UserFollowersAPI from "../Services/UserFollowers";
import {useSearchParams} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const GuestProfile = () => {

    const{user} = useAuth0();

    const [guser, setUser] = useState([])
    const [posts, setPosts] = useState([])
    const [userFollowers, setUserFollowers] = useState([])
    const [userFollowing, setUserFollowing] = useState([])
    const [isFollowing, setIsFollowing] = useState([])

    const[searchParams] = useSearchParams();

    const GetUserById = () => {
        UserAPI.getUserById(searchParams.get("id"))
            .then(res =>{
                setUser(res.data);
            })
            .catch(err => console.log(err))
    }

    const getPosts = () => {
        Postsapi.fetchPostsByUser(guser.userId).then((res) => {
            setPosts(res.data);
        });
    }

    const getFollows = () => {
        UserFollowersAPI.fetchAllUserFollowers().then((followerRes) => {
            const followerData = followerRes.data.filter(item => item.userId === guser.userId);
            setUserFollowers(followerData);
            const followingData = followerRes.data.filter(item => item.followerId === guser.userId);
            setUserFollowing(followingData);
        });
    }

    const getFollowing =() => {
        const isFollowing = userFollowers.filter(x => x.followerId === user.sub.replace("|", "t"))
        if (isFollowing == null){
            setIsFollowing(false);
        }
        else{
            setIsFollowing(true);
        }
    }

    useEffect(() => {
        getFollowing();
    }, [userFollowers])

    useEffect(() =>{
        GetUserById();
    }, [])

    useEffect(() =>{
        getPosts();
        getFollows();
    }, [guser])
if(isFollowing) {
    return (
        <div>
            <Profile postCount={posts.length} user={guser} followerCount={userFollowers.length}
                     followingCount={userFollowing.length} profilepic={user.profilepic} loggedIn={false}/>
            {
                posts.map((item) => {
                    return <div className="ProfilePosts" key={item.postId}>
                        <Posts post={item} getPosts={getPosts} key={item.postId}/>
                    </div>
                })
            }
        </div>
    )
}
else {
    return (
        <div>
            PRIVATE ACCOUNT
        </div>
    )
}
}

export default GuestProfile