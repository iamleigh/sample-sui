import React from "react"
import { Header, Section } from "../../../organisms/index"
import { Body } from "../../../templates/index"
import { PageFooter } from "./footer"

interface SimplePageProps {
	title: string
	subtitle?: React.ReactNode
	status?: "planned" | "draft" | "ready" | "dead"
	children: React.ReactNode
}

const SimplePage: React.FC<
	SimplePageProps &
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>
> = ({ title, subtitle, status, children, ...props }) => {
	return (
		<div className="csb-page" {...props}>
			<Header title={title} border={true} status={status} />

			<Body>
				{!!subtitle && (
					<Section contained={true}>
						<p className="csb-page__title">{subtitle}</p>
					</Section>
				)}

				{children}
			</Body>

			<PageFooter />
		</div>
	)
}

export { SimplePage }
