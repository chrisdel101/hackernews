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
// get array of ids
function getTopIDs(url) {
    return fetch(url).then(blob => blob.json()).then(json => json)
}
// returns a promise resolves to an object
function getStory(id) {
    let url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    return fetch(url).then(blob => blob.json()).then(json => json)
}
function fetchData(url){
    console.log(url)
    let arr = []
    return new Promise((resolve, reject) => {
        getTopIDs(url).then(array => {
            array.map((id, index) => {
                return id
            }).map((id, index) => {
                getStory(id).then(obj => {
                    arr.push(obj)
                }).catch(e => console.error(e))
            })
        })
        setTimeout(function(){
            resolve(arr)
        },2000)
    })
    // .then(res => {
    //     console.log('res', res)
    //     return res
    // })
    //     .catch(e => {
    //     console.error(`An error: ${e}`)
    // })
}


// get max id and 100 previous
function walkBackComments(){
    return getAPI("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty")
    .then(maxNum => {
        let top100 = []
        let i = 0
        while(i < 100){
            let num = maxNum - i
            top100.push(num)
            i++
        }
        let objs = top100.map(id => {
            return getStory(id)
            .then(obj => {
                // reject nulls
                if(obj){
                    if(obj.type === 'comment'){
                        return obj
                    }
                }
            })
        })
        return objs
    })
}
// walkBackComments().then(arr => {
//     arr.forEach(i => {
//         i.then(j => console.log(j))
//     })
// })
module.exports = {
    elementsRandomColor: elementsRandomColor,
    getTopIDs: getTopIDs,
    getStory:getStory,
    fetchData: fetchData,
    walkBackComments: walkBackComments
}
