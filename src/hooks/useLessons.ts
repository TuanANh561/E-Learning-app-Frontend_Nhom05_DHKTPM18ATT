import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Lesson } from '../types'; // Import Lesson type

const API_URL = 'http://192.168.1.4:3000/lessons'; // ✅ URL cho Lessons

export default function useLessons() {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(API_URL);
            setLessons(res.data);
        } catch (err: any) {
            setError(err.message || 'Lỗi khi tải các bài học');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { lessons, loading, error, refetch: fetchData };
}