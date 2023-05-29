import styled from "styled-components";

export function Table({ head = [], body = [], ...otherProps }) {
	return (
		<Wrapper border="1" {...otherProps}>
			<thead>
				<tr>
					{head.map((text) => (
						<td key={text}>{text}</td>
					))}
				</tr>
			</thead>

			<tbody>
				{body.map((row) => (
					<tr key={row[0]}>
						{row.map((text, index) => (
							<td key={`${text}_${index}`}>{text}</td>
						))}
					</tr>
				))}
			</tbody>
		</Wrapper>
	);
}

const Wrapper = styled.table`
	width: 100%;
	height: auto;
	border: 1px solid var(--light-gray);
	font-size: 0.9rem;
	color: var(--medium-gray-dark);

	thead {
		font-weight: 700;
		background-color: var(--blue);
		color: var(--white);
	}

	td {
		max-width: 50px;
		border: 1px solid var(--light-gray);
		padding: 0.5rem;
		border-collapse: collapse;
		width: fit-content;
		overflow: scroll;

		-ms-overflow-style: none;
		scrollbar-width: none;

		::-webkit-scrollbar {
			display: none;
		}
	}
`;
