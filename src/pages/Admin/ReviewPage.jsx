import React, { useEffect, useState } from 'react';
import Layout from '../../components/layoutAdmin/Layout';
import { getReviews, updateReview, deleteReview } from '../../services/apiReviewPage';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState('');
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editComment, setEditComment] = useState('');
    const [editRating, setEditRating] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getReviews();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const startEditing = (review) => {
        setEditingReviewId(review.id);
        setEditComment(review.comment);
        setEditRating(review.rating);
    };

    const handleUpdateReview = async (id) => {
        try {
            const updated = await updateReview(id, { comment: editComment, rating: editRating });
            setReviews(reviews.map(r => r.id === id ? updated : r));
            setEditingReviewId(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteReview = async (id) => {
        try {
            await deleteReview(id);
            setReviews(reviews.filter(r => r.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Quản lý đánh giá</h1>
                {loading ? (
                    <p>Đang tải...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            ID: {review.id}
                                        </Typography>
                                        {editingReviewId === review.id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editComment}
                                                    onChange={(e) => setEditComment(e.target.value)}
                                                    className="border p-1 mb-2"
                                                />
                                                <input
                                                    type="number"
                                                    value={editRating}
                                                    onChange={(e) => setEditRating(e.target.value)}
                                                    className="border p-1 mb-2"
                                                />
                                                <button onClick={() => handleUpdateReview(review.id)} className="bg-green-500 text-white p-1 mr-2 rounded">Lưu</button>
                                                <button onClick={() => setEditingReviewId(null)} className="bg-gray-500 text-white p-1 rounded">Hủy</button>
                                            </>
                                        ) : (
                                            <>
                                                <Typography variant="body2">
                                                    Bình luận: {review.comment}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Đánh giá: {review.rating}
                                                </Typography>
                                                <button onClick={() => startEditing(review)} className="bg-blue-600 text-white p-1 mr-2 mt-2 rounded">Sửa</button>
                                                <button onClick={() => handleDeleteReview(review.id)} className="bg-red-500 text-white p-1 mt-2 rounded">Xóa</button>
                                            </>
                                        )}
                                        <Typography variant="body2">
                                            Ngày tạo: {new Date(review.created_at).toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ReviewPage;