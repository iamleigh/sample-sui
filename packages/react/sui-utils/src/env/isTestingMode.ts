/**
 * Use this method to detect if code is executed by Jest (test runner)
 */
export const _isTestingMode = () => {
	try {
		return process?.env?.JEST_WORKER_ID !== undefined
	} catch {
		return false
	}
}
