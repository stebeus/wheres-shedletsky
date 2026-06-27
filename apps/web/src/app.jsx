import { useState } from 'react';

import { Footer, Navbar } from './components/index.js';
import { Auth, createModal, Leaderboard, Welcome } from './components/modals/index.js';
import { Button } from './components/ui/index.js';

export const App = () => {
	const [time, setTime] = useState(0);

	const modals = [
		{
			id: 'welcome',
			children: <Welcome />,
		},
		{
			id: 'leaderboard',
			children: <Leaderboard />,
		},
		{
			id: 'auth',
			closedBy: 'none',
			children: <Auth time={time} />,
		},
	];

	return (
		<>
			<Navbar />
			<main>
				<Button command="show-modal" commandfor="welcome-modal">
					Open modal
				</Button>
			</main>
			<Footer />
			{modals.map(createModal)}
		</>
	);
};
