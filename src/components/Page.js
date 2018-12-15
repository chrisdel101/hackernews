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
	// returns a promise with object
	componentDidMount() {
        // if COMMENTS do this
        if(window.location.pathname === '/comments'){
            console.log('comments')
            this.props.data.then(promisesArr => {
                let newArr = []
                promisesArr.forEach(res => {
                    res.then(comment => {
                        newArr.push(comment)
                    })
                })
                this.setState({
                    data: newArr
                })
                console.log(this.state)
            })
            .catch(e => console.error(`error: ${e}`))
            // for not comment routes do this
        } else {
            console.log('not comments')
                this.props.data.then(result => {
                    this.setState({
                            data: result
                        })
                        console.log(this.state)
                    })
                    .catch(e => console.error(`error: ${e}`))
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
        			<Header Appname="Hacker News" links={
                        [
        					{
                                link:"new",
                                url:"/newest"
                            },
                            {
                                link:"comments",
                                url: "/comments"
                            },
                            {
                                link:"show",
                                url: "/show"
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
        		</div>
            </div>
            {console.log(this.state.data)}
    		<div className="body-container">
    			{
    				this.state.data.length
    					?
    						<Post data={this.state.data}/>

    					: <div>Fetching API Data</div>
    			}
                </div>
		</div>);
	}
}
export default Page;
