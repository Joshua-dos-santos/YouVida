import React, {useState} from "react";
import { Modal, Button } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
} from "mdb-react-ui-kit";
import '../../Stylesheets/Profile.css'
import '../../Stylesheets/Modal.css'
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import UserAPI from "../../Services/Users";
import {useAuth0} from "@auth0/auth0-react";
import Postsapi from "../../Services/Posts";


const Profile = ({postCount,
                     user,
                     followerCount,
                     followingCount,
                     profilepic,
                     loggedIn,
                     showModal,
                     handleOpenModal,
                     handleCloseModal,
                     handleData,
                     formData,
                     setFormData}) => {

    const {logout} = useAuth0()

    const navigate = useNavigate();

    const DeleteUser = (userId) => {
        UserAPI.deleteUser(userId)
            .then(() => logout())
            .catch(err => err)
    }

    return (
        <div style={{backgroundColor: '#ffffff', minWidth: '100vw', marginTop: '1vh'}}>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBCard className="Pcard">
                            <div style={{height: '20vh'}}>
                                <MDBCardImage src={profilepic} alt="Generic placeholder image" fluid
                                              style={{width: '10vw', borderRadius: '999px'}}/>
                                {loggedIn && (
                                    <FontAwesomeIcon
                                        icon={faSquarePlus}
                                        size="2xl"
                                        className="fa-plus"
                                        onClick={handleOpenModal}
                                    />
                                )}
                                {loggedIn &&
                                <button className='DeleteButton'
                                        onClick={() => DeleteUser(user?.sub?.replace("|", "t"))}>
                                    Delete Account
                                </button>
                                }
                                <h2 style={{color: 'Black', float: 'right', marginRight: '2vw'}}>Posts: {postCount}</h2>
                                <h2 style={{
                                    color: 'Black',
                                    float: 'right',
                                    marginRight: '3vw'
                                }}>Followers: {followerCount}</h2>
                                <h2 style={{
                                    color: 'Black',
                                    float: 'right',
                                    marginRight: '3vw'
                                }}>Following: {followingCount}</h2>
                            </div>
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                minWidth: '100%',
                                minHeight: '30vh',
                                boxShadow: ' #002c48 1px 1px 3px 3px'
                            }}>
                                {user.username == null &&
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


            {showModal && (
                <div className="modal-overlay">
                    <div className="custom-modal">
                        <Modal.Header>
                            <Modal.Title>What's on your mind?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleData(formData);
                                }}
                            >
                                <div className="inputbox">
                                    <input
                                        required
                                        type="text"
                                        name="body"
                                        value={formData.body}
                                        onChange={(e) =>
                                            setFormData({ ...formData, body: e.target.value })
                                        }
                                    />
                                    <span>Body</span>
                                    <i></i>
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            {/* Additional buttons or actions */}
                        </Modal.Footer>
                    </div>
                </div>
            )}
        </div>
    );
}


export default Profile;