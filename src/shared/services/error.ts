

class ErrorMesage extends Error{
	readonly message;

	constructor(_msg: string) {
		super();
		this.message = _msg;
	}
}

export {ErrorMesage};