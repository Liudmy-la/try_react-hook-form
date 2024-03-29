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

// interface ContainerProps {
// 	name: string;
// }

const validateRequired = (value: string) => value.length !== 0 || `Don't remain the field blank.`;
const validateIsNumber = (value: string) => isNaN(Number(value)) || "Don't use numbers as a value";

export default function Container () {
	const {
			register, formState, handleSubmit, 
			reset, resetField, 
			setValue, 
			setFocus, 
			setError, clearErrors,
			getFieldState
		} = useForm<FormType>({
			mode: "onTouched",

			defaultValues: async () => {
				return new Promise((resolve, reject) => {
					setTimeout(() => resolve({
							[FIELD_KEY.MESSAGE]: 'Message',
							[FIELD_KEY.NAME]: 'Name'
						})
					, 3000)
				})
			}
		});

	const onSubmit: SubmitHandler<FormType> = (data) => {
		//test the behaviour of async functions - like "fetch"
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve("test"), 5000);
		})
	};

	const onError: SubmitErrorHandler<FormType> = (errors) => console.log("errors", errors);

	const isFormDisabled = formState.isValid !== true || formState.isSubmitting === true;

	console.log(getFieldState(FIELD_KEY.MESSAGE, formState))

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
					disabled={isFormDisabled} 
					className="contact__button" 
					type="submit"
				>
					Submit
				</button>

				{formState.isSubmitting && <span style={{color: "blue"}}>Loading..</span>}
				<span style={{color: "blue"}}>Submit count: {formState.submitCount}</span>
				{formState.isLoading && <span style={{color: "purple"}}>Loading default values..</span>}

				<button
					type="button"
					className="contact__button" 
					onClick={() => setError(
						FIELD_KEY.MESSAGE, 
						{type: 'Custom ERR', message: 'Error text'},
						{shouldFocus: true})}
				>
					Reset
				</button>
			</form>
		</div>
	);
}