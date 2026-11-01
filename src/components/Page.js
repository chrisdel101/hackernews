import React, {Component} from "react";
import Post from "./Post";
import Header from "./Header";
import Footer from "./Footer";
import utils from "../utils";

class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
            counter: 0,
			fullData: [],
            chunkData: [],
            fullComments: [],
			chunkComments: [],
            fullShowNew: [],
            chunkShowNew: [],
            stories: [],
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
                },
                {
                    link: "shownew",
                    url: `${process.env.PUBLIC_URL}/#/shownew`
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
    getData(dataToGet, numToGet) {
        utils.getAPI("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty")
        // get single max number
        .then(maxNum => {
            //	 insert ids into URL - get array of promises
            Promise.all(
                Array.from(
                    {
                        length: numToGet || 100
                    },
                    (_, i) => maxNum - i
                    // subtract one from max, get 100 top nums
                ).map(id => {
                    return utils.getStory(id)
                    .then(obj => {
                        // reject nulls here
                        if (obj) {
                            // use func to get comments
                            if(dataToGet === "comment"){
                                // filter out by type
                                if (obj.type === "comment") {
                                    return obj;
                                }
                            } else if(dataToGet === "shownew"){
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
                    this.setState({
                        fullComments: [...comments],
                        chunkComments: [...counterAndChunk.chunkComments],
                        counter: counterAndChunk.counter,
                        indexes:  counterAndChunk.indexes
                    })
                } else if(dataToGet === 'shownew'){
                    items.map((item) => {
                        // filter undefined
                        if(item){
                            // filter out comments
                            if(item.type === 'story'){
                                this.filterShowStories()
                            }
                        }
                    })
                } else {
                    console.error(`Error: fetch type needed`)
                }
            })
        })
    }
    // sorts stories by time - get newest stories
    filterShowStories(){
        utils.getAPI(" https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty")
        .then(stories => {
            Promise.all(
                stories.map(id => {
                    return utils.getStory(id).then(obj => {
                        // reject nulls
                        return obj
                    })
                })
            ).then(stories => {
                stories = stories.sort((a, b) => {
                    return a.time - b.time
                }).reverse()
                let counterAndChunk = this.paginate(stories)
                this.setState(prevState => ({
                    fullShowNew: [...prevState.stories, stories],
                    chunkShowNew: counterAndChunk,
                    counter: counterAndChunk.counter
                }))
            })
        })
    }
    paginate(arr) {
    //increment and get current count
        let count = this.state.counter + 30
        let sliceStart = count - 30
     let sliceEnd = count
        let indexes = utils.range(sliceStart+1, sliceEnd+1, 1)
        let chunk = arr.slice(sliceStart, sliceEnd)
        if(utils.checkRoute('comments')){
            return {
                chunkComments: chunk,
                counter: count,
                indexes: indexes
            }
        } else if(utils.checkRoute('shownew')){
            return {
                chunkShowNew: chunk,
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
        } else if(process.env.NODE_ENV === 'development'){
            if(window.location.hash === '#/'){
                return
            } else {
                let hash = window.location.hash
                let elem = document.querySelector(`[href='/${hash}']`)
                elem.style.color = "#ffffff"
            }
        }
    }
    // show 'shownew' at correct time
    showNewLink(){
        if(utils.checkRoute('shownew')){
            if(process.env.NODE_ENV === 'development'){
                let shownew = document.querySelector(`[href='/#/shownew']`)
                let showParent = shownew.parentElement
                showParent.classList.add('active')
                // add to 'submit' to remove border
                let submit = document.querySelector(`[href='https://news.ycombinator.com/submit']`)
                let submitParent = submit.parentElement
                submitParent.classList.add('active')

            }
        }
    }
    updatePageState(state) {
        if(utils.checkRoute('comments')){
            let arr = state.fullComments
            let newState = this.paginate(arr)
            this.setState({
                chunkComments: newState.chunkComments,
                counter: newState.counter,
                indexes: newState.indexes
            })
        } else if(utils.checkRoute('shownew')){
            let arr = state.fullShowNew
            // if nested arrays, index into
            if(Array.isArray(arr[0])){
                arr = state.fullShowNew[0]
            }
            let newState = this.paginate(arr)
            this.setState({
                chunkShowNew: newState,
                counter: newState.counter
            })
        } else {
            this.loadChunk(state.fullData)
        }
    }
    // LLM fullData holds ids - fetch only the 30 stories on this page
    loadChunk(ids){
        let obj = this.paginate(ids)
        return Promise.all(obj.chunkData.map(id => utils.getStory(id)))
        .then(stories => {
            this.setState({
                // filter out nulls
                chunkData: {...obj, chunkData: stories.filter(story => story)},
                counter: obj.counter
            })
        })
        .catch(e => console.error(`error: ${e}`))
    }
	componentDidMount() {
        this.showNewLink()
        this.colorLinks()
        // check if comments route
		if (utils.checkRoute('comments')) {
			// get comments and set state
			this.getData("comment")
            // if not comments do this
        } else if(utils.checkRoute('shownew')){            // this.getData("shownew")
            this.filterShowStories()
		} else {
			this.props.data.then(result => {
					this.setState({
						fullData: result
					}, () => {
                        // fetch first 30 stories
                        this.loadChunk(this.state.fullData)
                    })
				})
				.catch(e => console.error(`error: ${e}`));
		}
	}
	// render piece of text on show page - to shownew
	ShowPageText() {
		if (utils.checkRoute('show')) {
			return (
				<div className="show-added-text">
					Please read the{" "}
					<a href="https://news.ycombinator.com/showhn.html"> rules</a>. You can
					also browse the{" "}
					<a href={process.env.PUBLIC_URL + "/#/shownew"}>newest</a>{" "}
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
                    <Post data={this.state.chunkComments} />{" "}
                    </div>
                )
            } else {
                return(
                        <div className="loading"> Fetching Comments Data </div>
                    )
            }
        } else if(utils.checkRoute('shownew')){
            if(utils.checkLoaded(this.state.fullShowNew)){
                return(<div>
                    <Post data={this.state.chunkShowNew} />{" "}
                    </div>
                )
            }
        } else {
            if(utils.checkLoaded(this.state.fullData)){
                if(utils.checkLoaded(this.state.chunkData)){
                    return(<div>
                        <this.ShowPageText />
                        {" "}
                        <Post data={this.state.chunkData} />{" "}
                        </div>
                    )
                } else {
                    return(
                        <div className="loading"> Fetching API Data </div>
                    )
                }
            } else {
                return(
                    <div className="loading"> Fetching API Data </div>
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
