import React, {Component} from "react";
import Post from "./Post";
import Header from "./Header";
import data from "../data/post_data.json";
import utils from "../utils";

// import getJSON from "../utils"
class Page extends Component {
	constructor(props) {
        console.log('props page')
		super(props);
		this.state = {
			data: [],
			comments: "",
            stories: "",
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
    getData(dataToGet) {
        utils.getAPI("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty")
        // .then(blob => blob.json())
        // .then(json => json)
        .then(maxNum => {
            //	 insert ids into URL - get array of promises
            Promise.all(
                Array.from(
                    {
                        length: 300
                    },
                    (_, i) => maxNum - i
                ).map(id => {
                    // console.log(id)
                    return utils.getStory(id).then(obj => {
                        // reject nulls
                        if (obj) {
                            if(dataToGet === "comment"){
                                if (obj.type === "comment") {
                                    return obj;
                                }
                            } else if(dataToGet === "show"){
                                if(obj.type !== "comment"){
                                    return obj
                                }
                            }
                        }
                    });
                    //push resolved promises into another array
                })
            ).then(items => {
                if(dataToGet === 'comment'){
                    let comments = items.filter(obj => obj)
                    this.setState(prevState => ({
                        comments: [...prevState.comments, comments]
                    }))
                } else if(dataToGet === 'show'){
                    console.log('show')
                    let newShows = items.map((item) => {
                        if(item){
                            console.log(item.title)
                        }
                        // if(item.type === 'story'){
                            // console.log(/^Show HN:/.test(item.title))
                        // }
                    })
                    // this.setState(prevState => ({
                    //     comments: [...prevState.comments, comments]
                    // }))

                } else {
                    console.error(`Error: fetch type needed`)
                }
            })
        })
    }
    filterShowStories(){
        utils.getAPI(" https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty")
        .then(stories => {
            Promise.all(
                stories.map(id => {
                    // console.log(id)
                    return utils.getStory(id).then(obj => {
                        // reject nulls
                        return obj
                    });
                    //push resolved promises into another array
                })
            ).then(stories => {
                stories = stories.sort((a, b) => {
                    return a.time - b.time
                }).reverse()
                this.setState(prevState => ({
                    stories: [...prevState.stories, stories]
                }))
            })
        })
    }
	componentDidMount() {
        // check if comments route
		if (utils.checkRoute('/comments')) {
			// get comments and set state
			this.getData("comment")
            // if not comments do this
        } else if(utils.checkRoute('/shownew')){
            this.getData("show")
            // console.log('show', this.state)
		} else {
			console.log("not comments")
			this.props.data.then(result => {
					this.setState({
						data: result
					});
				})
				.catch(e => console.error(`error: ${e}`));
		}

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
        if(utils.checkRoute('/comments')){
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
        } else if(utils.checkRoute('/shownew')){
            if(utils.checkLoaded(this.state.stories)){
                return(<div>
                    {console.log('Render - show new')}{" "}
                    <Post data={this.state.stories} />{" "}
                    </div>
                )
            }

        } else {
            if(utils.checkLoaded(this.state.data)){
                return(<div>
                    <this.ShowPageText />
                    {console.log('Render - Data')}{" "}
                    {console.log(this.state)}{" "}
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
