import React from 'react'
import '../style.css';

const SideNavigation = () => {
	return (
		<nav>
		<div id="nav-container">
			<a href='' title="Dashboard">
				<span className="material-symbols-outlined">
					home
				</span><p>Home</p></a>
			<a href=''  title="About Us">
				<span className="material-symbols-outlined">
					person_search
				</span><p>About Us</p></a>
		</div>
		</nav>
	)
}

export default SideNavigation
