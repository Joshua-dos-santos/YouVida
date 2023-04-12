import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import Postsapi from "../Services/Posts";
import '../Stylesheets/AddNewPost.css'
import {Router} from "react-router";
import Timeline from "./Timeline";

const AddNewPost = () => {
    const {user} = useAuth0()

    const handleSubmit = (event) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        Postsapi.postNewPost({ title: formData.get("Title"),body: formData.get("Body"), createdBy: user.sub})
            .then(res => {
                console.log("Success" + res);
            })
            .catch(err => console.log(err))

    };

    return (
        <div>
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