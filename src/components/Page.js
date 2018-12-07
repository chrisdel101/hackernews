import React, {Component} from "react";
import Post from "./Post";
import Header from "./Header";
import data from '../data/post_data.json'
// import getJSON from "../utils"
class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: '',
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
		this.getTopIDs("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty").then(array => {
			array.map((id) => {
				return id
			}).map(id => {
				this.getStory(id).then(obj => {
					arr.push(obj)
				})
			})
			this.setState(prevState => ({
				data: [
					...prevState.data,
					arr
				]
			}))
			console.log('end', this.state)
		}).catch(e => {
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
								this.state.data.map((each) => {
									<div></div>
								})
							}
						</div>
					: <div>no</div>
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
