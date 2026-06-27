import { useState } from 'react';

import { Button } from '#root/components/ui/button.jsx';
import { Field } from '#root/components/ui/field.jsx';
import { Form } from '#root/components/ui/form.jsx';

const inputFields = [
	{
		label: 'Username',
		helpText: 'Maximum length: 50',
		props: {
			type: 'text',
			name: 'username',
			autoComplete: 'username',
			pattern: '\\w+',
			placeholder: 'john_doe123',
			maxLength: 50,
			required: true,
		},
	},
	{
		label: 'Password',
		helpText: 'Minimum length: 4',
		props: {
			type: 'text',
			name: 'password',
			autoComplete: 'new-password',
			minLength: 4,
			maxLength: 100,
			required: true,
		},
	},
];

const submitButtonEndpoints = ['in', 'up'];

const createInputFields = ({ label, helpText, props }) => (
	<Field label={label} helpText={helpText} key={crypto.randomUUID()}>
		<input {...props} />
	</Field>
);

const createSubmitButton = (handler) => (label) => (
	<Button type="submit" onClick={() => handler(label)} key={crypto.randomUUID()}>
		Sign {label}
	</Button>
);

export const Auth = ({ time }) => {
	const [endpoint, setEndpoint] = useState(null);

	const handleAction = () => {
		const ids = ['auth', 'leaderboard'];

		const queryModal = (id) => document.querySelector(`#${id}-modal`);
		const [auth, leaderboard] = ids.map(queryModal);

		auth.close();
		leaderboard.showModal();
	};

	const handleClick = (endpoint) => setEndpoint(`users/sign-${endpoint}`);

	return (
		<Form endpoint={endpoint} payload={{ bestTimeInMs: time }} onAction={handleAction}>
			<h2>New high score!</h2>
			<p>
				You finished in <time dateTime={time}>{time}</time>.
			</p>
			<p>Sign in or up to save your score:</p>
			{inputFields.map(createInputFields)}
			{submitButtonEndpoints.map(createSubmitButton(handleClick))}
		</Form>
	);
};

import { useForm } from '@tanstack/react-form';
import React from 'react';
import ReactDOM from 'react-dom/client';

const PeoplePage = () => {
	const form = useForm({
		defaultValues: {
			username: '',
			age: 0,
		},
		onSubmit: ({ value }) => {
			// Do something with form data
			alert(JSON.stringify(value, null, 2));
		},
	});

	return (
		<form.Field
			name="age"
			validators={{
				// We can choose between form-wide and field-specific validators
				onChange: ({ value }) => (value > 13 ? undefined : 'Must be 13 or older'),
			}}
			children={(field) => (
				<>
					<input
						name={field.name}
						value={field.state.value}
						onBlur={field.handleBlur}
						type="number"
						onChange={(e) => field.handleChange(e.target.valueAsNumber)}
					/>
					{!field.state.meta.isValid && <em>{field.state.meta.errors.join(',')}</em>}
				</>
			)}
		/>
	);
};
