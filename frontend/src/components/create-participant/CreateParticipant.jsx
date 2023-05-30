import styled from "styled-components";
import { useState } from "react";
import { api } from "../../services/partiman";
import { useForm, useRequestMutation, useToast } from "../../hooks";
import { requestKeyEnum } from "../../enums/requestKey";
import { Button, Icon, Input } from "../shared";

export function CreateParticipant() {
	const toast = useToast();
	const [isOpen, setIsOpen] = useState(false);

	const {
		form: participant,
		updateForm,
		validateForm,
		handleForm,
		clearForm,
	} = useForm();

	const request = useRequestMutation({
		key: [requestKeyEnum.participants],
		requestCallback: (body) => api.createParticipant(body),
		onError: onRequestError,
		onSuccess: onRequestSuccess,
	});

	function toggleIsOpen() {
		setIsOpen((prev) => !prev);
	}

	function isValidForm() {
		const validations = [
			{
				error:
					participant.firstname.length < 3 || participant.firstname.length > 30,
				message: '"First name" must be between 3 and 30 characters long!',
			},
			{
				error:
					participant.lastname.length < 3 || participant.lastname.length > 30,
				message: '"Last name" must be between 3 and 30 characters long!',
			},
			{
				error:
					participant.participation <= 0 || participant.participation > 100,
				message:
					'"Participation" must be greater than 0 and less than or equal to 100!',
			},
		];

		return validateForm(validations);
	}

	function handleParticipant() {
		participant.participation = Number(participant.participation);

		if (!isValidForm()) return;

		request.mutate(participant);
	}

	function onRequestError(error) {
		toast({
			text: error.cause?.message || "Could not save participant!",
			type: "error",
		});
	}

	function onRequestSuccess(response) {
		toast({
			text: response?.message || "Participant saved!",
			type: "success",
		});

		request.reset();
		clearForm();
	}

	return (
		<Wrapper height={isOpen ? "auto" : "50px"}>
			<Menu>
				<span>Create Participant</span>
				<Icon
					type={isOpen ? "minus" : "plus"}
					config={{ title: "send", size: "1.5rem" }}
					onClick={toggleIsOpen}
				/>
			</Menu>

			<form onSubmit={(e) => handleForm(e, handleParticipant)}>
				<div>
					<Input
						required
						type="text"
						minLength={3}
						maxLength={30}
						name="firstname"
						placeholder="First name"
						value={participant.firstname || ""}
						onChange={updateForm}
					/>
					<Input
						required
						type="text"
						minLength={3}
						maxLength={30}
						name="lastname"
						placeholder="Last name"
						value={participant.lastname || ""}
						onChange={updateForm}
					/>
					<Input
						required
						type="number"
						max={100}
						name="participation"
						placeholder="Participation"
						value={participant.participation || ""}
						onChange={updateForm}
					/>
				</div>

				<Button disabled={request.isLoading}>
					<span style={{ marginRight: "0.5rem" }}>SEND</span>
					<Icon type="send" config={{ size: "1rem" }} />
				</Button>
			</form>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	width: 100%;
	height: ${(props) => props.height};
	padding: 0 1rem 1rem;
	border-radius: 5px;
	margin: 1rem 0;
	background-color: var(--blue);
	overflow: hidden;

	form {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 2rem;

		div {
			width: 100%;
			height: auto;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
		}
	}
`;

const Menu = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.3rem;
	color: var(--white);

	svg {
		cursor: pointer;
	}

	@media (max-width: 450px) {
		font-size: 1.1rem;

		svg {
			width: 1.2rem;
			height: 1.2rem;
		}
	}
`;
