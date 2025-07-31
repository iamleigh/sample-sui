import React from "react"
import { Banner, Section } from "../../../organisms/index"
import { Body } from "../../../templates/index"
import { PageFooter } from "./footer"

interface HomeProps {
	title: string
	subtitle: React.ReactNode
	action: {
		link: string
		label: string
	}
	image: {
		src: string
		src2x: string
		width?: string
		height?: string
		alt?: string
	}
	children: React.ReactNode
}

const Home: React.FC<
	HomeProps &
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>
> = ({ title, subtitle, action, image, children, ...props }) => {
	return (
		<div className="csb-page" {...props}>
			<Banner title={title} subtitle={subtitle} action={action} image={image} />

			<Body>
				<Section container={true}>{children}</Section>
			</Body>

			<PageFooter />
		</div>
	)
}

export { Home }
