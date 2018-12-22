import React, {Component} from "react";
import Post from "./Post";
import Header from "./Header";
import data from "../data/post_data.json";
import utils from "../utils";

// import getJSON from "../utils"
class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			comments: ""
		};
	}
	// returns a promise with object
	componentDidMount() {
		// if COMMENTS do this
		const that = this;
		if (window.location.pathname === "/comments") {
			console.log("comments");

			function getData() {
				fetch("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty")
					.then(blob => blob.json())
					.then(json => json)
					.then(maxNum => {
						//	 insert ids into URL - get array of promises
						Promise.all(
							Array.from(
								{
									length: 100
								},
								(_, i) => maxNum - i
							).map(id => {
								// console.log(id)
								return utils.getStory(id).then(obj => {
									// reject nulls
									if (obj) {
										if (obj.type === "comment") {
											return obj;
										}
									}
								});
								//push resolved promises into another array
							})
						).then(comments => {
							comments = comments.filter(obj => obj)
							that.setState(prevState => ({
								comments: [...prevState.comments, comments]
							}))
						})
						// let arr = comments.filter(obj => {
						// 	return obj
						// })
						// console.log('comments', comments)
						// // this.setState({
						// // 	comments: arr
						// // })
						// that.setState(prevState => ({
						// 	comments: [...prevState.arr, arr]
						// }))
					});
				//set the array to state
				// })
			}
			getData();
			// this.props.data.then(promisesArr => {
			//     let newArr = []
			//     promisesArr.forEach(res => {
			//         res.then(comment => {
			//             newArr.push(comment)
			//         })
			//     })
			//     this.setState({
			//         data: newArr
			//     })
			//     console.log(this.state)
			// })
			// .catch(e => console.error(`error: ${e}`))
			// for not comment routes do this
		} else {
			console.log("not comments");
			this.props.data
				.then(result => {
					this.setState({
						data: result
					});
					console.log('state',this.state);
				})
				.catch(e => console.error(`error: ${e}`));
		}
	}
	// render piece of text on show page
	ShowPageText() {
		if (window.location.pathname === "/show") {
			return (
				<div>
					Please read the{" "}
					<a href="https://news.ycombinator.com/showhn.html"> rules. </a> You can
					also browse the{" "}
					<a
						href="/shownew
				"
					>
						newest
					</a>{" "}
					Show HNs.{" "}
				</div>
			);
		} else {
			return null;
		}
	}
	// change() {
	//     let tds = document.querySelectorAll('td')
	//     utils.elementsRandomColor(tds)
	// }
	render() {
		return (
			<div className="Page">
				<div className="page-inner-container">
					<div className="header-container">
						<Header
							Appname="Hacker News"
							links={[
								{
									link: "new",
									url: "/newest"
								},
								{
									link: "comments",
									url: "/comments"
								},
								{
									link: "show",
									url: "/show"
								},
								{
									link: "ask",
									url: "/ask"
								},
								{
									link: "jobs",
									url: "/jobs"
								},
								{
									link: "submit",
									url: "https://news.ycombinator.com/submit"
								}
							]}
						/>{" "}
					</div>{" "}
				</div>{" "}
				{console.log('state',this.state.data)}{" "}
				<div className="body-container">
					{" "}
					{this.state.data.length ? (
						<div>
							<this.ShowPageText />
                            {console.log('Post')}{" "}
							<Post data={this.state.data} />{" "}
						</div>
					) : (
						<div> Fetching API Data </div>
					)}{" "}
				</div>{" "}
			</div>
		);
	}
}
export default Page;
