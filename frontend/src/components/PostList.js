import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p><em>— {post.author}</em></p>
                    {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ maxWidth: '100%', height: 'auto' }} />}
                </div>
            ))}
        </div>
    );
}

export default PostList;
