import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { User } from '../types';
import { API_URL } from './api';

export default function useUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await axios.get(API_URL.users);
			setUsers(res.data);
		} catch (err: any) {
			setError(err.message || 'Lỗi khi tải người dùng');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { users, loading, error, refetch: fetchData };
}