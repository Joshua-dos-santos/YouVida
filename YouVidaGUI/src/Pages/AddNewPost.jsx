import React from "react";
import '../Stylesheets/AddNewPost.css'

const AddNewPost = () => {

    const handleSubmit = (event) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input   type="text" name="Title" placeholder="Title" />
                <input type="text" name="Body" placeholder="Body" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddNewPost