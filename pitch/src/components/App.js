import React from 'react';
import {Router, Route, Switch} from "react-router-dom";
//
import history from "../history";
import Header from "./Header/Header";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList/StreamList";
import StreamShow from "./streams/StreamShow";

const App = () => {

	return (
		<div className="page_wrap">
			<Router history={history}>
				<Header/>
				<div className="wrapper">
					<Switch>
						<Route path="/" exact render={() => <StreamList filterByUser={false}/>}/>
						<Route path="/my" exact render={() => <StreamList filterByUser={true}/>}/>
						<Route path="/streams/new" component={StreamCreate}/>
						<Route path="/streams/edit/:id" component={StreamEdit}/>
						<Route path="/streams/delete/:id" component={StreamDelete}/>
						<Route path="/streams/:id" component={StreamShow}/>
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;