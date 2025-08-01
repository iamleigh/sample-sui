import React, { useState, useCallback } from "react"
import "../assets/css/wordpress.css"

/**
 * WordPress
 *
 * A React component that replicates the WordPress admin environment structure.
 * Useful for testing UI components inside a realistic admin layout.
 */
export const WordPress = ({ children }) => {
	// Track whether the sidebar is collapsed
	const [folded, setFolded] = useState(false)

	// Toggle the collapsed state of the sidebar
	const toggleSidebar = useCallback(() => {
		setFolded(!folded)
	}, [folded])

	return (
		<div id="wpadmin" className={folded ? "folded" : undefined}>
			{/* Sidebar navigation area */}
			<div id="adminmenumain" role="navigation" aria-label="Main Menu">
				<div id="adminmenuback"></div>

				<div id="adminmenuwrap">
					<ul id="adminmenu">
						{/* Visual separator in the menu */}
						<li
							className="wp-not-current-submenu wp-menu-separator"
							aria-hidden="true"
						>
							<div className="separator"></div>
						</li>

						{/* Sidebar collapse toggle button */}
						<li id="collapse-menu" className="hide-if-no-js">
							<button
								type="button"
								id="collapse-button"
								aria-label="Collapse Main menu"
								aria-expanded="true"
								onClick={toggleSidebar}
							>
								<span
									className="collapse-button-icon"
									aria-hidden="true"
								></span>
								<span className="collapse-button-label">Collapse menu</span>
							</button>
						</li>
					</ul>
				</div>
			</div>

			{/* Main content area */}
			<div id="wpcontent">
				{/* Admin toolbar at the top */}
				<div id="wpadminbar" className="nojq">
					<div
						role="navigation"
						id="wp-toolbar"
						className="quicklinks"
						aria-label="Toolbar"
					>
						<ul id="wp-admin-bar-root-default" className="ab-top-menu">
							<li id="wp-admin-bar-menu-toggle">
								<a className="ab-item" href="#" aria-expanded="false">
									<span className="ab-icon"></span>
									<span className="screen-reader-text">Menu</span>
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Main body area for content */}
				<div id="wpbody" role="main">
					<div id="wpbody-content">{children}</div>

					<div className="clear"></div>
				</div>

				{/* Ensure layout clears properly */}
				<div className="clear"></div>
			</div>
		</div>
	)
}
