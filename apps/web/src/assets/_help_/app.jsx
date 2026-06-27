import { useEffect } from 'react';

import { Footer } from './components/footer.js';
import { Grid } from './components/grid.js';
import { createModal, modals } from './components/modal.js';
import { Navbar } from './components/navbar.js';
import { Button } from './components/ui/button.js';

export const App = () => {
	const timer = 100;
	const characterRemainder = 40;

	useEffect(() => {
		document.querySelector('#welcome-modal').showModal();
	});

	const styles = /* css */ `
		.grid {
			display: grid;
			grid-template-rows: repeat(16, 40px);
			grid-template-columns: repeat(27, 40px);

			.cell {
				outline: 1px solid red;
			}
		}`;

	return (
		<>
			<style type="css">{styles}</style>
			<Navbar />
			<main>
				<div>
					<output role="timer" aria-atomic="true">
						{timer}
					</output>
					<p>{characterRemainder} remaining</p>
				</div>

				<div>
					<Button>Restart</Button>
					<Button command="show-modal" commandfor="auth-modal">
						Leaderboard
					</Button>
				</div>

				<Grid />
			</main>
			<Footer />
			{modals.map(createModal)}
		</>
	);
};
