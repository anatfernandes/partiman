import styled from "styled-components";

const defaultConfig = {
	type: "primary",
	width: "8rem",
	height: "2.7rem",
	margin: "0.5rem",
	radius: "5px",
	padding: "0",
};

export function Button({ children, config = defaultConfig, ...otherProps }) {
	return (
		<Wrapper {...otherProps} {...defaultConfig} {...config}>
			{children}
		</Wrapper>
	);
}

const Wrapper = styled.button`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	border-radius: ${(props) => props.radius};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};

	background-color: var(--blue);
	border: 1px solid var(--white);
	font-family: "Roboto", sans-serif;
	font-size: 1rem;
	color: var(--white);
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.2s linear;

	:hover {
		filter: brightness(0.9);
		transform: translateY(-1.5px);
	}

	:disabled {
		filter: brightness(0.6);
		cursor: inherit;
	}

	${(props) =>
		props.type === "secundary"
			? `
                color: var(--blue);
                background-color: var(--white);
                border-color: var(--blue);
            `
			: ""}

	@media (max-width: 450px) {
		width: 100%;
		margin-left: 0;
		margin-right: 0;
		font-size: 0.9rem;
	}
`;
