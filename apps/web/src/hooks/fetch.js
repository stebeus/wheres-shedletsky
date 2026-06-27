import { useEffect, useState } from 'react';

import { config } from '#root/config.js';

class FetchError extends Error {
	constructor(json) {
		super();
		this.json = json;
	}
}

export const useFetch = (endpoint, options) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const url = `${config.VITE_API_URL}/${endpoint}`;

			try {
				const res = await fetch(url, options);
				const { data, error } = await res.json();

				if (!res.ok) throw new FetchError(error);

				setData(data);
			} catch (error) {
				setError(error.json);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [endpoint, options]);

	return { data, error, isLoading };
};
