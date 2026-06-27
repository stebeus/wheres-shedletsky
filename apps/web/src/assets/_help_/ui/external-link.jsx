export const ExternalLink = ({ to, className, children }) => (
	<a className={className} href={to} target="_blank" rel="noopener noreferrer">
		{children}
	</a>
);
