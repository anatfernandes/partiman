import styled from "styled-components";

const defaultConfig = {
	width: "20rem",
	height: "2.7rem",
	margin: "0.5rem",
	radius: "5px",
	padding: "0 1rem",
};

export function Input({ config = defaultConfig, ...otherProps }) {
	return <Wrapper {...otherProps} {...defaultConfig} {...config} />;
}

const Wrapper = styled.input`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	border-radius: ${(props) => props.radius};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};

	background-color: var(--white);
	border: 1px solid var(--blue);
	font-family: "Roboto", sans-serif;
	font-size: 1rem;
	color: var(--light-gray);
	font-weight: 400;
	caret-color: var(--blue);
	transition: all 0.1s linear;

	::placeholder {
		color: var(--medium-gray-light);
	}

	:focus {
		color: var(--medium-gray-dark);
		box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.25);
	}

	:disabled {
		filter: brightness(0.6);
		cursor: inherit;
	}

	:-webkit-autofill {
		box-shadow: 0 0 0 30px var(--white) inset;
		-webkit-box-shadow: 0 0 0 30px var(--white) inset;
		-webkit-text-fill-color: var(--light-gray);
	}

	:-webkit-autofill:focus {
		-webkit-text-fill-color: var(--medium-gray-dark);
	}

	@media (max-width: 450px) {
		width: 100%;
		margin-left: 0;
		margin-right: 0;
	}
`;
