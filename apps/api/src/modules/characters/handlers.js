import { findCharacters, isCharacter } from './services.js';

export const getMany = async (req, res, next) => res.send({ data: await findCharacters() });

export const getIsCharacter = async (req, res, next) => {
	const { name, position } = req.query;
	res.send({ isCharacter: await isCharacter(position, name) });
};
