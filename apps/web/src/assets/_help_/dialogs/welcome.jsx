import { Button } from '#root/components/ui/button.jsx';
import { config } from '#root/config.js';

export const Welcome = () => (
	<>
		<h2>
			Welcome to <em>{config.VITE_APP_NAME}</em>
		</h2>
		<p>
			Be the quickest player to find all characters by clicking on their eyes, and then selecting
			their names correctly!
		</p>
		<Button command="close" commandfor="welcome-modal">
			Play now
		</Button>
	</>
);
