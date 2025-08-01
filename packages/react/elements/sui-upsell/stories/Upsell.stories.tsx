import React from "react"
import { IconsName } from "@wpmudev/sui-icons"
import { Button } from "@wpmudev/sui-button"
import { Row, Col } from "@wpmudev/sui-grid"
import { Box, BoxGroup } from "@wpmudev/sui-box"
import { Upsell, UpsellProps } from "../src"
import docs from "./Upsell.mdx"

// Configure default options
export default {
	title: "SUI/Components/Collections/Upsell",
	component: Upsell,
	parameters: {
		layout: "fullscreen",
		docs: {
			page: docs,
		},
	},
}

// Build "Upsell" story
const Playground = (args: UpsellProps) => {
	const actions = [
		<div key={0}>
			<Button type="primary" colorScheme="black" isSmall={true}>
				Upgrade now
			</Button>
		</div>,
		<div key={1}>
			<Button type="tertiary" colorScheme="black" isSmall={true}>
				Learn more
			</Button>
		</div>,
	]

	return (
		<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
			<div className="sui-layout__content">
				<Row>
					<Col size="8">
						<Box title="Lorem Ipsum" icon="SquareCode">
							<BoxGroup>
								<p>
									Lorem ipsum dolor sit amet senectus eleifend turpis netus
									semper adipiscing dictum feugiat. Aenean semper tellus lectus
									imperdiet odio lobortis justo aliquam. Euismod tortor non id
									dolore vulputate et nisi magna leo justo semper. Dictumst
									lacus viverra feugiat etiam elementum imperdiet tempor non
									nullam volutpat nunc labore. Magna vestibulum est quisque
									libero mauris phasellus vitae faucibus risus est purus.
								</p>

								<p>
									Lorem ipsum dolor sit amet aliquet fermentum netus. Quis nibh
									hac nullam neque sodales tortor sed nisi ullamcorper phasellus
									auctor. Neque tellus nibh lobortis proin purus auctor luctus
									eu netus lectus quis maecenas. Senectus imperdiet vel auctor
									senectus sed fringilla ultrices tempus arcu non. Pharetra orci
									facilisis magna ullamcorper sollicitudin et libero aenean
									mauris feugiat mi.
								</p>
							</BoxGroup>
						</Box>
					</Col>

					<Col size="4">
						<Upsell
							variation={args.variation}
							{...(args.title && { title: args.title })}
							{...(args.description && { description: args.description })}
							{...(args.featuresList && { featuresList: args.featuresList })}
							{...(args.featuresIcon && { featuresIcon: args.featuresIcon })}
							featuresInline={args.featuresInline}
							{...(args.featuresTitle && { featuresTitle: args.featuresTitle })}
						>
							{args.children && (
								<>
									<Button type="primary" colorScheme="black" isSmall={true}>
										Upgrade now
									</Button>

									<Button type="tertiary" colorScheme="black" isSmall={true}>
										Learn more
									</Button>
								</>
							)}
						</Upsell>
					</Col>
				</Row>
			</div>
		</div>
	)
}

Playground.args = {
	variation: "hummingbird",
	title: "",
	description: "",
	featuresList: [
		"Performance test reporting",
		"Uptime monitoring",
		"Enhanced file minification with CDN",
		"Database cleanup notifications",
	],
	featuresIcon: "Check",
	featuresInline: false,
	featuresTitle: "",
	children: false,
}

Playground.argTypes = {
	variation: {
		options: [
			"hummingbird",
			"smush",
			"snapshot",
			"smartcrawl",
			"shipper",
			"ivt",
			"hustle",
			"forminator",
			"defender",
			"branda",
			"beehive",
			"dashboard",
		],
		control: {
			type: "select",
			labels: {
				hummingbird: "Hummingbird",
				smush: "Smush",
				snapshot: "Snapshot",
				smartcrawl: "Smartcrawl",
				shipper: "Shipper",
				ivt: "Ivt",
				hustle: "Hustle",
				forminator: "Forminator",
				defender: "Defender",
				branda: "Branda",
				beehive: "Beehive",
			},
		},
	},
	featuresIcon: {
		options: IconsName,
		control: {
			type: "select",
		},
	},
	children: {
		name: "children (Use predefined content)",
	},
}

// Export stories
export { Playground }
