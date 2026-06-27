const Modal = ({ id, closedBy = 'any', children }) => (
	<dialog id={`${id}-modal`} closedby={closedBy}>
		{children}
	</dialog>
);

export const createModal = ({ id, closedBy, children }) => (
	<Modal id={id} closedBy={closedBy} key={crypto.randomUUID()}>
		{children}
	</Modal>
);
