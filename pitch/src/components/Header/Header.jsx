import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
//
import GoogleAuth from "../GoogleAuth";
//
import HeaderCss from "./Header.module.css";

const Header = ({isSignedIn, userGivenName}) => {

	const userNav = () => {
		return (
			<React.Fragment>
				<Link to="/" className="link">All streams</Link>
				<Link to="/my" className="link">My streams</Link>
				<h4>{userGivenName}</h4>
			</React.Fragment>
		)
	};

	const guestNav = () => {
		return (
			<React.Fragment>
				<Link to="/" className="link">All streams</Link>
				<h4>Guest</h4>
			</React.Fragment>
		)
	};

	const renderNav = () => {
		if (isSignedIn === null) return null;

		if (isSignedIn) return userNav();

		return guestNav();
	};

	return (
		<div className={HeaderCss.header}>
			<div className={`${HeaderCss.header_wrapper} wrapper`}>
				<Link to="/" className={HeaderCss.logo}>
					<img src="/img/logo.svg" alt="ART LIVE"/>
				</Link>
				<div className={HeaderCss.nav}>
					{renderNav()}
					<GoogleAuth/>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		userGivenName: state.auth.userGivenName
	};
};

export default connect(mapStateToProps)(Header);
