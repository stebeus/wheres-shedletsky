export const Button = ({ type = 'button', children, ...props }) => (
	<button type={type} {...props}>
		{children}
	</button>
);

export const CloseButton = ({ commandFor, children }) => (
	<Button command="close" commandfor={`${commandFor}-modal`}>
		{children}
	</Button>
);
