import _ from 'lodash';
import React, {useEffect} from 'react';
import {connect} from "react-redux";
//
import {fetchStream, editStream} from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = ({stream, match, fetchStream, editStream}) => {
	useEffect(() => fetchStream(match.params.id), []); // eslint-disable-line react-hooks/exhaustive-deps

	const onSubmit = formValues => editStream(match.params.id, formValues);

	if (!stream) return <p>Loading...</p>;

	return (
		<React.Fragment>
			<h3>Edit a stream</h3>
			<StreamForm initialValues={_.pick(stream, 'title', 'description')} onSubmit={onSubmit}/>
		</React.Fragment>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {stream: state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);

// class StreamEdit extends Component {
//
// 	componentDidMount() {
// 		console.log(this.props);
// 		this.props.fetchStream(this.props.match.params.id);
// 	}
//
// 	onSubmit = (formValues) => {
// 		this.props.editStream(this.props.match.params.id, formValues);
// 	};
//
// 	render() {
// 		if (!this.props.stream) {
// 			return <div>Loading...</div>;
// 		}
//
// 		return (
// 			<div>
// 				<h3>Edit a stream</h3>
// 				<StreamForm initialValues={_.pick(this.props.stream, 'title', 'description')}
// 							onSubmit={this.onSubmit}/>
// 				{/*<StreamForm*/}
// 				{/*	initialValues={{title: this.props.stream.title, description: this.props.stream.description}}*/}
// 				{/*	onSubmit={this.onSubmit}/>*/}
// 			</div>
// 		);
// 	}
// }
