import { useState, useEffect } from "react";
import { useToast } from "./useToast";

function useForm(defaultForm = {}) {
	const [form, setForm] = useState(defaultForm);
	const toast = useToast();

	useEffect(() => {
		setForm(defaultForm);
	}, [defaultForm]);

	function updateForm(event) {
		const key = event.target.name;
		const value = event.target.value;
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	function validateForm(validations = []) {
		const error = validations.find((validation) => validation.error);
		let text = error?.message || "";

		if (text) {
			toast({ text, type: "warning" });
			return false;
		}

		return true;
	}

	function handleForm(event, callback = () => {}) {
		event.preventDefault();
		callback();
	}

	function clearForm() {
		setForm({});
	}

	return { form, updateForm, validateForm, handleForm, clearForm };
}

export { useForm };
