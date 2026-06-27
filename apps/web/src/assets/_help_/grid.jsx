/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <sthu> */
export const Grid = () => {
	const leGrid = Array.from({ length: 16 }, () => new Array(27).fill(0));

	// create cells based on a 2d array, giving the pos coordinates
	const createCell = (_, row) =>
		leGrid[row].map((_, column) => (
			// biome-ignore lint/a11y/noStaticElementInteractions: <shut up>
			<div
				onClick={() => console.log(row, column)}
				className="cell"
				data-position={`${row},${column}`}
				key={crypto.randomUUID()}
			>
				{row}, {column}
			</div>
		));

	return <div className="grid">{leGrid.map(createCell)}</div>;
};
