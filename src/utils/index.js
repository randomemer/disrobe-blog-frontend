export function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function emailValidator(text) {
	const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
	if (!emailReg.test(text)) {
		return "Not a valid email address";
	}
}

export function passwordValidator(text) {
	if (text.trim().length < 8) {
		return "Password too short";
	}
}

export function emptyValidator(text) {
	if (!text.trim()) {
		return "Field cannot be empty";
	}
}
