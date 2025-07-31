/**
 * Break an array into chunks of a specified size
 *
 * @param {any[]}  arr  - The array to be chunked
 * @param {number} size - The size of each chunk
 *
 * @return {any[][]} - An array of arrays containing the chunks
 */
export const chunkArray = (arr: any[], size: number): any[][] => {
	const chunkedArray = []

	// Iterate through the input array, creating chunks of the specified size
	for (let i = 0; i < arr.length; i += size) {
		// Use Array.slice to extract a chunk of the array
		const chunk = arr.slice(i, i + size)

		// Add the chunk to the result array
		chunkedArray.push(chunk)
	}

	return chunkedArray
}
