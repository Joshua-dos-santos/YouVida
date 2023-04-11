import API from '../Services/api'

const UserFollowersAPI = {
    fetchAllUserFollowers: async () => {
        return await API.get(`api/users/UserFollower`)
            .then((res) => res)
            .catch((err) => err)
    }
}

export default UserFollowersAPI