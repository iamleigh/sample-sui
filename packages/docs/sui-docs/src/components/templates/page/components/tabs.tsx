import React, { JSX } from "react"
import { Header } from "../../../organisms/index"
import { Tabs } from "../../../molecules/index"
import { Body } from "../../../templates/index"
import { PageFooter } from "./footer"

interface TabsPageProps {
	title: string
	subtitle?: React.ReactNode
	status?: "planned" | "draft" | "ready" | "dead"
	children: JSX.Element[]
}

const TabsPage: React.FC<
	TabsPageProps &
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>
> = ({ title, subtitle, status, children, ...args }) => {
	return (
		<div className="csb-page" {...args}>
			<Header title={title} border={false} status={status} />

			<Body>
				<Tabs label={subtitle}>{children}</Tabs>
			</Body>

			<PageFooter />
		</div>
	)
}

export { TabsPage }
