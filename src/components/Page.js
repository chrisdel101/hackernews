import React, {Component} from "react";
import Post from "./Post";
import Header from "./Header";
import data from '../data/post_data.json'
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
					console.log(arr.length)
					resolve(arr)
				}, 400)

			})
		}).then(i => {
			return this.setState({data: i})
			console.log(this.state)
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

	render() {
		let answer;
		// let that = this
		if (this.state.data.length >= 1) {
			answer = 'yes'
		} else {
			answer = 'no'
		}
		return (
		// <table className="Page">
		// <thead>
		// 	<Header Appname="Hacker News" links={[
		// 			"new",
		// 			"comments",
		// 			"show",
		// 			"ask",
		// 			"jobs",
		// 			"submit"
		// 		]}/>
		// </thead>
		// <tbody>
		<div>
			{
				this.state.data.length
					? <div>
							{
								// this.state.data.map((each, i) => {
								// 	return <Post key={i} data={each.by}/>
								// })
								// {
								// console.log(this.state.data)
								// }return
								<Post data={this.state.data}/>

							}
						</div>
					: <div>Fetching API data
						</div>
			}

		</div>)
		// {this.state.data}
		// 	</tbody>
		// </table>);
	}
}
export default Page;

class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: ''
		}
	}
	// get array of ids
	getTopIDs(url) {
		return fetch(url).then(blob => blob.json()).then(json => json)
	}
	getStory(id) {
		let url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
		return fetch(url).then(blob => blob.json()).then(json => json)
	}
	componentDidMount() {
		let arr = []
		let promise = new Promise((resolve, reject) => {
			let data = this.getTopIDs("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty").then((idArr) => {
				idArr.forEach((id, index) => {
					this.getStory(id).then(res => {
						arr.push(res)
					})
					// if (index === idArr.length - 1) {
					// 	console.log(arr)
					// }
				})
				resolve(arr)
			})
		})
		promise.then(res => {
			this.state.done = true
			return this.setState({data: arr})
		})
	}

	render() {
		return (
		// <table className="Page">
		// <thead>
		// 	<Header Appname="Hacker News" links={[
		// 			"new",
		// 			"comments",
		// 			"show",
		// 			"ask",
		// 			"jobs",
		// 			"submit"
		// 		]}/>
		// </thead>
		// <tbody>
		<div>
			{
				this.state.data.length
					? <div>Yes</div>
					: <div>No</div>
			}
		</div>)
	}
}
