import styled from "styled-components";

const defaultConfig = {
	margin: "0",
	align: "start",
};

export function Subtitle({ children, config = defaultConfig, ...otherProps }) {
	return (
		<Wrapper {...otherProps} {...defaultConfig} {...config}>
			{children}
		</Wrapper>
	);
}

const Wrapper = styled.h1`
	font-size: 1rem;
	line-height: 1.3rem;
	font-weight: 400;
	color: var(--medium-gray-dark);
	margin: ${(props) => props.margin};
	text-align: ${(props) => props.align};
`;
