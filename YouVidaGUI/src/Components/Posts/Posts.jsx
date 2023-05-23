import React, {useEffect, useState} from "react";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {useAuth0} from "@auth0/auth0-react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import Postsapi from "../../Services/Posts";
import '../../Stylesheets/Posts.css'
import UserAPI from "../../Services/Users";


const Posts = ({post, getPosts}) => {
    const {user, isAuthenticated} = useAuth0();

    const [postUser, setUser] = useState([])


    const deletePost = (id) => {
        Postsapi
            .deletePost(id)
            .then(() => {
                getPosts()
            })
            .catch(err => console.log(err))
    }

    const getUser = (userId) => {
        UserAPI
            .getUserById(userId)
            .then(res => {
                setUser(res.data);
            })
    }

    useEffect(() => {
        getUser(post.createdBy)
    }, [])

    return (
        <div>
            {post &&
            <div className="Postcard">
                <div className="body">
                    <p className="text">{post.body}</p><span
                    className="username">from:<img src={postUser.profilepic} alt="profile"/> @{postUser.username}</span>
                    <div className="footer">
                        <div>
                            {post.createdAt}
                            {post.createdBy === user?.sub?.replace("|", "t") &&
                            <div className="trash">
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    size="xl"
                                    className="fa-trash-can"
                                    onClick={() => deletePost(post.postId)}
                                />
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Posts