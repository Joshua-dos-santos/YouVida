import React from 'react';

const UserList = ({ posts }) => (
    <div>
        <h1>Posts</h1>
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    {post.title}
                </li>
            ))}
        </ul>
    </div>
);

export default UserList;

