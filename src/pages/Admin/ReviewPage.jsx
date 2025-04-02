import React, { useEffect, useState } from 'react';
import Layout from '../../components/layoutAdmin/Layout';
import { getReviews } from '../../services/apiReviewPage';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

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
                                        <Typography variant="body2">
                                            Khách hàng: {review.customer_id}
                                        </Typography>
                                        <Typography variant="body2">
                                            Bác sĩ: {review.doctor_id}
                                        </Typography>
                                        <Typography variant="body2">
                                            Đánh giá: {review.rating}
                                        </Typography>
                                        <Typography variant="body2">
                                            Bình luận: {review.comment}
                                        </Typography>
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