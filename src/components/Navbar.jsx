import React from 'react';
import { APPLICATION_NAME } from '../resources/constants'

const Navbar = () => {
	return (
		<nav className="navbar justify-content-center navbar-expand-lg navbar-dark bg-info">
			<div className="navbar-brand m-auto">
				<h3><b>{APPLICATION_NAME}</b></h3>
			</div>
			<button className="btn btn-search"><i className="fa fa-search fa-lg"></i></button>
		</nav>
	)
}

export default Navbar