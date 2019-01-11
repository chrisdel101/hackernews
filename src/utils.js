function getAPI(url) {
	return fetch(url)
		.then(blob => blob.json())
		.then(json => json)
}
//add type, rgba, hex
//add color range or name
function randomHex() {
	// returns random hex
	return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

function elementsRandomColor(elementsArray) {
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

function fetchData(url) {
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
		setTimeout(function() {
			resolve(arr)
		}, 2000)
	})
	// .then(res => {
	//     console.log('res', res)
	//     return res
	// })
	//     .catch(e => {
	//     console.error(`An error: ${e}`)
	// })
}
// check if this route
function checkRoute(routeName){
    if(process.env.NODE_ENV === "development"){
        routeName = `/${routeName}`
        console.log('dev', routeName)
        let pathname = window.location.pathname
        return (pathname === routeName ? true : false)
    } else if(process.env.NODE_ENV === "production"){
        routeName = `/#/${routeName}`
        let hash = window.location.hash
        return (hash === routeName ? true : false)
    }
}
// get max id and 100 previous
function walkBackComments() {
	return getAPI("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty")
		.then(maxNum => {
			let top100 = []
			let i = 0
			while(i < 100) {
				let num = maxNum - i
				top100.push(num)
				i++
			}
			let objs = top100.map(id => {
				return getStory(id)
					.then(obj => {
						// reject nulls
						if(obj) {
							if(obj.type === 'comment') {
								return obj
							}
						}
					})
			})
			console.log('walk back okay')
			return objs
		})
}
// walkBackComments().then(arr => {
//     arr.forEach(i => {
//         i.then(j => console.log(j))
//     })
// })
function unixConverter(UNIX_timestamp) {
	// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
	let a = new Date(UNIX_timestamp * 1000)
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
	if(seconds < 60) {
		return `${seconds} seconds ago`
	} else if(minutes < 60) {
		return `${minutes} minutes ago`
	} else if(hours < 24) {
		return `${hours} hours ago`
	} else {
		return `${days} days ago`
	}
}

function getDiff(unix) {
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
function commentsLink(post) {
	// if no kids, undefined, send to ID page
	if(!post.kids) {
		return 'discuss'
	} else {
		return `${post.kids.length} comments`
	}
}
// shows link to the name of website post came from - i.e. medium.com
function hostURL(url) {
	// if no url, return null in ternary
	if(!url) {
		return ''
	}
	// console.log(url)
	let urlObj = new URL(url)
	let hostname = urlObj.hostname
	hostname = hostname.replace(/^(www\.)/, "");
	return hostname
}
// check if object empty
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
// check if array has length inisde render - t for length
function checkLoaded(item){
    if(Array.isArray(item)){
        return !item.length ? false : true
    } else if(!(Array.isArray(item)) && typeof "object") {
        return !isEmpty(item)
    }
}


function filterShowStories(){
    getAPI(" https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty")
    .then(stories => {
        Promise.all(
            stories.map(id => {
                // console.log(id)
                return getStory(id).then(obj => {
                    // reject nulls
                    return obj
                });
                //push resolved promises into another array
            })
        ).then(stories => {
            return stories = stories.sort((a, b) => {
                return a.time - b.time
            }).reverse()
        })
    })
}
// encode text in string
function encodeStr(base, query){
	return encodeURI(`${base}${query}`)
}
// takes an array of results - returns value then increments
// holds values in a closure
const countBy30 = (function () {
  var counter = 0
  return function () {
      counter = counter += 30
      return counter
  }
})();
function range(start, stop, step){
    return  Array.from({ length: (stop - start) / step }, (_, i) => start + (i * step))
}
// function paginate(arr){
//     // console.log('paginate')
//     let count = countBy30()
//     // console.log(count)
//     let sliceStart = count - 30
//     let sliceEnd = count
//     let indexes = range(sliceStart+1, sliceEnd+1, 1)
//     let chunk = arr.slice(sliceStart, sliceEnd)
//     return {
//         data: chunk,
//         indexes: indexes
//     }
// }
function paginate(arr) {
    //increment and get current count
        let count = this.state.counter + 30;
        console.log('count', count)
        let sliceStart = count - 30
/* console.log('start', sliceStart)
 */        let sliceEnd = count
/* console.log('end', sliceEnd) */
        let chunk = arr.slice(sliceStart, sliceEnd)
        /* console.log('chunk', chunk) */
        return {chunkComments: chunk, counter: count};
    }

module.exports = {
    range: range,
    getAPI: getAPI,
	getDiff: getDiff,
	elementsRandomColor: elementsRandomColor,
	getTopIDs: getTopIDs,
	getStory: getStory,
	fetchData: fetchData,
	walkBackComments: walkBackComments,
	hostURL: hostURL,
	commentsLink: commentsLink,
    checkRoute: checkRoute,
    checkLoaded: checkLoaded,
    filterShowStories: filterShowStories,
    encodeStr: encodeStr,
    paginate: paginate
}
