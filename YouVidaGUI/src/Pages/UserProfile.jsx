import React, {useState, useEffect} from "react";
import Profile from "../Components/UserProfile/Profile";
import Posts from "../Components/Posts/Posts";
import Postsapi from "../Services/Posts";
import {useAuth0} from "@auth0/auth0-react";
import UserFollowersAPI from "../Services/UserFollowers";
import UserAPI from "../Services/Users";


const UserProfile = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    const [posts, setPosts] = useState([])
    const [userFollowers, setUserFollowers] = useState([])
    const [userFollowing, setUserFollowing] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleData = (formData) => {
        Postsapi.postNewPost({
            title: formData.title,
            body: formData.body,
            createdBy: user.sub.replace("|", "t"),
        })
            .then(() => {
                UserAPI.postUser(user).then((res) => res);
                handleCloseModal();
            })
            .catch((err) => console.log(err));
    };

    const getPosts = () => {
        Postsapi.fetchPostsByUser(user?.sub?.replace("|", "t")).then((res) => {
            setPosts(res.data);
        });
    }

    const getFollows = () => {
        UserFollowersAPI.fetchAllUserFollowers().then((followerRes) => {
            const followerData = followerRes.data.filter(item => item.userId === user?.sub?.replace("|", "t"));
            setUserFollowers(followerData);
            const followingData = followerRes.data.filter(item => item.followerId === user?.sub?.replace("|", "t"));
            setUserFollowing(followingData);
        });
    }

    const createUser = () => {
        UserAPI.postUser(user)
            .then(() => console.log())
    }

    useEffect(() => {
        getPosts();
        getFollows();
    }, [showModal]);

    useEffect(() => {
        createUser();
    }, [user])

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated &&
        <div>
            <Profile postCount={posts.length}
                     user={user}
                     followerCount={userFollowers.length}
                     followingCount={userFollowing.length}
                     profilepic={user.picture}
                     loggedIn={true}
                     showModal={showModal}
                     handleOpenModal={handleOpenModal}
                     handleCloseModal={handleCloseModal}
                     handleData={handleData}
                     formData={formData}
                     setFormData={setFormData}/>
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

export default UserProfile
