import React from 'react';
import {Field, reduxForm} from "redux-form";

const StreamForm = props => {

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
			<Field name="title" component={renderInput} label="Title"/>
			<Field name="description" component={renderInput} label="Description"/>
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
	form: 'STREAM_FORM',
	validate
})(StreamForm);

// class StreamForm extends Component {
// 	renderError({error, touched}) {
// 		if (touched && error) {
// 			return (
// 				<div className="ui error message">
// 					<div className="header">{error}</div>
// 				</div>
// 			);
// 		}
// 	}
//
// 	renderInput = ({input, label, meta}) => {
// 		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
//
// 		return (
// 			<div className={className}>
// 				<label>{label}</label>
// 				<input {...input} autoComplete="off"/>
// 				{this.renderError(meta)}
// 			</div>
// 		);
// 	};
//
// 	onSubmit = (formValues) => {
// 		this.props.onSubmit(formValues);
// 	};
//
// 	render() {
// 		console.log(this.props);
//
// 		return (
// 			<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
// 				<Field name="title" component={this.renderInput} label="Title"/>
// 				<Field name="description" component={this.renderInput} label="Description"/>
// 				<button className="ui button primary">Submit</button>
// 			</form>
// 		)
// 	}
// }