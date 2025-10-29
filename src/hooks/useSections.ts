import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Section } from '../types';

const API_URL = 'http://192.168.1.4:3000/sections';

export default function useSections() {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(API_URL);
            setSections(res.data);
        } catch (err: any) {
            setError(err.message || 'Lỗi khi tải các phần học');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { sections, loading, error, refetch: fetchData };
}