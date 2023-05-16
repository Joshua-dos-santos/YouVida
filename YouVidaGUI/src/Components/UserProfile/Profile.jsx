import React     from "react";
import {
    MDBCard,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
} from "mdb-react-ui-kit";
import '../../Stylesheets/Profile.css'
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import UserAPI from "../../Services/Users";
import {useAuth0} from "@auth0/auth0-react";


const Profile = ({postCount, user, followerCount, followingCount, profilepic, loggedIn}) => {

    const {logout} = useAuth0()

    const navigate = useNavigate();

    const DeleteUser = (userId) => {
        UserAPI.deleteUser(userId)
            .then(() => logout())
            .catch(err => err)
    }

    return (
            <div style={{ backgroundColor: '#ffffff', minWidth: '100vw', marginTop: '1vh'}}>
                <MDBContainer>
                    <MDBRow >
                        <MDBCol >
                            <MDBCard>
                                <div style={{height: '20vh'}}>
                                        <MDBCardImage src={profilepic}
                                                      alt="Generic placeholder image"  fluid style={{ width: '10vw', borderRadius: '999px' }} />
                                    {loggedIn &&
                                    <FontAwesomeIcon
                                        icon={faSquarePlus}
                                        size="2xl"
                                        className="fa-plus"
                                        onClick={() => navigate("/AddNewPost")}
                                    />
                                    }
                                    {loggedIn &&
                                        <button className='DeleteButton' onClick={() => DeleteUser(user?.sub?.replace("|", "t"))}>
                                            Delete Account
                                        </button>
                                    }
                                    <h2 style={{color: 'Black', float: 'right', marginRight: '2vw'}}>Posts: {postCount}</h2>
                                    <h2 style={{color: 'Black', float: 'right', marginRight: '3vw'}}>Followers: {followerCount}</h2>
                                    <h2 style={{color: 'Black', float: 'right', marginRight: '3vw'}}>Following: {followingCount}</h2>
                                </div>
                                <div style={{ backgroundColor: '#f8f9fa', minWidth: '100%', minHeight: '30vh', boxShadow: ' #002c48 1px 1px 3px 3px' }}>
                                    {user.username ==  null &&
                                    <h1 style={{color: 'Black', marginLeft: '2vw'}}>{user.nickname}</h1>
                                    }
                                    {user.username != null &&
                                    <h1 style={{color: 'Black', marginLeft: '2vw'}}>{user.username}</h1>
                                    }
                                </div>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
    );
};

export default Profile;