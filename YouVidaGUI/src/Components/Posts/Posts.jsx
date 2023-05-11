import React, {useEffect, useState} from "react";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {useAuth0} from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import Postsapi from "../../Services/Posts";
import '../../Stylesheets/Posts.css'
import UserAPI from "../../Services/Users";



const Posts = ({post, getPosts}) => {
    const { user, isAuthenticated } = useAuth0();

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
    },[])

    return (
        isAuthenticated &&
        <div>
            {post &&
            <div className="card-container" key={post.title}>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <MDBCard className="postBody">
                                <MDBCardHeader style={{marginTop: '1vh', borderBottom: '#1a253f solid'}}>
                                    <img src={postUser.profilepic} alt="profile"/><h4>@ {postUser.username}</h4>
                                    <p>{post.createdAt}</p>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    {post.createdBy === user?.sub?.replace("|", "t") &&
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                                size="xl"
                                                className="fa-trash-can"
                                                onClick={() => deletePost(post.postId)}
                                            />
                                    }
                                    <h1>{post.title}</h1>
                                    <h2>{post.body}</h2>
                                    <div className="Likes">
                                        <p><FontAwesomeIcon
                                            icon={faThumbsUp}
                                            size="xl"
                                            className="fa-thumbs-up"
                                        />Likes {/*TODO Get likes from backend*/}</p>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
            }
        </div>
    )
}

export default Posts