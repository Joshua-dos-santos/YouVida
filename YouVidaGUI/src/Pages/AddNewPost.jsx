import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import Postsapi from "../Services/Posts";
import '../Stylesheets/AddNewPost.css'
import {useNavigate} from "react-router-dom";
import UserAPI from "../Services/Users";

const AddNewPost = () => {
    const {user} = useAuth0()
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        Postsapi.postNewPost({ title: formData.get("Title"),body: formData.get("Body"), createdBy: user.sub.replace("|", "t")})
            .then(() => {
                UserAPI.postUser(user).then(res => res);
                navigate("/profile")
            })
            .catch(err => console.log(err))

    };

    return (
        <div className="AddForm">
            <form onSubmit={handleSubmit}>
                <h1>Add new post</h1>
                <input type="text" name="Title" placeholder="Title" />
                <input type="text" name="Body" placeholder="Body" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddNewPost