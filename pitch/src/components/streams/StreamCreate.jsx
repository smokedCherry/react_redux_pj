import React from 'react';
import {connect} from "react-redux";
import {createStream} from "../../actions";
import StreamForm from "./StreamForm";

const StreamCreate = ({createStream}) => {

	const onSubmit = formValues => createStream(formValues);

	return (
		<React.Fragment>
			<h3>Create a stream</h3>
			<StreamForm onSubmit={onSubmit}/>
		</React.Fragment>
	)
};

export default connect(null, {createStream})(StreamCreate);

// class StreamCreate extends Component {
//
// 	onSubmit = (formValues) => {
// 		this.props.createStream(formValues);
// 	};
//
// 	render() {
// 		return (
// 			<div>
// 				<h3>Create a stream</h3>
// 				<StreamForm onSubmit={this.onSubmit}/>
// 			</div>
// 		)
// 	}
// }
