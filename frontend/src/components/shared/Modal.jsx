import styled from "styled-components";
import ReactModal from "react-modal";
import { Button } from "./Button";

ReactModal.setAppElement("#root");

export function Modal({
	modalConfig,
	setModalConfig,
	nextCallback = () => {},
}) {
	function closeModal() {
		setModalConfig((prev) => ({ ...prev, isOpen: false }));
	}

	return (
		<Wrapper
			isOpen={modalConfig.isOpen}
			onRequestClose={closeModal}
			style={{
				overlay: {
					zIndex: 15,
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				},
			}}
			shouldCloseOnOverlayClick={true}
		>
			<Container>
				<Title>Delete</Title>

				<Division></Division>

				<p>Are you sure you want to continue?</p>
				<p>
					<b>Attention:</b> this action <u>cannot</u> be undone!
				</p>

				<Buttons>
					<Button config={{ type: "secundary" }} onClick={closeModal}>
						Cancel
					</Button>

					<Button config={{ type: "primary" }} onClick={nextCallback}>
						Delete
					</Button>
				</Buttons>
			</Container>
		</Wrapper>
	);
}

const Wrapper = styled(ReactModal)`
	&& {
		width: 90%;
		max-width: 400px;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		padding: 1rem;
		background-color: var(--white);
	}
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
	font-size: 1rem;
	font-weight: 400;
	color: var(--medium-gray-dark);

	p {
		margin: 1.2rem 0;
	}

	b {
		font-weight: 700;
	}

	u {
		text-decoration: underline;
	}

	@media (max-width: 500px) {
		font-size: 0.8rem;
	}
`;

const Title = styled.h5`
	font-size: 1.2rem;
	font-weight: 700;
	text-align: center;
	color: var(--medium-gray-dark);

	@media (max-width: 500px) {
		font-size: 1rem;
	}
`;

const Division = styled.div`
	width: 100%;
	height: 1px;
	background-color: var(--medium-gray-light);
	margin: 1rem 0;
`;

const Buttons = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 450px) {
		flex-direction: column-reverse;
		justify-content: space-between;
	}
`;
