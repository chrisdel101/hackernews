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
        console.log('routing return')
        return objs
    })
}
// walkBackComments().then(arr => {
//     arr.forEach(i => {
//         i.then(j => console.log(j))
//     })
// })
function unixConverter(UNIX_timestamp){
    // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  let a = new Date(UNIX_timestamp * 1000)
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  let year = a.getFullYear()
  let month = months[a.getMonth()]
  let date = a.getDate()
  let hour = a.getHours()
  let min = a.getMinutes()
  let sec = a.getSeconds()
  let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
  return time
}
// https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
// ms to human readable time
function msConverter(millisec) {
    let seconds = (millisec / 1000).toFixed()
    let minutes = (millisec / (1000 * 60)).toFixed()
    let hours = (millisec / (1000 * 60 * 60)).toFixed()
    let days = (millisec / (1000 * 60 * 60 * 24)).toFixed()
    if (seconds < 60) {
        return `${seconds} seconds ago`
    } else if (minutes < 60) {
        return `${minutes} minutes ago`
    } else if (hours < 24) {
        return `${hours} hours ago`
    } else {
        return `${days} days ago`
    }
}
function getDiff(unix){
    // convert unix to time date string
    let timeString = unixConverter(unix)
    // convert to new date ms object
    let ms = new Date(timeString).getTime()
    // subract from current time
    let diff = new Date().getTime() - ms
    // convert diff to hours
    let result = msConverter(diff)
    return result
}
// create a link to comments
function commentsLink(post){
    // if no kids, undefined, send to ID page
    if(!post.kids){
        return 'discuss'
    } else {
        return `${post.kids.length} comments`
    }
}
function hostURL(url){
    // if no url, return null in ternary
    if(!url){
        console.log('NO URL')
        return ''        }
    // console.log(url)
    let urlObj = new URL(url)
    let hostname = urlObj.hostname
    hostname = hostname.replace(/^(www\.)/,"");
    return hostname
}
module.exports = {
    getDiff: getDiff,
    elementsRandomColor: elementsRandomColor,
    getTopIDs: getTopIDs,
    getStory:getStory,
    fetchData: fetchData,
    walkBackComments: walkBackComments,
    hostURL: hostURL,
    commentsLink: commentsLink
}
