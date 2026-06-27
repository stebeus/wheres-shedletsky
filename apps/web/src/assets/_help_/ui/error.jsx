import errorImage from '#root/assets/error.webp';

export const ErrorBoundary = ({ error: { message } }) => (
	<>
		<h2>Oops - {message}</h2>
		<img src={errorImage} alt="Noob poking bomb with stick" width={280} height={280} />
	</>
);
