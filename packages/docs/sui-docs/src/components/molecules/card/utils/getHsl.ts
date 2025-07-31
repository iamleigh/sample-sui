import { getRgb } from "./getRgb"

// Convert RGB to HSL
export const getHsl = (value: string) => {
	const limitDecimals = (number: number) => {
		return Math.round(number * 100) / 100
	}

	const roundValue = (number: number) => {
		return Math.floor(number)
	}

	// Extract RGB values from HEX.
	let red = getRgb(value).r
	let green = getRgb(value).g
	let blue = getRgb(value).b

	// Convert the RGB values to the range 0-1.
	red /= 255
	green /= 255
	blue /= 255

	red = limitDecimals(red)
	green = limitDecimals(green)
	blue = limitDecimals(blue)

	// Find the minimum and maximum values of R, G and B.
	const min = Math.min(red, green, blue)
	const max = Math.max(red, green, blue)

	// Calculate the luminance value.
	const lum = limitDecimals(((min + max) / 2) * 100)

	// Calculate the saturation.
	let hue, sat

	if (min === max) {
		// There is no saturation.
		hue = 0
		sat = 0
	} else {
		// There is saturation in the color.
		if (50 <= limitDecimals(lum)) {
			sat = limitDecimals(((max - min) / (2.0 - max - min)) * 100)
		} else {
			sat = limitDecimals(((max - min) / (max + min)) * 100)
		}

		switch (max) {
			case red:
				hue = (green - blue) / (max - min)
				break

			case green:
				hue = 2.0 + (blue - red) / (max - min)
				break

			case blue:
				hue = 4.0 + (red - green) / (max - min)
				break

			default:
				hue = 0
				break
		}

		hue = limitDecimals(hue * 60)
	}

	return `${roundValue(hue)}, ${roundValue(sat)}%, ${roundValue(lum)}%`
}
