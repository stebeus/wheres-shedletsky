import { ErrorBoundary } from '#root/components/ui/error.jsx';
import { Loader } from '#root/components/ui/loader.jsx';
import { useFetch } from '#root/hooks/use-fetch.js';

const createScore = ({ id, username, bestTimeInMs }) => (
	<li key={id}>
		{username} <time dateTime={bestTimeInMs}>{bestTimeInMs}</time>
	</li>
);

export const Leaderboard = () => {
	const { data, isLoading, error } = useFetch('useres');

	if (isLoading) return <Loader />;
	if (error != null) return <ErrorBoundary error={error} />;

	return (
		<>
			<h2>Leaderboard</h2>
			<ol>{data.map(createScore)}</ol>
		</>
	);
};
