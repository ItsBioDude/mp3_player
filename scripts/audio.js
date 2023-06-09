const audioFolder = 'static/audio/';
import * as fs from 'fs';
import path from 'path';
// import glob from 'glob';
import { globSync } from 'glob';
let output = {};

const isNotImg = (e) => {
	const ext = path.extname(`${audioFolder}${e}`);
	return !(ext == '.jpg' || ext == '.png');
};

fs.readdir(audioFolder, (err, folders) => {
	folders.forEach((folder) => {
		if (isNotImg(folder)) {
			output[`${folder}`] = [];
			const filesArray = globSync(`${audioFolder}${folder}/*.{mp3,obus}`);
			filesArray.forEach((e) => {
				output[`${folder}`].push(e.replace('static\\', ''));
			});
		}
	});
	fs.writeFileSync(`src/lib/audio.json`, JSON.stringify(output), 'utf8');
});

// await
