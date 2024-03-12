import React from "react";
import "./index.css";

import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";

enum FIELD_KEY {
	MESSAGE = "message",
	NAME = "name",
}

interface FormType {
	[FIELD_KEY.MESSAGE]: string;
	[FIELD_KEY.NAME]: string;
}

const validateRequired = (value: string) => value.length !== 0 || `Don't remain the field blank.`;
const validateIsNumber = (value: string) => isNaN(Number(value)) || "Don't use numbers as a value";

export default function Container () {
	const {register, formState, handleSubmit, reset} = useForm<FormType>({
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<FormType> = (data) => {
		//test the behaviour of async functions - like "fetch"
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve("test"), 5000);
		})
	};

	const onError: SubmitErrorHandler<FormType> = (errors) => console.log("errors", errors)

	return (
		<div className="contact">
			<div className="contact__title">
				Contact form
			</div>
			<form
				onSubmit={handleSubmit(onSubmit, onError)}
				className="contact__form"
			>
				<input
					placeholder="Your message"
					className="contact__input"
					{...register(FIELD_KEY.MESSAGE, {
						validate: {
							validateRequired,
							validateIsNumber,
						},
					})}
				/>
				{formState.errors[FIELD_KEY.MESSAGE] && (
					<span style={{ color: 'red' }}>{formState.errors[FIELD_KEY.MESSAGE].message}</span>
				)}
				
				<input
					placeholder="Your name"
					className="contact__input"
					{...register(FIELD_KEY.NAME, {
						validate: {
							validateRequired,
							validateIsNumber
						},
					})}
				/>
				{formState.errors[FIELD_KEY.NAME] && (
					<span style={{ color: 'red' }}>{formState.errors[FIELD_KEY.NAME].message}</span>
				)}

				<button 
					disabled={!formState.isValid || formState.isSubmitting} 
					className="contact__button" 
					type="submit"
				>
					Submit
				</button>

				{formState.isSubmitting && <span style={{color: "blue"}}>Loading..</span>}
				<span style={{color: "blue"}}>Submit count: {formState.submitCount}</span>
			</form>
		</div>
	);
}