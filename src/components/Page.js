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
			comments: "",
            links: [
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
            ]
		}

    }
    // get top 100 comments and add to state
     getData() {
        utils.getAPI("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty")
        // .then(blob => blob.json())
        // .then(json => json)
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
                this.setState(prevState => ({
                    comments: [...prevState.comments, comments]
                }))
            })
        })
    }
	componentDidMount() {
        // check if comments route
		if (utils.checkRoute()) {
			console.log("comments");
			this.getData()
            // if not comments do this
		} else {
			console.log("not comments");
			this.props.data
				.then(result => {
					this.setState({
						data: result
					});
				})
				.catch(e => console.error(`error: ${e}`));
		}

	}
    colorLinks(){
        let route = window.location.pathname
        let elem = document.querySelector("a[href="+ "'" + route + "'" + "]")
        elem.style.color = "#ffffff"
    }
	// render piece of text on show page
	ShowPageText() {
		if (window.location.pathname === "/show") {
			return (
				<div className="show-added-text">
					Please read the{" "}
					<a href="https://news.ycombinator.com/showhn.html"> rules</a>. You can
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
    // check which markup to render- run inside render func
    renderContent(){
        // if comments Page
        if(utils.checkRoute()){
            // if state is loaded
            if(utils.checkLoaded(this.state.comments)){
                return(<div>
                    <this.ShowPageText />
                    {console.log('Render - Comment')}{" "}
                    <Post data={this.state.comments} />{" "}
                    </div>
                )
            } else {
                return(
                        <div> Fetching Comments API Data </div>
                    )
            }
        } else {
            if(utils.checkLoaded(this.state.data)){
                return(<div>
                    <this.ShowPageText />
                    {console.log('Render - Data')}{" "}
                    <Post data={this.state.data} />{" "}
                    </div>
                )
            } else {
                return(
                    <div> Fetching Data API Data </div>
                )
            }

        }
    }
	// change() {
	//     let tds = document.querySelectorAll('td')
	//     utils.elementsRandomColor(tds)
	// }
	render() {
		return (
			<div className="Page"    >
				<div className="page-inner-container">
					<div className="header-container">
						<Header
							Appname="Hacker News"
							links={this.state.links}
						/>{" "}
					</div>{" "}
				</div>{" "}
				<div className="body-container">
					{" "}
                    {this.renderContent()}
				</div>{" "}

			</div>
		);
	}
}
export default Page;
