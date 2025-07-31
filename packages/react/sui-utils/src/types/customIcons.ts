import type { PluginIconTypes } from "./plugins"

type CustomIconsSlug = "documentation" | "feedback" | "contact"

type CustomIconsMap = Record<CustomIconsSlug, PluginIconTypes>

export type { CustomIconsSlug, CustomIconsMap }
