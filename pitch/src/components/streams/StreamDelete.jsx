import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Modal from "../Modal/Modal";
import history from "../../history";
import {fetchStream, deleteStream} from "../../actions";

const StreamDelete = ({match, stream, fetchStream, deleteStream}) => {

	useEffect(() => fetchStream(match.params.id), []); // eslint-disable-line react-hooks/exhaustive-deps

	const closeModal = () => history.push('/');

	const renderContent = () => {
		if (!stream) return 'Are you sure want you want to delete the stream?';

		return `Are you sure you want to delete the stream with title: "${stream.title}" ?`
	};

	const renderActions = () => {
		return (
			<React.Fragment>
				<button
					onClick={() => deleteStream(match.params.id)}
					className="btn">
					Delete
				</button>
				<button onClick={closeModal} className="btn">Cancel</button>
			</React.Fragment>
		)
	};

	return (
		<Modal
			header="Delete stream"
			content={renderContent()}
			actions={renderActions()}
			onDismiss={closeModal}
		/>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {stream: state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);

// class StreamDelete extends Component {
//
// 	componentDidMount() {
// 		this.props.fetchStream(this.props.match.params.id);
// 	}
//
// 	closeModal = () => history.push('/');
//
// 	renderActions() {
// 		return (
// 			<React.Fragment>
// 				<button
// 					onClick={() => this.props.deleteStream(this.props.match.params.id)}
// 					className="ui button negative">
// 					Delete
// 				</button>
// 				<button onClick={this.closeModal} className="ui button">Cancel</button>
// 			</React.Fragment>
// 		)
// 	}
//
// 	renderContent() {
// 		if (!this.props.stream) return 'Are you sure want you want to delete the stream?';
//
// 		return `Are you sure you want to delete the stream with title: "${this.props.stream.title}" ?`
// 	}
//
// 	render() {
//
//
// 		return (
// 			<Modal
// 				header="Delete stream"
// 				content={this.renderContent()}
// 				actions={this.renderActions()}
// 				onDismiss={this.closeModal}
// 			/>
// 		);
// 	}
// }