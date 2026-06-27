import { Button } from '#root/components/ui/button.jsx';
import { Field } from '#root/components/ui/field.jsx';
import { fetchData } from '#root/services/fetch.js';

const fields = [
	{
		label: 'Username',
		props: {
			name: 'username',
			autoComplete: 'username',
			pattern: '\\w+',
			placeholder: 'john_doe123',
			maxLength: 50,
		},
	},
	{
		label: 'Password',
		props: {
			name: 'password',
			autoComplete: 'new-password',
			minLength: 2,
			maxLength: 100,
		},
	},
];

const submissionEndpoints = ['in', 'up'];

const createField = ({ label, props }) => (
	<Field label={label} key={crypto.randomUUID()}>
		<input type="text" {...props} required />
	</Field>
);

const createSubmitButton = (endpoint) => (
	<Button type="submit" key={crypto.randomUUID()}>
		Sign {endpoint}
	</Button>
);

export const Auth = ({ time }) => {
	const handleSubmit = (e) => {
		e.preventDefault();

		fetch('http://localhost:3000/api/v1/users/sign-up', {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/JSON',
			},
			body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
		})
			.then((error) => error.json())
			.then((error) => console.error(error[0].errors.map(({ message }) => message)));
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>New high score!</h2>
			<p>
				You finished in <time dateTime={time}>{time}</time>.
			</p>
			<p>Sign in or up to save your score:</p>
			{fields.map(createField)}
			{submissionEndpoints.map(createSubmitButton)}
		</form>
	);
};
