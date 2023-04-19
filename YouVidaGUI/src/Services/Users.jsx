import API from '../Services/api'

const headers = {
    'Access-control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}

const UserAPI = {
    postUser: async (user) => {
        return await API(`api/users/User`,{
            method: 'post',
            headers: headers,
            data: {
                UserId: user.sub,
                Email: user.email,
                Name: user.name,
                Profilepic: user.picture,
                Username: user.username,
                CreatedAt: user.updated_at,
                LastLogin: user.updated_at,
            }
        })
            .then((res) => res)
            .catch((err) => err)
    },
    getUsers: async () => {
        return await API.get(`api/users/User`)
            .then((res) => res)
            .catch((err) => err)
    }
}


export default UserAPI