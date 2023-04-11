import API from '../Services/api'


const Postsapi = {
    fetchAllPosts: async () => {
        return await API.get(`api/posts/Post`)
            .then((res) => res)
            .catch((err) => err)
    },

    fetchPostsByUser: async () => {
        return await API.get(`api/users/UserPost`)
            .then((res) => res)
            .catch((err) => err)
    },
    fetchPostsById: async (id) => {
            return await API.get(`api/posts/Post/${id}`)
                .then((res) => res)
                .catch((err) => err)
        }
}
export default Postsapi;