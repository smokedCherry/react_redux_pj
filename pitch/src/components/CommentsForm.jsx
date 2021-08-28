import React from 'react';
import {Field, reduxForm} from "redux-form";

const CommentsForm = props => {

	const renderError = ({error, touched}) => {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	};

	const renderInput = ({input, label, meta}) => {

		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off"/>
				{renderError(meta)}
			</div>
		);
	};

	const onSubmit = (formValues) => props.onSubmit(formValues);

	return (
		<form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
			<Field name="comment" component={renderInput} label="Leave a comment"/>
			<button className="ui button primary">Submit</button>
		</form>
	)
};

const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) errors.title = 'Please, enter a title';
	if (!formValues.description) errors.description = 'Please, enter a description';

	return errors;
};

export default reduxForm({
	form: 'COMMENTS_FORM',
	validate
})(CommentsForm);