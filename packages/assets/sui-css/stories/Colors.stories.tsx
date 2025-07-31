import React from "react"
import docs from "./content/Colors/Main.mdx"
import { Palettes } from "./content/Colors/Map.js"
import { Section, Row, Col, ColorCard, Message } from "@wpmudev/sui-docs"

interface ColorProps {
	palette?: "primary" | "secondary" | "extended" | "base" | "alpha"
	secondary?:
		| "smush"
		| "hummingbird"
		| "smartcrawl"
		| "defender"
		| "forminator"
		| "hustle"
		| "beehive"
		| "branda"
		| "snapshot"
		| "dashboard"
		| "shipper"
		| "ivt"
		| "blc"
		| "hub"
	extended?: "grey" | "green" | "yellow" | "red"
	shade: number
	type?: "general" | "variant"
	alpha?: "black" | "white" | "grey" | "red"
}

// Configure default options.
export default {
	title: "SUI/CSS Framework/Colors",
	parameters: {
		layout: "fullscreen",
		docs: {
			page: docs,
		},
	},
}

// Build "Colors" story.
const Colors = ({
	palette,
	secondary,
	extended,
	shade,
	type,
	alpha,
}: ColorProps) => {
	/**
	 * Semantic colors
	 * Get the list of colors available from the "Palettes" map.
	 */
	let mapColors

	if (palette === "primary") {
		mapColors = Palettes[palette]
	} else if (palette === "secondary") {
		mapColors = secondary && type ? Palettes[secondary][type] : undefined
	} else if (palette === "alpha") {
		mapColors = alpha ? Palettes[palette][alpha] : undefined
	} else {
		mapColors = extended ? Palettes[extended] : undefined
	}

	/**
	 * Colors by class name
	 * Get the required palette name for the color class.
	 */
	let setPalette
	if (palette === "primary") {
		setPalette = palette
	} else if (palette === "secondary") {
		setPalette = secondary
	} else if (palette === "alpha") {
		setPalette = alpha
	} else {
		setPalette = extended
	}

	// Color shade
	const colorShade = "alpha" === palette ? `a${shade}` : shade

	const codeStyles = {
		display: "block",
		padding: 18,
		borderRadius: 4,
		backgroundColor: "transparent",
		fontWeight: 400,
		fontSize: "13px",
		lineHeight: "24px",
		fontFamily: "monospace",
	}

	/**
	 * Colors information
	 * Get the required properties for the color card.
	 */
	let setTheme = shade > 40 ? "dark" : "light"
	let setPrefix
	if (shade === 50) {
		setPrefix = "Base"
	} else if (shade > 40) {
		setPrefix = "Dark"
	} else {
		setPrefix = "Light"
	}

	if ("alpha" === palette) {
		setPrefix = "Alpha"
		setTheme = "light"
	}

	const setColor = mapColors?.[shade as unknown as keyof typeof mapColors] ?? ""
	const setClass = palette === "secondary" || "alpha" === palette ? false : true
	const setVars = true
	let setVarName
	if (palette === "primary") {
		setVarName = setPalette
	} else if (palette === "secondary") {
		setVarName = `${palette}-${setPalette}-${type}`
	} else {
		setVarName = `${palette}-${setPalette}`
	}

	/**
	 * Statements
	 * Check if the selected shade exists.
	 */
	let doesShadeExists
	if (palette === "primary") {
		doesShadeExists = shade in Palettes[palette]
	} else if (palette === "secondary") {
		doesShadeExists =
			secondary && type ? shade in Palettes[secondary][type] : false
	} else if (palette === "alpha") {
		doesShadeExists = alpha ? shade in Palettes[palette][alpha] : false
	} else {
		doesShadeExists = !!extended && shade in (Palettes[extended] ?? {})
	}

	if (!doesShadeExists) {
		return (
			<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
				<Message color="yellow" style={{ background: "#FFF" }}>
					The selected shade doesn&apos;t exists on the
					<strong style={{ textTransform: "capitalize" }}>{setPalette}</strong>
					colors list.
				</Message>
			</div>
		)
	}

	return (
		<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
			<Section
				title="Semantic colors"
				style={{
					paddingTop: 0,
					paddingRight: 0,
					paddingLeft: 0,
				}}
			>
				<div
					style={{
						display: "flex",
						flexFlow: "row wrap",
						margin: "-5px",
					}}
				>
					{Object.keys(mapColors ?? {}).map((key, index) => {
						const bgColor =
							(Number(key) < 30 && "alpha" !== palette) || "white" === alpha
								? "#141934"
								: "#FFF"
						const textColor =
							(Number(key) < 30 && "alpha" !== palette) || "white" === alpha
								? "#E9EAEE"
								: "#1A1A1A"

						return (
							<div key={index} style={{ padding: 5 }}>
								<div
									style={{
										padding: 10,
										borderRadius: 4,
										background: bgColor,
									}}
								>
									<span
										key={index}
										style={{
											width: 40,
											height: 40,
											display: "block",
											borderRadius: 40,
											backgroundColor:
												mapColors?.[key as unknown as keyof typeof mapColors] ??
												"",
										}}
										aria-label={`${setPalette} palette, shade ${colorShade}`}
									/>

									<span
										style={{
											display: "block",
											marginTop: 5,
											color: textColor,
											fontSize: "12px",
											lineHeight: "24px",
											fontFamily: "monospace",
											textAlign: "center",
										}}
										aria-hidden="true"
									>
										{key}
									</span>
								</div>
							</div>
						)
					})}
				</div>
			</Section>
			{setClass && (
				<Section
					title="Colors by class name"
					style={{
						paddingTop: 0,
						paddingRight: 0,
						paddingLeft: 0,
					}}
				>
					<Row>
						<Col size="2">
							<p className="sui-overline" style={{ color: "#000" }}>
								Background color
							</p>
							<code
								style={{
									...codeStyles,
									backgroundColor: setColor,
									color: "light" === setTheme ? "#000" : "#FFF",
									textAlign: "center",
								}}
							>
								.sui-bg-{setPalette}--{colorShade}
							</code>
						</Col>
					</Row>

					<Row>
						<Col size="2">
							<p className="sui-overline" style={{ color: "#000" }}>
								Text color
							</p>
							<code
								style={{
									...codeStyles,
									padding: 0,
									color: setColor,
								}}
							>
								.sui-color-{setPalette}--{colorShade}
							</code>
						</Col>
					</Row>

					<Row>
						<Col size="2">
							<p className="sui-overline" style={{ color: "#000" }}>
								Border color
							</p>
							<code
								style={{
									...codeStyles,
									borderWidth: "3px",
									borderStyle: "solid",
									borderColor: setColor,
									textAlign: "center",
								}}
							>
								.sui-border-{setPalette}--{colorShade}
							</code>
						</Col>
					</Row>
				</Section>
			)}

			<Section
				title="Colors information"
				style={{
					paddingTop: 0,
					paddingRight: 0,
					paddingLeft: 0,
				}}
			>
				<Row>
					<Col size="2">
						<ColorCard
							theme={shade > 40 ? "dark" : "light"}
							content={
								{
									palette: setVarName,
									shade,
									prefix: setPrefix,
									hex: setColor,
									variables: setVars,
								} as any
							}
						/>
					</Col>
				</Row>
			</Section>
		</div>
	)
}
Colors.args = {
	palette: "primary",
	secondary: "smush",
	extended: "grey",
	type: "general",
	alpha: "black",
	shade: Object.keys(Palettes.primary || {}).includes("50") ? 50 : 0,
}
Colors.argTypes = {
	palette: {
		name: "Palette",
		options: ["primary", "secondary", "extended", "alpha"],
		control: {
			type: "select",
			labels: {
				base: "Base",
				primary: "Primary",
				secondary: "Secondary",
				extended: "Extended",
				alpha: "Alpha",
			},
		},
	},
	secondary: {
		name: "Sub Palette",
		options: [
			"smush",
			"hummingbird",
			"smartcrawl",
			"defender",
			"forminator",
			"hustle",
			"beehive",
			"branda",
			"snapshot",
			"dashboard",
			"shipper",
			"ivt",
			"blc",
			"hub",
		],
		control: {
			type: "select",
			labels: {
				smush: "Smush",
				hummingbird: "Hummingbird",
				smartCrawl: "Smartcrawl",
				defender: "Defender",
				forminator: "Forminator",
				hustle: "Hustle",
				beehive: "Beehive",
				branda: "Branda",
				snapshot: "Snapshot",
				dashboard: "WPMU DEV Dashboard",
				shipper: "Shipper",
				ivt: "IVT",
				blc: "Broken Link Checker",
				hub: "Hub",
			},
		},
		if: {
			arg: "palette",
			eq: "secondary",
		},
	},
	alpha: {
		name: "Color (Alpha)",
		options: ["black", "white", "grey", "red"],
		control: {
			type: "select",
			labels: {
				black: "Black",
				white: "White",
				grey: "Grey",
				red: "Red",
			},
		},
		if: {
			arg: "palette",
			eq: "alpha",
		},
	},
	extended: {
		name: "Sub Palette",
		options: ["grey", "green", "yellow", "red"],
		control: {
			type: "select",
			labels: {
				grey: "Neutral",
				green: "Success",
				yellow: "Warning",
				red: "Error",
			},
		},
		if: {
			arg: "palette",
			eq: "extended",
		},
	},
	type: {
		name: "Type",
		options: ["general", "variant"],
		control: {
			type: "inline-radio",
			labels: {
				general: "General",
				variant: "Variant",
			},
		},
		if: {
			arg: "palette",
			eq: "secondary",
		},
	},
	shade: {
		name: "Shade",
		control: {
			type: "range",
			min: 0,
			max: 100,
			step: 1,
		},
	},
}

// Publish required stories.
export { Colors }
