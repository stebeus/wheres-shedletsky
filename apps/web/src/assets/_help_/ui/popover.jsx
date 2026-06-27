export const Popover = ({ id, children }) => (
	<dialog id={id} popover="auto">
		{children}
	</dialog>
);
