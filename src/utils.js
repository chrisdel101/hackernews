function getAPI(url) {
	return fetch(url)
		.then(blob => blob.json())
		.then(json => json)
}
// console.log(getAPI('https://hacker-news.firebaseio.com/v0 / newstories.json?print = pretty'))
export default getAPI