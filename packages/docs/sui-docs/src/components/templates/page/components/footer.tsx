import React from "react"
import { Footer } from "../../../organisms/index"

const PageFooter: React.FC = () => {
	return (
		<Footer>
			<div data-label="Terms of Use" data-kind="sui-terms--page" />
			<div
				data-label="Privacy Policy"
				data-link="https://incsub.com/privacy-policy/"
			/>
		</Footer>
	)
}

export { PageFooter }
