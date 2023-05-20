import API from '../Services/api'
import axios from "axios";

const headers = {
    'Access-control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}

const UserAPI = {
    postUser: async (user) => {
        return await axios(`https://10.0.246.154/api/users/User`,{
            method: 'post',
            headers: headers,
            data: {
                UserId: user.sub.replace("|", "t"),
                Email: user.email,
                Name: user.name,
                Profilepic: user.picture,
                Username: user.nickname,
                CreatedAt: user.updated_at,
                LastLogin: user.updated_at,
            }
        })
            .then((res) => res)
            .catch((err) => err)
    },
    getUserById: async (id) => {
        return await axios.get(`https://10.0.246.154/api/users/User/${id}`)
            .then((res) => res)
            .catch((err) => err)
    },
    getAllUsers: async () => {
        return await axios.get(`https://10.0.246.154/api/users/User`)
            .then((res) => res)
            .catch((err) => err)
    },
    deleteUser: async (userId) => {
        return await axios.delete(`https://10.0.246.154/api/users/User/${userId}`, {
            headers: headers
        })
            .then((res) => res)
            .catch((err) => err)
    }
}


export default UserAPI