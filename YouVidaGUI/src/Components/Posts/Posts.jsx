import React from "react";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {useAuth0} from "@auth0/auth0-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import Postsapi from "../../Services/Posts";
import '../../Stylesheets/Posts.css'


const Posts = ({posts, user}) => {

    const { isAuthenticated } = useAuth0();

    const deletePost = (id) => {
        Postsapi
            .deletePost(id)
            .then(console.log("deleted"))
            .catch(err => console.log(err))
    }

    return (
        isAuthenticated &&
        <div>
            {posts &&
            posts.map((post) => {
                return (
                    <div className="card-container" key={post}>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    <MDBCard className="postBody">
                                        <MDBCardHeader>
                                            <img src={user.picture}/><h3>{user.name}</h3>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                                size="xl"
                                                className="fa-trash-can"
                                                onClick={() => deletePost(post.postId)}
                                            />
                                            <h1>{post.title}</h1>
                                            <FontAwesomeIcon
                                                icon={faThumbsUp}
                                                size="xl"
                                                className="fa-thumbs-up"
                                            />
                                            <p>Likes {/*TODO Get likes from backend*/}</p>
                                            <h2>{post.body}</h2>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </div>
                );
            })}
        </div>
    )
}

export default Posts