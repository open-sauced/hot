module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{svg,txt,css}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};