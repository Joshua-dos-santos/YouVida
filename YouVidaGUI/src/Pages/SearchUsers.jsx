import React, {useEffect, useState} from "react";
import UserAPI from "../Services/Users";
import '../Stylesheets/SearchUsers.css'
import {useAuth0} from "@auth0/auth0-react";
import UserFollowersAPI from "../Services/UserFollowers";

const SearchUsers = () => {

    const{user} = useAuth0();

    const [users, setUsers] = useState([])
    const [query, setQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const getUsers = () => {
        UserAPI
            .getAllUsers().then(res => setUsers(res.data))
    }

    const followUser = (userId) => {
        console.log(user.sub.replace("|", "t") + " follows " + userId)
        UserFollowersAPI
            .postUserFollower(userId, user.sub.replace("|", "t"))
            .then(() => console.log("Following"))
    }

    const filterUsers = (query) => {
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="table-wrapper">
            <input
                id="SearchBar"
                type="text"
                placeholder="Search for a user"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    filterUsers(e.target.value);
                }}
            />
            <table id="items" className="fl-table">
                <tbody>
                {filteredUsers.map((Suser) => (
                    <tr key={Suser.userId}>
                        <td><img id="userpic" src={Suser.profilepic}/>{Suser.email}</td>
                        <button onClick={() => followUser(Suser.userId)}>Follow</button>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default SearchUsers