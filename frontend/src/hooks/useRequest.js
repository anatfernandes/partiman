import { useMutation, useQuery } from "react-query";
import { queryClient } from "../contexts/QueryClientContext";

const onErrorDefaultCallback = () => {};
const onSuccessDefaultCallback = () => {};

function useRequestQuery({
	key,
	requestCallback,
	onError = onErrorDefaultCallback,
	onSuccess = onSuccessDefaultCallback,
}) {
	const { isLoading, isError, isSuccess, data, error, status } = useQuery(
		key,
		requestCallback,
		{ onError, onSuccess }
	);

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		status,
		error: error?.cause?.message || null,
		errorStatus: error?.cause?.status || null,
	};
}

function useRequestMutation({
	key,
	requestCallback,
	onError = onErrorDefaultCallback,
	onSuccess: onSuccessCallback = onSuccessDefaultCallback,
}) {
	const { isLoading, isError, isSuccess, error, status, mutate, reset } =
		useMutation(requestCallback, {
			onSuccess: () => {
				queryClient.invalidateQueries(key);
				onSuccessCallback();
			},
			onError,
		});

	return {
		isLoading,
		isError,
		isSuccess,
		error: error?.cause?.message || null,
		errorStatus: error?.cause?.status || null,
		status,
		mutate,
		reset,
	};
}

export { useRequestQuery, useRequestMutation };
