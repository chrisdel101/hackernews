import React, {Component} from "react";
import Post from "./Post";
import Header from "./Header";
import Footer from "./Footer";
import data from "../data/post_data.json";
import utils from "../utils";

// import getJSON from "../utils"
class Page extends Component {
	constructor(props) {
        // console.log('props page', props)
		super(props)
		this.state = {
            counter: 0,
			fullData: [],
            chunkData: [],
            fullComments: [],
			chunkComments: [],
            stories: "",
            headerLinks: [
                {
                    link: "new",
                    url: `${process.env.PUBLIC_URL}/#/newest`
                },
                {
                    link: "comments",
                    url: `${process.env.PUBLIC_URL}/#/comments`
                },
                {
                    link: "show",
                    url: `${process.env.PUBLIC_URL}/#/show`
                },
                {
                    link: "ask",
                    url: `${process.env.PUBLIC_URL}/#/ask`
                },
                {
                    link: "jobs",
                    url: `${process.env.PUBLIC_URL}/#/jobs`
                },
                {
                    link: "submit",
                    url: "https://news.ycombinator.com/submit"
                }
            ],
            footerLinks: [
                {
                    link: "Guildlines",
                    url: "https://news.ycombinator.com/newsguidelines.html"
                },
                {
                    link: "FAQ",
                    url: "https://news.ycombinator.com/newsfaq.html"
                },
                {
                    link: "Support",
                    url: "mailto:hn@ycombinator.com"
                },
                {
                    link: "API",
                    url: "https://github.com/HackerNews/API"
                },
                {
                    link: "Security",
                    url: "https://news.ycombinator.com/security.html"
                },
                {
                    link: "Lists",
                    url: "https://news.ycombinator.com/lists"
                },
                {
                    link: "Bookmarklet",
                    url: "https://news.ycombinator.com/bookmarklet.html"
                },
                {
                    link: "Legal",
                    url: "http://www.ycombinator.com/legal/"
                },
                {
                    link: "Apply to YC",
                    url: "http://www.ycombinator.com/apply/"
                },
                {
                    link: "Contact",
                    url: "mailto:hn@ycombinator.com"
                },
            ]
		}
        this.updatePageState = this.updatePageState.bind(this);

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
                    })
                })
            ).then(items => {
                if(dataToGet === 'comment'){
                    // filter out undefined
                    let comments = items.filter(obj => obj)
                    // return paginate obj
                    let counterAndChunk = this.paginate(comments)
                    // console.log('counterAndChunk', counterAndChunk)
                    this.setState({
                        fullComments: [...comments],
                        chunkComments: [...counterAndChunk.chunkComments],
                        counter: counterAndChunk.counter,
                        indexes:  counterAndChunk.indexes
                    })
                    console.log('state', this.state)
                } else if(dataToGet === 'show'){
                    console.log('show')
                    let newShows = items.map((item) => {
                        if(item){
                            console.log(item.title)
                        }
                    })
                        
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
                    })
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
    paginate(arr) {
        // console.log('Arr', arr)
    //increment and get current count
        let count = this.state.counter + 30
        // console.log('count', count)
        let sliceStart = count - 30
 // console.log('start', sliceStart)
     let sliceEnd = count
/* console.log('end', sliceEnd) */
        let indexes = utils.range(sliceStart+1, sliceEnd+1, 1)
        let chunk = arr.slice(sliceStart, sliceEnd)
        /* console.log('chunk', chunk) */
        if(utils.checkRoute('comments')){
            return {
                chunkComments: chunk,
                counter: count,
                indexes: indexes
            }
        } else {
            return {
                chunkData: chunk,
                counter: count,
                indexes: indexes
            }

        }
    }

    colorLinks(){
        if(process.env.NODE_ENV === 'production'){
            // don't query on index route
            if(window.location.hash === '#/'){
                return
            } else {
                let hash = window.location.hash
                let elem = document.querySelector(`[href='/hackernews/${hash}']`)
                elem.style.color = "#ffffff"
            }

        }
    }
    updatePageState(state) {
        console.log('update', state)
        let arr
        if(utils.checkRoute('comments')){
            arr = state.fullComments
            let newState = this.paginate(arr)
            // console.log('new', newState.chunkComments)
            this.setState({
                chunkComments: newState.chunkComments,
                counter: newState.counter,
                indexes: newState.indexes
            })
        } else {
            arr = state.fullData
            let newState = this.paginate(arr)
            console.log('new', newState)
            this.setState({
                chunkData: newState,
                counter: newState.counter
            })
        }
    }
	componentDidMount() {
        this.colorLinks()
        // check if comments route
		if (utils.checkRoute('comments')) {
			// get comments and set state
			this.getData("comment")
            // if not comments do this
        } else if(utils.checkRoute('shownew')){
            this.getData("show")
            // console.log('show', this.state)
		} else {
			console.log("not comments")
			this.props.data.then(result => {
					this.setState({
						fullData: result
					}, () => {
                        //paginate data on load
                        let obj = this.paginate(this.state.fullData)
                        // set first 30 to state
                        this.setState({
                            chunkData: obj,
                            counter: obj.counter
                        })
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
        if(utils.checkRoute('comments')){
            // if state is loaded
            if(utils.checkLoaded(this.state.fullComments)){
                return(<div>
                    <this.ShowPageText />
                    {console.log('Render - Comment')}{" "}
                    <Post data={this.state.chunkComments} />{" "}
                    </div>
                )
            } else {
                return(
                        <div> Fetching Comments API Data </div>
                    )
            }
        } else if(utils.checkRoute('shownew')){
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
                    console.log('STATE', this.state)
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
                            this.updatePageState(this.state)
                        }}>More</div>
    				</div>{" "}
                        <Footer links={this.state.footerLinks}/>
                </div>{" "}
			</div>
		);
	}
}
export default Page;
