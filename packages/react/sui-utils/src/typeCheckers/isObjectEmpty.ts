/**
 * Check if object is empty
 *
 * @param {object | undefined} obj object to be checked
 * @return {boolean} Returns true if object is empty
 */
export const isObjectEmpty = (obj?: object): boolean => {
	if (!obj) {
		return false
	}

	return Object.keys(obj).length === 0
}
