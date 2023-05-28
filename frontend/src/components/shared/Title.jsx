import styled from "styled-components";

const defaultConfig = {
	margin: "0",
	align: "start",
};

export function Title({ children, config = defaultConfig, ...otherProps }) {
	return (
		<Wrapper {...otherProps} {...defaultConfig} {...config}>
			{children}
		</Wrapper>
	);
}

const Wrapper = styled.h1`
	font-size: 1.4rem;
	line-height: 3rem;
	font-weight: 700;
	color: var(--medium-gray-dark);
	margin: ${(props) => props.margin};
	text-align: ${(props) => props.align};

	@media (max-width: 500px) {
		font-size: 1.2rem;
		line-height: 2.5rem;
	}
`;
