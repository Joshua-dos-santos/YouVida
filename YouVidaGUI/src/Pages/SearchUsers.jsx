import React, {useEffect, useState} from "react";
import UserAPI from "../Services/Users";
import '../Stylesheets/SearchUsers.css'

const SearchUsers = () => {

    const [users, setUsers] = useState([])
    const [query, setQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const getUsers = () => {
        UserAPI
            .getAllUsers().then(res => setUsers(res.data))
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
                {filteredUsers.map((user) => (
                    <tr key={user.userId}>
                        <td>{user.name}</td>
                        <button>Follow</button>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default SearchUsers