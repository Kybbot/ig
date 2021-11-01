const fs = require("fs");

const getSortedFileNames = require("./files");

/**
 * Convert array to object without duplicates.
 * @param {Array<string>} arr Array of strings.
 * @returns {Object} Object with count each line.
 */
function convertArrToObj(arr) {
	return arr.reduce((obj, curr) => {
		obj[curr] = curr;
		return obj;
	}, {});
}

/**
 * Finds all phrases that are in all numberOfFiles, writes them to the existIn${numberOfFiles}Files.txt file, and prints their number to the console.
 * @param {String} folderName Folder name.
 * @param {Number} numberOfFiles Number of files to check
 * @returns Number of phrases that are in all numberOfFiles
 */
function existInFiles(folderName, numberOfFiles = 20) {
	const sortedFileNames = getSortedFileNames(folderName);
	const firstFileName = sortedFileNames[0];

	const firstFileContent = fs
		.readFileSync(`${folderName}/${firstFileName}`, "utf8")
		.toString()
		.split("\n");

	const obj = convertArrToObj(firstFileContent);

	for (let i = 1; i < numberOfFiles; i++) {
		const fileContent = fs
			.readFileSync(`${folderName}/${sortedFileNames[i]}`, "utf8")
			.toString()
			.split("\n");

		const oFileContent = convertArrToObj(fileContent);

		for (let i = 0; i < firstFileContent.length; i++) {
			if (obj[firstFileContent[i]] !== oFileContent[firstFileContent[i]]) {
				delete obj[firstFileContent[i]];
			}
		}
	}

	fs.writeFileSync(`existIn${numberOfFiles}Files.txt`, JSON.stringify(Object.values(obj)), "utf8");
	console.log(`exist in ${numberOfFiles} files` + Object.keys(obj).length);
}

module.exports = existInFiles;
