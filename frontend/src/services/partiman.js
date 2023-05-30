const BASE_URI = import.meta.env.VITE_API_URL;

function createHeader() {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	return config;
}

async function throwError(response) {
	const error = await response
		.json()
		.then((response) => response)
		.catch(() => ({
			message: "An error occurred!",
		}));

	throw new Error(error.message, {
		cause: {
			message: error.message,
			status: response.status,
		},
	});
}

async function getRequest({ path }) {
	const config = createHeader();
	const response = await fetch(`${BASE_URI}${path}`, {
		method: "GET",
		...config,
	});

	if (response.status >= 400) {
		return throwError(response);
	}

	return response.json();
}

async function postRequest({ path, body, haveResponse = false }) {
	const config = createHeader();
	const response = await fetch(`${BASE_URI}${path}`, {
		method: "POST",
		body: JSON.stringify(body),
		...config,
	});

	if (response.status >= 400) {
		return throwError(response);
	}

	if (!haveResponse) return;

	return response.json();
}

async function deleteRequest({ path, haveResponse = false }) {
	const config = createHeader();
	const response = await fetch(`${BASE_URI}${path}`, {
		method: "DELETE",
		...config,
	});

	if (response.status >= 400) {
		return throwError(response);
	}

	if (!haveResponse) return;

	return response.json();
}

function listParticipants() {
	return getRequest({ path: "/participants" });
}

function createParticipant(body) {
	return postRequest({ path: "/participants", body, haveResponse: true });
}

function deleteParticipant(id) {
	return deleteRequest({ path: `/participants/${id}`, haveResponse: false });
}

const api = {
	listParticipants,
	createParticipant,
	deleteParticipant,
};

export { api };
