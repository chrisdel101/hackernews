import React, {Component} from "react";
import Post from "./Post";
import Header from "./Header";
import Footer from "./Footer";
import data from "../data/post_data.json";
import utils from "../utils";

// import getJSON from "../utils"
class Page extends Component {
	constructor(props) {
        console.log('props page', props)
		super(props);
		this.state = {
			fullData: [],
            chunkData: [],
            fullComments: [],
			chunkComments: [],
            stories: "",
            headerLinks: [
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
            ],
            footerLinks: [
                {
                    link: "Guildlines",
                    url: "#"
                },
                {
                    link: "FAQ",
                    url: "#"
                },
                {
                    link: "Support",
                    url: "#"
                },
                {
                    link: "API",
                    url: "#"
                },
                {
                    link: "Security",
                    url: "#"
                },
                {
                    link: "Lists",
                    url: "#"
                },
                {
                    link: "Bookmarklet",
                    url: "#"
                },
                {
                    link: "Legal",
                    url: "#"
                },
                {
                    link: "Apply to YC",
                    url: "#"
                },
                {
                    link: "Contact",
                    url: "#"
                },
            ]
		}

    }
    // use to get data if not passed in my router
    getData(dataToGet) {
        utils.getAPI("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty")
        .then(maxNum => {
            //	 insert ids into URL - get array of promises
            Promise.all(
                Array.from(
                    {
                        length: 100
                    },
                    (_, i) => maxNum - i
                ).map(id => {
                    // check which route it is being called in with flag - comment or non-comment
                    return utils.getStory(id).then(obj => {
                        // reject nulls here
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
                    // filter out undefined
                    let comments = items.filter(obj => obj)
                    console.log('c', comments)
                    // push all comments to state
                    this.setState({
                        fullComments: comments
                    })
                    // paginate comments on load
                    let obj = utils.paginate(this.state.fullComments)
                    // set first 30 to state
                    this.setState({
                        chunkComments: obj
                    })
                    console.log('state', this.state)
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
    colorLinks(){
        let route = window.location.pathname
        let elem = document.querySelector("a[href="+ "'" + route + "'" + "]")
        elem.style.color = "#ffffff"
    }
    //fired onclick pass in arr to be sliced
    updatePageState(arr, stateKey){
        console.log('fired')
        let obj = utils.paginate(arr)
        console.log('paginate obj', obj)
        console.log('datakey', stateKey)
        // use [] to set string in key
        this.setState({
            [stateKey]: obj
        })
        // console.log('state', this.state.stateKey)
        console.log('state', this.state[stateKey])
    }
	componentDidMount() {
        this.colorLinks()
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
            // push entire array of props to state
			this.props.data.then(result => {
                // load full data
					this.setState({
						fullData: result
					}, () => {
                        //paginate data on load
                        let obj = utils.paginate(this.state.fullData)
                        // set first 30 to state
                        this.setState({
                            chunkData: obj
                        })
                        // this.updatePageState(this.state.fullData)
                    })
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
					<a href="/shownew">newest
					</a>{" "}
					Show HNs.{" "}
				</div>
			)
		} else {
			return null
		}
	}
    // check which markup to render- run inside render func
    renderBodyContent(){
        // if comments Page
        if(utils.checkRoute('/comments')){

            // if state is loaded
            if(utils.checkLoaded(this.state.fullComments)){
                console.log('fired')
                console.log('state', this.state)
                return(<div>
                    <this.ShowPageText />
                    {console.log('Render - Comment')}{" "}
                    {console.log(this.state.chunkComments)}{" "}
                    {console.log(Array.isArray(this.state.chunkComments))}{" "}
                    <Post data={this.state.chunkComments} />{" "}
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
            if(utils.checkLoaded(this.state.fullData)){
                if(utils.checkLoaded(this.state.chunkData)){
                    return(<div>
                        <this.ShowPageText />
                        {console.log('Render-Data')}{" "}
                        {" "}
                        <Post data={this.state.chunkData} />{" "}
                        </div>
                    )
                } else {
                    return(
                        <div> Fetching API Data </div>
                    )
                }
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
			<div className="Page">
				<div className="page-inner-container">
					<div className="header-container">
						<Header
							Appname="Hacker News"
							links={this.state.headerLinks}
						/>{" "}
					</div>{" "}
    				<div className="body-container">
    					{" "}
                        {this.renderBodyContent()}
                        <div id="paginator" onClick={() => {
                            this.updatePageState(this.state.fullData, "chunkData")
                        }}>More</div>
    				</div>{" "}
                        <Footer links={this.state.footerLinks}/>
                </div>{" "}
			</div>
		);
	}
}
export default Page;
