import API from '../Services/api'

const headers = {
    'Access-control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}

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
    },

    postNewPost: async (post) => {
        return await API(`api/posts/Post`, {
            method: 'post',
            headers: headers,
            data: post
        }).then(res => console.log(res)).catch(err => console.log(err))
    },

    deletePost: async (postId) => {
        return await API.delete(`api/posts/Post/${postId}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
}
export default Postsapi;