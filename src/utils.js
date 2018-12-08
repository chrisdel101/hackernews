function getAPI(url) {
	return fetch(url)
		.then(blob => blob.json())
		.then(json => json)
}
//add type, rgba, hex
//add color range or name
function randomHex(){
    // returns random hex
    return '#'+Math.floor(Math.random()*16777215).toString(16)
}
function elementsRandomColor(elementsArray){
	elementsArray = Array.from(elementsArray)
    let map = elementsArray.map((elem) => {
		console.log(elem)
        return elem.style.backgroundColor = randomHex()
    })

}
// console.log(getAPI('https://hacker-news.firebaseio.com/v0 / newstories.json?print = pretty'))
module.exports = {
    elementsRandomColor: elementsRandomColor
}
