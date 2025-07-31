type PluginsSlug =
	| "smush"
	| "defender"
	| "snapshot"
	| "hummingbird"
	| "forminator"
	| "beehive"
	| "hustle"
	| "smartcrawl"
	| "shipper"
	| "branda"
	| "blc"
	| "thc"
	| "dashboard"
	| "ivt"
	| "uptime"
	| "hosting"

type PluginIconTypes = {
	bg?: string
	color?: string
	icon: string
}

export type { PluginsSlug, PluginIconTypes }
