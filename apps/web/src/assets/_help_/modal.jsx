import { Auth } from './dialogs/auth.jsx';
import { Leaderboard } from './dialogs/leaderboard.jsx';
import { Welcome } from './dialogs/welcome.jsx';
import { Button } from './ui/button.jsx';

const Modal = ({ id, closedBy = 'any', hasCloseButton = true, children }) => {
	const modalId = `${id}-modal`;

	const closeButton = hasCloseButton && (
		<Button command="close" commandfor={modalId}>
			Close
		</Button>
	);

	return (
		<dialog id={modalId} closedby={closedBy}>
			{children}
			{closeButton}
		</dialog>
	);
};

export const modals = [
	{
		id: 'welcome',
		props: {
			hasCloseButton: false,
		},
		children: <Welcome />,
	},
	{
		id: 'leaderboard',
		children: <Leaderboard />,
	},
	{
		id: 'auth',
		props: {
			closedBy: 'none',
			hasCloseButton: false,
		},
		children: <Auth time={99_999} />,
	},
];

export const createModal = ({ id, props, children }) => (
	<Modal id={id} {...props} key={id}>
		{children}
	</Modal>
);
