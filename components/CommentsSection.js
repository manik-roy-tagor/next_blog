import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Spinner, Toast } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CommentsSection = ({ blogId, user }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const fetchComments = async (reset = false) => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}get-comments.php?blog_id=${blogId}&page=${page}`);
            if (res.data.status === 'success') {
                const fetched = res.data.data || [];
                if (reset) {
                    setComments(fetched);
                } else {
                    setComments(prev => [...prev, ...fetched]);
                }
                if (fetched.length < 5) setHasMore(false);
            }
        } catch (err) {
            toast.error('Failed to load comments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments(true);
    }, [blogId]);

    const handleComment = () => {
        if (!user?.id) {
            toast.info('Please login to Comment this blog.', {
                position: 'top-right',
                autoClose: 2000,
            });
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
            return;
        }
        postComment();
    };

    const handleReply = (commentId) => {
        if (!user?.id) {
            toast.info('Please login to reply to comments.', {
                position: 'top-right',
                autoClose: 2000,
            });
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
            return;
        }
        setReplyTo(commentId);
    };

    const postComment = async () => {
        if (!newComment.trim()) return;

        try {
            const res = await axios.post(`${API_URL}comments.php`, {
                user_id: user.id,
                blog_id: blogId,
                text: newComment,
                parent_id: replyTo
            });
            if (res.data.status === 'success') {
                toast.success('Comment posted successfully!', {
                    position: 'top-right',
                    autoClose: 2000,
                });
                setNewComment('');
                setReplyTo(null);
                setPage(1);
                fetchComments(true);
            }
        } catch (err) {
            toast.error('Failed to post comment:', err);
        }
    };

    const renderComments = (comments, level = 0) => {
        return comments.map((comment) => (
            <div key={comment.id} style={{ marginLeft: `${level * 20}px`, marginBottom: '15px' }}>
                <div className="border p-3 rounded bg-light-subtle shadow-sm" style={{marginBottom: '10px'}}>
                    <strong>{comment.user}</strong>
                    <p className="mb-2">{comment.text}</p>
                    <Button
                        style={{
                            color: 'rgb(162, 19, 8)',
                            textDecoration: 'none',
                            border: '1px solid rgb(162, 19, 8)',
                            borderRadius: '15px',
                            padding: '3px 10px',
                            cursor: 'pointer'
                        }}
                        variant="link"
                        size="sm"
                        onClick={() => handleReply(comment.id)}
                    >
                        Reply
                    </Button>
                </div>
                {comment.replies && renderComments(comment.replies, level + 1)}
            </div>
        ));
    };

    return (
        <div className="mt-4">
            <h4 className="fw-bold mb-4 text-dark">Comments</h4>

            {renderComments(comments)}

            {hasMore && (
                <div className="text-center my-3">
                    <Button
                        variant="outline-primary"
                        onClick={() => {
                            setPage(prev => prev + 1);
                            fetchComments();
                        }}
                        disabled={loading}
                    >
                        {loading ? <Spinner size="sm" animation="border" /> : 'Load More Comments'}
                    </Button>
                </div>
            )}

            <Form className="mt-4">
                <Form.Group>
                    <Form.Label>{replyTo ? 'Replying to a comment' : 'Add a comment'}</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment..."
                    />
                </Form.Group>
                <Button className="mt-2" onClick={handleComment} disabled={!newComment.trim()}>
                    {replyTo ? 'Post Reply' : 'Post Comment'}
                </Button>
                {replyTo && (
                    <Button variant="secondary" className="mt-2 ms-2" onClick={() => setReplyTo(null)}>
                        Cancel Reply
                    </Button>
                )}
            </Form>
            <ToastContainer />
        </div>
    );
};

export default CommentsSection;
