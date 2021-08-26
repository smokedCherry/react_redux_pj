import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {addComment} from "../../actions";

const StreamShow = props => {
	console.log(props);

	const renderError = ({error, touched}) => {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	};

	const renderTextarea = ({input, label, meta}) => {

		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} style={{border: '1px solid red'}}/>
				{renderError(meta)}
			</div>
		);
	};

	const onSubmit = formValues => props.onSubmit(props.match.params.id, formValues);

	return (
		<div>
			<h2>StreamShow</h2>
			<form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
				<Field name="comment" component={renderTextarea} label="Leave a comment"/>
				<button className="ui button primary">Submit</button>
			</form>
		</div>
	);
};

const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) errors.title = 'Please, enter a title';
	if (!formValues.description) errors.description = 'Please, enter a description';

	return errors;
};

const wrappedForm = reduxForm({
	form: 'COMMENTS_FORM',
	validate
})(StreamShow);

const mapStateToProps = state => {
	return {
		onSubmit: (id, formValues) => addComment(id, formValues)
	}
};

export default connect(mapStateToProps, {addComment})(wrappedForm);