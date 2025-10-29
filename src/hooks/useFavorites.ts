import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Favorite } from '../types';

const API_BASE_URL = 'http://192.168.1.4:3000'; 

export default function useFavorites(userId: number | null) {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!userId) {
            setFavorites([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<Favorite[]>(`${API_BASE_URL}/favorites?user_id=${userId}`);
            setFavorites(res.data);
        } catch (err: any) {
            setError(err.message || `Lỗi khi tải danh sách yêu thích của user ${userId}`);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { favorites, loading, error, refetch: fetchData };
}