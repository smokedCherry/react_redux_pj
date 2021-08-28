import React, {useEffect} from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {fetchStream, addComment} from "../../actions";
import CommentsForm from "../CommentsForm";

const StreamShow = props => {

	useEffect(() => props.fetchStream(props.match.params.id), []); // eslint-disable-line react-hooks/exhaustive-deps

	const onSubmit = formValues => props.addComment(props.match.params.id, formValues);

	return (
		<div>
			<h2>StreamShow</h2>
			<CommentsForm initialValues={{comment: ''}} onSubmit={onSubmit}/>
		</div>
	);
};

export default connect(null, {fetchStream, addComment})(StreamShow);