import { isEmpty } from "@wpmudev/sui-utils"
import { ComponentType, FC } from "react"

interface UseValidatePropsTypes {
	propsToCheck: any
	component: ComponentType | FC<any>
}

const useValidateProps = ({
	propsToCheck,
	component,
}: UseValidatePropsTypes) => {
	const componentName =
		component?.displayName || (component as Record<string, any>)?.name

	Object.keys(propsToCheck)?.forEach((propKey: string) => {
		const isValid = !isEmpty(propsToCheck?.[propKey] ?? "")

		if (!isValid) {
			throw new Error(
				`Empty content is not valid. More details below:\n\n⬇️ ⬇️ ⬇️\n\n📦 SUI 3 React - Components: ${componentName}\n\nThe "${propKey}" argument requires some value to be passed to it.\n\n`,
			)
		}
	})
}

export { useValidateProps }
