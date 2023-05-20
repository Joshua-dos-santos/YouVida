import API from '../Services/api'
import axios from "axios";

const headers = {
    'Access-control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}

const Postsapi = {
    fetchAllPosts: async () => {
        return await axios.get(`https://10.0.81.165/api/posts/Post`)
            .then((res) => res)
            .catch((err) => err)
    },

    fetchPostsByUser: async (id) => {
        return await axios.get(`https://10.0.81.165/api/posts/Post/${id}`)
            .then((res) => res)
            .catch((err) => err)
    },

    fetchPostsById: async (id) => {
        return await axios.get(`https://10.0.81.165/api/posts/Post/${id}`)
            .then((res) => res)
            .catch((err) => err)
    },

    postNewPost: async (post) => {
        return await API(`api/posts/Post`, {
            method: 'post',
            headers: headers,
            data: post
        }).then(res => res).catch(err => console.log(err))
    },

    deletePost: async (postId) => {
        return await axios.delete(`https://10.0.81.165/api/posts/Post/${postId}`)
            .then(res => res)
            .catch(err => console.log(err))
    }
}
export default Postsapi;