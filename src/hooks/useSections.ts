import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Section } from '../types';
import { API_URL } from './api';

export default function useSections() {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(API_URL.sections);
            setSections(res.data);
        } catch (err: any) {
            setError(err.message || 'Lỗi khi tải các phần học');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSectionById = useCallback(async (id: number) => {
        try {
            const res = await axios.get<Section>(`${API_URL.sections}/${id}`);
            return res.data;
        } catch (error) {
            console.error("Lỗi khi lấy section ID:", id, error);
            return null;
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { sections, loading, error, refetch: fetchData, fetchSectionById};
}