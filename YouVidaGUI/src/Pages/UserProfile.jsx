import React, {useState} from "react";
import Profile from "../Components/UserProfile/Profile";
import Posts from "../Components/Posts/Posts";
import Postsapi from "../Services/Posts";
import {useAuth0} from "@auth0/auth0-react";
import UserFollowersAPI from "../Services/UserFollowers";


const UserProfile = () => {

    const {user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    const [posts, setPosts] = useState([])
    const [userFollowers, setUserFollowers] = useState([])
    const [userFollowing, setUserFollowing] = useState([])
    const getPosts = () => {
        Postsapi
            .fetchPostsByUser()
            .then((res) => {
                const filteredData = res.data.filter(item => item.userId === user.sub)
                setPosts(filteredData)
            })
        UserFollowersAPI
            .fetchAllUserFollowers()
            .then((res) => {
                const filteredData = res.data.filter(item => item.userId === user.sub)
                setUserFollowers(filteredData)
            })
        UserFollowersAPI
            .fetchAllUserFollowers()
            .then((res) => {
                const filteredData = res.data.filter(item => item.followerId === user.sub)
                setUserFollowing(filteredData)
            })
    }

    return (
        isAuthenticated &&
        <div>
            <Profile postCount={posts.length} user={user} followerCount={userFollowers.length} followingCount={userFollowing.length}/>
            <button style={{marginLeft: '3vw'}} onClick={getPosts}>Get Posts</button>
            <Posts posts={[{title: 'test', body: 'test'}]}/>
        </div>
    )
}

export default UserProfile