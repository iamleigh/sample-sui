import React, { Children, JSX } from "react"
import { isEmpty, isUndefined } from "../../../utils/index"
import "./list.scss"

interface ListProps {
	id?: string
	title?: string
	children: JSX.Element[]
}

const List: React.FC<
	ListProps &
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLUListElement>,
			HTMLUListElement
		>
> = ({ id = "", title = "", children, ...props }) => {
	const items = Children.map(children, (item, index) => {
		const subitems = Children.map(item?.props.children, (subitem, subindex) => {
			return <li key={index + "-" + subindex}>{subitem.props.label}</li>
		})

		return (
			<li key={`${id}-item-${index}`}>
				{item?.props.label}
				{!isUndefined(item?.props.children) && (
					<ul className="csb-sublist">{subitems}</ul>
				)}
			</li>
		)
	})

	return (
		<>
			{!isEmpty(title) && (
				<h3 id={id} className="csb-list__title">
					{title}
				</h3>
			)}

			<ul
				className="csb-list"
				{...(!isEmpty(title) && { "aria-labelledby": id })}
				{...props}
			>
				{items}
			</ul>
		</>
	)
}

export { List }
