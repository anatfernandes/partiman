import styled from "styled-components";
import { Oval as LoaderSpinner } from "react-loader-spinner";

export function Loading({ size = "normal", margin = "3rem auto" }) {
	let loadingSize = 36;

	if (size === "small") loadingSize = 24;
	if (size === "large") loadingSize = 42;

	return (
		<Wrapper margin={margin}>
			<LoaderSpinner
				height={loadingSize}
				width={loadingSize}
				color="#38B9E2"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel="oval-loading"
				secondaryColor="none"
				strokeWidth={2}
				strokeWidthSecondary={2}
			/>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	&& {
		width: fit-content;
		margin: ${(props) => props.margin};
	}
`;
