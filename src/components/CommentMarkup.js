import React, {Component} from "react"
import utils from '../utils'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

// takes an object with array of data and some functions
class CommentMarkup extends Component {
    constructor(props) {
		super(props);
		this.state = {
			original: ""
		};
        let that = this

        this.index = props.post.index
        this.hostURL = props.post.hostURL
        this.getDiff = props.post.getDiff
        // console.log('props', this.props )
	}
    // goes up the tree until it find parent
    findOriginal(parentID){
    //call api on parent
        return utils.getAPI(`https://hacker-news.firebaseio.com/v0/item/${parentID}.json?print=pretty`)
        .then(item => {
            // if parent is story done
            if(item.type === 'story'){
                this.setState({
                    original: item
                })
                return
            } else {
                // call again with new parent val
                // return 'none'
                this.findOriginal(item.parent)


            }
        })

    }
    componentDidMount(){
        // console.log('parent',this.props.post.post.parent)
        this.findOriginal(this.props.post.post.parent)
    }
    // let origin = findOriginal(post.parent)
    // // setTimeout(function(){
    //     console.log('origin', origin)
    // // },5000)
    slicer(str){
        if(!str){
            return false
        }
        if(str.length >= 30){
            return str.slice(0,30)
        } else {
            return str
        }


    }

    render(){
        // if(!this.post){
        //     console.log('nothing')
        //     return
        // }
        let originalPost = this.state.original.title
        let post = this.props.post.post
        // console.log('post', post)
        return (
            <div className={`Post ${utils.checkRoute('/comments') ? 'comment' : ''}`}>

            <div className="subtext post-child">
                <div className="vote">
                    <span><img src="https://news.ycombinator.com/grayarrow2x.gif"/></span>
                </div>
                <div className="by">
                    {post.by}
                </div>
                <span className="age">
                {''}
                    <a href={`https://news.ycombinator.com/item?id=${post.id}`}>&nbsp;{this.getDiff(post.time)}</a>
                </span>
                <span className="parent">
                {''}
                    <a href={`https://news.ycombinator.com/ q  q item?id=${post.parent}`}>&nbsp;parent</a>
                </span>
                {''}
                <span className="orignal-post">
                {''}
                <a href={this.state.original.url}>&nbsp;on: {this.slicer(this.state.original.title)}</a>

                </span>


            </div>
            <div className="text-container post-child">
            <div className="title">
            {ReactHtmlParser(post.text)}
            </div>
            </div>
            </div>)
    }
}

export default CommentMarkup
