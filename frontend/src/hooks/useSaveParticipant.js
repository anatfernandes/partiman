import { api } from "../services/partiman";
import { requestKeyEnum } from "../enums";
import { useToast, useRequestMutation } from "./index";

const defaultFunction = () => {};

function useSaveParticipant({
	onError = defaultFunction,
	onSuccess = defaultFunction,
}) {
	const toast = useToast();

	const request = useRequestMutation({
		key: [requestKeyEnum.participants],
		requestCallback: (body) => api.createParticipant(body),
		onError: onRequestError,
		onSuccess: onRequestSuccess,
	});

	function onRequestError(error) {
		toast({
			text: error.cause?.message || "Could not save participant!",
			type: "error",
		});

		onError();
	}

	function onRequestSuccess(response) {
		toast({
			text: response?.message || "Participant saved!",
			type: "success",
		});

		onSuccess();

		request.reset();
	}

	function saveParticipant(id) {
		request.mutate(id);
	}

	return {
		save: saveParticipant,
		isloading: request.isLoading, 
		isError: request.isError,
		isSuccess: request.isSuccess,
	};
}

export { useSaveParticipant };
