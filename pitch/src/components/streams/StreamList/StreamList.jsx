import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
//
import {fetchStreams} from "../../../actions";
//
import css from './StreamList.module.css'

const StreamList = ({filterByUser, streams, currentUserId, isSignedIn, fetchStreams}) => {

	useEffect(() => fetchStreams(), []); // eslint-disable-line react-hooks/exhaustive-deps

	const renderEdit = (stream) => {
		if (stream.userId === currentUserId) {
			return <Link to={`/streams/edit/${stream.id}`} className="icon_right link"><i className="fa fa-pencil"/></Link>
		}
	};

	const renderDelete = (stream) => {
		if (stream.userId === currentUserId) {
			return <Link to={`/streams/delete/${stream.id}/`} className="btn">Delete</Link>;
		}
	};

	const renderCreate = () => {
		if (isSignedIn) {
			return <Link to="/streams/new" className={`${css.bottom_link} block btn`}>Create stream</Link>;
		}
	};

	const renderList = () => {
		// const {comments} = streams.filter(stream => stream.id === 31)[0];
		// console.log(comments.length += 1);

		return streams.map(stream => {
			if (filterByUser && stream.userId !== currentUserId) return null;

			return (
				<div className={`${css.list_item} list_item`} key={stream.id}>
					<div>
						<h4>
							<Link to={`/streams/${stream.id}`} className="link">{stream.title}</Link>
							{renderEdit(stream)}
						</h4>
						<div>{stream.description}</div>
					</div>
					{renderDelete(stream)}
				</div>
			)
		})
	};

	return (
		<div>
			<h2>{filterByUser === true ? 'My streams' : 'Streams'}</h2>
			<div className="celled list">{renderList()}</div>
			{renderCreate()}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, {fetchStreams})(StreamList);

// class StreamList extends Component {
//
// 	componentDidMount() {
// 		this.props.fetchStreams();
// 	}
//
// 	renderAdmin(stream) {
// 		if (stream.userId === this.props.currentUserId) {
// 			return (
// 				<div className="right floated content">
// 					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
// 					<Link to={`/streams/delete/${stream.id}/`} className="ui button negative">Delete</Link>
// 				</div>
// 			);
// 		}
// 	};
//
// 	renderCreate() {
// 		if (this.props.isSignedIn) {
// 			return (
// 				<div style={{textAlign: 'right'}}>
// 					<Link to="/streams/new" className="ui button primary">Create stream</Link>
// 				</div>
// 			);
// 		}
// 	}
//
// 	renderList() {
// 		return this.props.streams.map(stream => {
// 			return (
// 				<div className="item" key={stream.id}>
// 					{this.renderAdmin(stream)}
// 					<i className="large middl*.scsse aligned icon camera"/>
// 					<div className="content">
// 						<Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
// 						<div className="description">{stream.description}</div>
// 					</div>
// 				</div>
// 			)
// 		})
// 	}
//
// 	render() {
// 		return (
// 			<div>
// 				<h2>Streams</h2>
// 				<div className="ui celled list">{this.renderList()}</div>
// 				{this.renderCreate()}
// 			</div>
// 		);
// 	}
// }