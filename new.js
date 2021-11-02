const fs = require("fs");

const folderName = "200k";

function loadData(folderName) {
	const files = fs.readdirSync(folderName, "utf8");

	const data = {};

	for (let i = 0; i < files.length; i++) {
		const fileContent = fs.readFileSync(`${folderName}/out${i}.txt`, "utf8").toString().split("\n");

		for (let j = 0; j < fileContent.length; j++) {
			if (data[fileContent[j]]) {
				(data[fileContent[j]].amount += 1), data[fileContent[j]].repetitions.add(i);
			} else {
				data[fileContent[j]] = {
					amount: 1,
					repetitions: new Set().add(i),
				};
			}
		}
	}

	return data;
}

function uniqueValues(obj) {
	let result = 0;

	for (let item in obj) {
		if (obj[item].amount === 1) result += 1;
	}

	return result;
}

function existInAtLeastTen(obj) {
	let result = 0;

	for (let item in obj) {
		if (obj[item].repetitions.size > 9) result += 1;
	}

	return result;
}

function existInAllFiles(obj) {
	let result = 0;

	for (let item in obj) {
		if (obj[item].repetitions.size === 20) result += 1;
	}

	return result;
}

function start() {
	const data = loadData(folderName);

	console.log("Unique values: " + uniqueValues(data));
	console.log("Exist in at least ten: " + existInAtLeastTen(data));
	console.log("Exist in all files: " + existInAllFiles(data));
}

start();
