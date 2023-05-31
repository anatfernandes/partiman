import { api } from "../services/partiman";
import { requestKeyEnum } from "../enums";
import { useToast, useRequestQuery } from "./index";

const defaultFunction = () => {};

function useListParticipants({
	onError = defaultFunction,
	onSuccess = defaultFunction,
}) {
	const toast = useToast();

	const {
		data: participants,
		isLoading,
		isError,
		isSuccess,
	} = useRequestQuery({
		key: [requestKeyEnum.participants],
		requestCallback: api.listParticipants,
		onError: onRequestError,
		onSuccess: onRequestSuccess,
	});

	function onRequestError(error) {
		toast({
			text: error.cause?.message || "Could not get participants!",
			type: "error",
		});

		onError();
	}

	function onRequestSuccess(response) {
		onSuccess(response);
	}

	return { participants, isLoading, isError, isSuccess };
}

export { useListParticipants };
