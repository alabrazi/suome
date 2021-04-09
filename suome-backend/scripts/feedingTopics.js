const songs = require('./songs500');
const fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

let num = 0;
const total = songs.length;

async function fakeRequest(song) {
	const val = await new Promise(function(resolve, reject) {
		request(song.lyricSrc, function(err, res, html) {
			if (!err) {
				try {
					var $ = cheerio.load(html);
					console.log($('.youtube-player-wraper').text());
					const query = $('.youtube-player-wraper').html();

					if (query) {
						const idPart = query.toString().split('data-id=')[1];

						if (idPart) {
							const id = idPart.split('><')[0].replace(/"/g, '');
							song.source = `https://youtu.be/${id}`;
							song.coverImg = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
							num++;
							console.log('DONE===', num, '/', total);
							resolve(song);
						}
					} else {
						console.log('skip^^^^^^^^');
						num++;
						resolve(song);
					}
				} catch (e) {
					console.log('error===>', e, '===> song:', song);
					resolve(song);
				}
			} else {
				console.log('fetch err', err);
				num++;
				resolve(song);
			}
		});
	});
	return val;
}

async function processArr(arr) {
	const promises = arr.map(fakeRequest);
	const data = await Promise.all(promises);
	fs.writeFileSync('treatedSong500.json', JSON.stringify(data), 'utf8');
	console.log('DONE!', data);
}

processArr(songs);
