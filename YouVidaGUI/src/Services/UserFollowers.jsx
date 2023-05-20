import API from '../Services/api'
import axios from "axios";

const headers = {
    'Access-control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}

const UserFollowersAPI = {
    fetchAllUserFollowers: async () => {
        return await axios.get(`10.0.246.154/api/users/UserFollower`)
            .then((res) => res)
            .catch((err) => err)
    },

    postUserFollower: async (userId, followerId) => {
        return await axios(`10.0.246.154/api/users/UserFollower`,{
            method: 'post',
            headers: headers,
            data: {
                UserId: userId,
                followerId: followerId
            }
        })
            .then((res) => res)
            .catch((err) => err)
    },

    deleteUserFollower: async (userFollowerId) => {
        return await API(`api/users/UserFollower`, {
            method: 'delete',
            headers: headers,
            data: {
                UserFollowerId: userFollowerId,
            }
        })
            .then((res) => res)
            .catch((err) => err)
    },
}

export default UserFollowersAPI