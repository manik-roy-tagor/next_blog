import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const router = useRouter();
    const { user_id } = router.query;

    useEffect(() => {
        if (user_id) {
            axios.get(`${API_URL}getUserBlogs.php?user_id=${user_id}`)
                .then(res => {
                    if (res.data.status === 'success') {
                        setBlogs(res.data.data);
                    } else {
                        toast.error('Failed to load user blogs');
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                    toast.error('Error fetching user blogs');
                });
        }
    }, [user_id]);

    const handleLike = (blogId) => {
        setBlogs(prev =>
            prev.map(blog =>
                blog.id === blogId ? { ...blog, like_count: blog.like_count + 1 } : blog
            )
        );
    };

    return (
        <div className="container my-4">
            <h3>User's Blog Posts</h3>
            {blogs.length === 0 ? (
                <p>No blogs found.</p>
            ) : (
                blogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} onLike={handleLike} />
                ))
            )}
        </div>
    );
};

export default UserBlogs;
