import React from "react"
function Post(props) {
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
	return props.data.map((post, index) => {
        console.log(post.time)
        console.log(post.by)
        return (
            <div className="Post" key={index}>
    			<div className="rank">
    				<span>{index+1}.</span>
    			</div>
    			<div className="vote">
    				<span><img src="https://news.ycombinator.com/grayarrow2x.gif"/></span>
    			</div>
                <div className="text-container">
        			<div className="title">
        				<a className="Post-link" href={post.url} target="_blank" rel="noopener noreferrer">
        					{post.title}
        				</a>
        			</div>
                    <div className="subtext">
        				<span className="score">{post.score}
        					points by {''}
        					<a href={post.by}>{''}{post.by}</a>
        				</span>
        				<span className="age">
        					{''}
        					<a href={post.time}>&nbsp;{getDiff(post.time)}</a>
        				</span>
        				<span className="hide">
        					{''}
        					<a href="#">&nbsp;hide</a>
        				</span>
        				<span className="comment">
        					<a href={post.descendants}>&nbsp;comments</a>
        				</span>
        			</div>
                </div>

		</div>)
	})

}
export default Post
