import React from "react";
import {MDBCard, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {useAuth0} from "@auth0/auth0-react";

const Posts = ({posts}) => {

    const { isAuthenticated } = useAuth0();


    return (
        isAuthenticated &&
        <div>
            {posts && posts.map((post) => {
                return (
                    <div style={{backgroundColor: '#ffffff', minWidth: '100vw', minHeight: '20vh'}} key={post}>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    <MDBCard>
                                        <div style={{
                                            backgroundColor: '#f8f9fa',
                                            minWidth: '100%',
                                            minHeight: '20vh',
                                            boxShadow: ' #002c48 1px 1px 3px 3px'
                                        }}>
                                            <h1 style={{color: 'Black', marginLeft: '2vw'}}>{post.title}</h1>
                                            <h2 style={{color: 'Black', marginLeft: '2vw'}}>{post.body}</h2>
                                        </div>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </div>)
            })}
        </div>
    )
}

export default Posts