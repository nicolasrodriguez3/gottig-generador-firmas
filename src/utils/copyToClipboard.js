export const copyToClipboard = async (text) => {
	try {
		await navigator.clipboard.writeText(text)
	} catch (e) {
		console.error(e)
	}
}
