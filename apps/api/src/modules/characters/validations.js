import * as z from 'zod';

const split = (value) => value.split(',');

export const query = z.object({
	name: z.string(),
	position: z.transform(split).pipe(z.tuple([z.coerce.number(), z.coerce.number()])),
});
