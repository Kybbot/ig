const fs = require("fs");

/**
 * Sorts file names by asc.
 * @param {String} a String.
 * @param {String} b String.
 * @returns {Array<string>} Array of sorted file names by asc.
 */
function sortFilesName(a, b) {
	return Number(a.slice(3, 5)) - Number(b.slice(3, 5));
}

/**
 * Returns array of sorted file names.
 * @param {String} folderName Folder name.
 * @returns {Array<string>} Array of sorted file names.
 */
function getSortedFileNames(folderName) {
	const files = fs.readdirSync(folderName, "utf8").sort(sortFilesName);
	return files;
}

module.exports = getSortedFileNames;
