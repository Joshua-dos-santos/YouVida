import React, {useState, useEffect} from "react";
import Profile from "../Components/UserProfile/Profile";
import Posts from "../Components/Posts/Posts";
import Postsapi from "../Services/Posts";
import {useAuth0} from "@auth0/auth0-react";
import UserFollowersAPI from "../Services/UserFollowers";


const UserProfile = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    const [posts, setPosts] = useState([])
    const [userFollowers, setUserFollowers] = useState([])
    const [userFollowing, setUserFollowing] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            const res = await Postsapi.fetchAllPosts();
            const filteredData = res.data.filter(item => item.createdBy === user?.sub?.replace("|", "t"));

            setPosts(filteredData);

            const followerRes = await UserFollowersAPI.fetchAllUserFollowers();
            const followerData = followerRes.data.filter(item => item.userId === user?.sub?.replace("|", "t"));
            setUserFollowers(followerData);
            const followingData = followerRes.data.filter(item => item.followerId === user?.sub?.replace("|", "t"));
            setUserFollowing(followingData);
        }
        getPosts();
    }, []);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated &&
        <div>
            <Profile postCount={posts.length} user={user} followerCount={userFollowers.length} followingCount={userFollowing.length}/>
            {
                posts.map((item)=>{
                    return <Posts post={item} key={item.postId}/>
                })
            }
        </div>
    )
}

export default UserProfile
