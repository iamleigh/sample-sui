import { ModalProps, ModalActionsProps } from "./Modal.types"

/**
 * Props provided by the ModalContext to its consumers.
 *
 * Combines modal action handlers with key configuration values
 * so that all modal subcomponents (e.g., `ModalHeader`, `ModalBody`,
 * `ModalFooter`) can seamlessly access and interact with the modal.
 *
 * Inherits:
 * - `ModalActionsProps` → programmatic methods such as `open`, `close`, and `toggle`.
 * - `variant` and `size` from `ModalProps` → defines the modal's style variant
 *   and sizing to ensure consistent rendering across subcomponents.
 */
interface ModalContextProps
	extends ModalActionsProps,
		Pick<ModalProps, "variant" | "size"> {}

export type { ModalContextProps }
