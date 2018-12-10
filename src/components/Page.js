import React, {Component} from "react";
import Post from "./Post";
import Header from "./Header";
import data from '../data/post_data.json'
import utils from "../utils"

// import getJSON from "../utils"
class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			done: false
		}
	}
	// get array of ids
	getTopIDs(url) {
		return fetch(url).then(blob => blob.json()).then(json => json)
	}
	// returns a promise resolves to an object
	getStory(id) {
		let url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
		return fetch(url).then(blob => blob.json()).then(json => json)
	}
	// returns a promise with object
	componentDidMount() {
		let arr = []
		new Promise((resolve, reject) => {
			this.getTopIDs("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty").then(array => {
				console.log(array)
				array.map((id, index) => {
					return id
				}).map((id, index) => {
					this.getStory(id).then(obj => {
						arr.push(obj)
					}).catch(e => console.error(e))
					// console.log('in')
				})
				setTimeout(function() {
					resolve(arr)
				}, 2000)

			})
		}).then(i => {
			return this.setState({data: i})
		})
		// this.setState({data: arr})
		// this.state.data.forEach((each, i) => {
		// 	console.log(each)
		// })
		// console.log(this.state.data[0])
		// for (var i in this.state.data) {
		// 	for (var j in this.state.data[i]) {
		// 		console.log(j)
		// 	}
		// }
			.catch(e => {
			console.error(`An error: ${e}`)
		})
	}
    change() {
        let tds = document.querySelectorAll('td')
        utils.elementsRandomColor(tds)
    }
	render() {
		let answer;
		// let that = this
		if (this.state.data.length >= 1) {
			answer = 'yes'
		} else {
			answer = 'no'
		}
		return (
		<div className="Page">
            <table className="page-inner-container">
                <thead className="header-container">
        			<Header Appname="Hacker News" links={
                        [
        					{
                                link:"new",
                                url:"/newest"
                            },
                            {
                                link:"comments",
                                url: "https://news.ycombinator.com/newcomments"
                            },
                            {
                                link:"show",
                                url: "/showstories"
                            },
                            {
                                link:"ask",
                                url:"/ask"
                            },
                            {
                                link: "jobs",
                                url: "/jobs"
                            },
                            {
                                link: "submit",
                                url: "https://news.ycombinator.com/submit"
                            }
        				]
                    }/>
        		</thead>
            </table>

    		<div className="body-container">
    			{
    				this.state.data.length
    					?

    								// this.state.data.map((each, i) => {
    								// 	return <Post key={i} data={each.by}/>
    								// })
    								// {
    								// console.log(this.state.data)
    								// }return
    								<Post data={this.state.data}/>


    					: <div>Fetching API data
    						</div>
    			}
                </div>
		</div>);
	}
}
export default Page;
