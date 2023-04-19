import React, {useState, useEffect} from "react";
import Profile from "../Components/UserProfile/Profile";
import Posts from "../Components/Posts/Posts";
import Postsapi from "../Services/Posts";
import {useAuth0} from "@auth0/auth0-react";
import UserFollowersAPI from "../Services/UserFollowers";
import UserAPI from "../Services/Users";


const UserProfile = () => {

    const {user, isAuthenticated, isLoading} = useAuth0();


    if (isLoading) {
        return <div>Loading ...</div>;
    }

    const [posts, setPosts] = useState([])
    const [userFollowers, setUserFollowers] = useState([])
    const [userFollowing, setUserFollowing] = useState([])

    useEffect(() => {
        getPosts();
    }, [posts]);

    useEffect(() => {
        postUser();
    }, [user]);

    const postUser = () => {
        UserAPI
            .postUser(user)
            .then(res => console.log(res))
    }

    const getPosts = () => {
        Postsapi
            .fetchAllPosts()
            .then((res) => {
                const filteredData = res.data.filter(item => item.createdBy === user.sub);
                setPosts(filteredData)
            })
        UserFollowersAPI
            .fetchAllUserFollowers()
            .then((res) => {
                const filteredData = res.data.filter(item => item.userId === user.sub);
                setUserFollowers(filteredData)
            })
        UserFollowersAPI
            .fetchAllUserFollowers()
            .then((res) => {
                const filteredData = res.data.filter(item => item.followerId === user.sub);
                setUserFollowing(filteredData)
            })
    }



    return (
        isAuthenticated &&
        <div>
            <Profile postCount={posts.length} user={user} followerCount={userFollowers.length} followingCount={userFollowing.length}/>
            <Posts posts={posts} user={user}/>
        </div>
    )
}

export default UserProfile