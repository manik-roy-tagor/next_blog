import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const [userId, setUserId] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is logged in (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (!user) {
        toast.info('Please login to add a post.', {
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        const userData = JSON.parse(user);
        setUserId(userData.id);
      }
      setIsCheckingAuth(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}addPost.php`, {
        title: formData.title,
        content: formData.content,
        user_id: userId,
      });

      if (response.data.status === 'success') {
        toast.success('Post added successfully!');
        setFormData({ title: '', content: '' });
      } else {
        toast.error('Error adding post');
      }
    } catch (err) {
      console.error('Error adding post:', err);
      toast.error('An error occurred while adding the post.');
    }
  };

  if (isCheckingAuth || !userId) return null; // Avoid rendering before auth check

  return (
    <div className="container mb-4">
      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label fw-bold">Content</label>
          <textarea
            name="content"
            className="form-control"
            rows="5"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
