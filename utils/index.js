export const isEmpty = obj => {
	if (!obj) return true;
	return Object.keys(obj).length === 0;
};

export const fetcher = url => fetch(url).then(res => res.json());
