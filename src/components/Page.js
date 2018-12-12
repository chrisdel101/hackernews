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
        this.props.data.then(result => {
            this.setState({
                data: result
            })
            console.log(this.state)
        })
        .catch(e => console.error(`error: ${e}`))
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
                                url: "https://news.ycombinator.com/newcomments"
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
