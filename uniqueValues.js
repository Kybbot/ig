const fs = require("fs");

const getSortedFileNames = require("./files");

/**
 * Sorts arr and find unique strings.
 * @param {Array<string>} arr Array of strings.
 * @returns {Array<string>} Array with unique strings.
 */
function uniqueStrings(arr) {
	const arrOfUniqueStrings = [];
	const sortedArray = arr.sort();

	for (let i = 0; i < sortedArray.length; i++) {
		if (sortedArray[i] !== sortedArray[i + 1] && sortedArray[i] !== sortedArray[i - 1]) {
			arrOfUniqueStrings.push(sortedArray[i]);
		}
	}

	return arrOfUniqueStrings;
}

/**
 * Finds all unique phrases, writes them to the uniqueValues.txt file, and prints their number to the console.
 * @param {String} folderName Folder name.
 * @returns Number of unique phrases
 */
function uniqueValues(folderName) {
	const sortedFileNames = getSortedFileNames(folderName);

	let arrOfNotUniqueStrings = [];

	for (let i = 0; i < sortedFileNames.length; i++) {
		const fileContent = fs
			.readFileSync(`${folderName}/${sortedFileNames[i]}`, "utf8")
			.toString()
			.split("\n");

		arrOfNotUniqueStrings = [...arrOfNotUniqueStrings, ...fileContent];
	}

	const result = uniqueStrings(arrOfNotUniqueStrings);

	fs.writeFileSync("uniqueValues.txt", JSON.stringify(result), "utf8");
	console.log("uniqueValues: " + result.length);
}

module.exports = uniqueValues;
