export const Button = ({ type = 'button', children, ...props }) => (
	<button type={type} {...props}>
		{children}
	</button>
);
