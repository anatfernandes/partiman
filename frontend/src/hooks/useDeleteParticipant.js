import { api } from "../services/partiman";
import { requestKeyEnum } from "../enums";
import { useToast, useRequestMutation } from "./index";

const defaultFunction = () => {};

function useDeleteParticipant({
	onError = defaultFunction,
	onSuccess = defaultFunction,
}) {
	const toast = useToast();

	const request = useRequestMutation({
		key: [requestKeyEnum.participants],
		requestCallback: (id) => api.deleteParticipant(id),
		onError: onRequestError,
		onSuccess: onRequestSuccess,
	});

	function onRequestError(error) {
		toast({
			text: error.cause?.message || "Could not delete participant!",
			type: "error",
		});

		onError();
	}

	function onRequestSuccess() {
		toast({ text: "Participant deleted!", type: "success" });

		onSuccess();

		request.reset();
	}

	function handle(id) {
		request.mutate(id);
	}

	return {
		handle,
		isloading: request.isLoading,
		isError: request.isError,
		isSuccess: request.isSuccess,
	};
}

export { useDeleteParticipant };
