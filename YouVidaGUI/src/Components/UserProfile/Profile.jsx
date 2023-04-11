import React     from "react";
import {
    MDBCard,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
} from "mdb-react-ui-kit";
import '../../Stylesheets/Profile.css'

const Profile = ({postCount, user, followerCount, followingCount}) => {


    return (
            <div style={{ backgroundColor: '#ffffff', minWidth: '100vw' }}>
                <MDBContainer>
                    <MDBRow >
                        <MDBCol >
                            <MDBCard>
                                <div style={{height: '20vh'}}>
                                        <MDBCardImage src={user.picture}
                                                      alt="Generic placeholder image"  fluid style={{ width: '10vw', borderRadius: '999px' }} />
                                    <h2 style={{color: 'Black', float: 'right', marginRight: '2vw'}}>Posts: {postCount}</h2>
                                    <h2 style={{color: 'Black', float: 'right', marginRight: '3vw'}}>Followers: {followerCount}</h2>
                                    <h2 style={{color: 'Black', float: 'right', marginRight: '3vw'}}>Following: {followingCount}</h2>
                                </div>
                                <div style={{ backgroundColor: '#f8f9fa', minWidth: '100%', minHeight: '30vh', boxShadow: ' #002c48 1px 1px 3px 3px' }}>
                                    <h1 style={{color: 'Black', marginLeft: '2vw'}}>{user.name}</h1>
                                    <h2 style={{color: 'Black', marginLeft: '2vw'}}>{user.nickname}</h2>
                                    <h2 style={{color: 'Black', marginLeft: '2vw'}}>{user.email}</h2>
                                </div>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
    );
};

export default Profile;