import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Review } from '../types'; // Import Review type

const API_URL = 'http://192.168.1.4:3000/reviews'; // ✅ URL cho Reviews

export default function useReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(API_URL);
            setReviews(res.data);
        } catch (err: any) {
            setError(err.message || 'Lỗi khi tải đánh giá');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { reviews, loading, error, refetch: fetchData };
}