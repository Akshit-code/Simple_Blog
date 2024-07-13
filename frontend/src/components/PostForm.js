import React, { useState } from 'react';
import axios from 'axios';

function PostForm() {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('author', author);
        formData.append('title', title);
        formData.append('content', content);
        if (image) formData.append('image', image);

        axios.post('http://localhost:5000/api/posts', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default PostForm;
