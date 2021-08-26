import React, {useEffect, useRef} from 'react';
import {connect} from "react-redux";
//
import {signIn, signOut} from '../actions';

const GoogleAuth = ({isSignedIn, signIn, signOut}) => {
	const auth = useRef({});

	useEffect(() => {
		window.gapi.load('client:auth2', async () => {
			await window.gapi.client.init({
				clientId: '61535977128-psqd20vj5t84l4m67002heij01vmcthp.apps.googleusercontent.com',
				scope: 'profile email'
			});

			auth.current = window.gapi.auth2.getAuthInstance();

			onAuthChange(auth.current.isSignedIn.get());
			auth.current.isSignedIn.listen(onAuthChange);
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const onAuthChange = isSignedIn => {
		if (isSignedIn) {
			const userId = auth.current.currentUser.get().getId();
			const userGivenName = auth.current.currentUser.get().getBasicProfile().getGivenName();
			signIn(userId, userGivenName);
		} else signOut();
	};

	const onSignInClick = () => auth.current.signIn();

	const onSignOutClick = () => auth.current.signOut();

	const signInButton = () => {
		return (
			<button onClick={onSignInClick} className="icon_left btn">
				<i className="fa fa-google"/>
				Sign in with Google
			</button>
		)
	};

	const signOutButton = () => {
		return (
			<button onClick={onSignOutClick} className="icon_left btn">
				<i className="fa fa-google"/>
				Sign out
			</button>
		);
	};

	const renderButton = () => {
		if (isSignedIn === null) return null;
		else if (isSignedIn) return signOutButton();
		else return signInButton();
	};

	return <React.Fragment>{renderButton()}</React.Fragment>
};

const mapStateToProps = (state) => {
	return {isSignedIn: state.auth.isSignedIn};
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);

// class GoogleAuth extends Component {
//
// 	componentDidMount() {
// 		window.gapi.load('client:auth2', async () => {
// 			await window.gapi.client.init({
// 				clientId: '61535977128-psqd20vj5t84l4m67002heij01vmcthp.apps.googleusercontent.com',
// 				scope: 'profile email'
// 			});
//
// 			console.log(this);
//
// 			this.auth = window.gapi.auth2.getAuthInstance();
// 			this.onAuthChange(this.auth.isSignedIn.get());
// 			this.auth.isSignedIn.listen(this.onAuthChange);
// 		});
// 	}
//
// 	componentDidUpdate(prevProps, prevState, snapshot) {
// 		console.log(1);
// 	}
//
// 	onAuthChange = isSignedIn => {
// 		if (isSignedIn) {
// 			const userId = this.auth.currentUser.get().getId();
// 			const userGivenName = this.auth.currentUser.get().getBasicProfile().getGivenName();
// 			this.props.signIn(userId, userGivenName);
// 		} else this.props.signOut();
// 	};
//
// 	onSignInClick = () => {
// 		this.auth.signIn();
// 	};
//
// 	onSignOutClick = () => {
// 		this.auth.signOut();
// 	};
//
// 	renderButton() {
// 		if (this.props.isSignedIn === null) return null;
// 		else if (this.props.isSignedIn) {
// 			return (
// 				<button onClick={this.onSignOutClick} className={buttonsCss.btn}>
// 					<i className="google icon"/>
// 					Sign out
// 				</button>
// 			);
// 		} else {
// 			return (
// 				<button onClick={this.onSignInClick} className={buttonsCss.btn}>
// 					<i className="google icon"/>
// 					Sign in with Google
// 				</button>
// 			)
// 		}
// 	}
//
// 	render() {
// 		return <div className="item">{this.renderButton()}</div>;
// 	}
// }
