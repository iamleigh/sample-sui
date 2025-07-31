import React, { createContext } from "react"
import { _renderHTMLPropsSafely } from "@wpmudev/sui-utils"
import { ModalContextProps } from "./ModalContext.types"

/**
 * React Context providing modal control methods and configuration.
 *
 * Exposes the modal's `openModal`, `closeModal`, `variant`, and `size`
 * values to all child components, enabling seamless coordination between
 * the modal container and its subcomponents (e.g., `ModalHeader`, `ModalBody`).
 *
 * Note: Keeping `ModalContext` defined in this file is acceptable for small
 * to mid-sized projects, as it keeps related logic co-located. For larger
 * projects or when multiple files/components depend on the context, consider
 * moving it to a dedicated `ModalContext.ts` file to improve readability and
 * maintainability.
 */
const ModalContext = createContext<ModalContextProps | null>(null)

export { ModalContext }
