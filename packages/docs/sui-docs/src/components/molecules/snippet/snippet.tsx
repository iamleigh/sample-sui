import React, { useState } from "react"
import classnames from "classnames"
import { Source } from "@storybook/addon-docs"
import { Button } from "../../atoms/button/button"
import "./snippet.scss"

interface SnippetProps {
	language?: string
	dark?: boolean
	children: string
	isOpen?: boolean
	hideToggle?: boolean
}

const Snippet: React.FC<SnippetProps> = ({
	language = "jsx",
	dark = false,
	children,
	isOpen = false,
	hideToggle = false,
}) => {
	const [showCode, setShowCode] = useState(isOpen)
	const snippetClasses = classnames({
		"csb-snippet": true,
		"csb-snippet--dark": dark,
	})

	return (
		<div className={snippetClasses}>
			{!hideToggle && (
				<Button
					type="button"
					style="secondary"
					label={showCode ? "Hide code" : "Show code"}
					className="csb-snippet__toggle-button"
					onClick={() => setShowCode(!showCode)}
				/>
			)}
			{(showCode || hideToggle) && (
				<Source code={children} language={language} dark={true} />
			)}
		</div>
	)
}

export { Snippet }
