import * as z from 'zod';

const positionRegex = /[0-9]+,[0-9]+/g;

export const query = z.object({
	name: z.string(),
	position: z.string().regex(positionRegex),
});
