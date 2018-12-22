import React, {Component} from "react"
import utils from '../utils'

class CommentMarkup extends Component {
    constructor(props) {
		super(props);
		this.state = {
			data: ""
		};
        let that = this
        this.post = props.post.post
        this.index = props.post.index
        this.hostURL = props.post.hostURL
        this.getDiff = props.post.getDiff
        console.log('props', this.props )
	}

    findOriginal(parentID){
        // let parent = post.parent
    //call api on parent
        return utils.getAPI(`https://hacker-news.firebaseio.com/v0/item/${parentID}.json?print=pretty`)
        .then(item => {
            // console.log('item', item)
            // if parent is story done
            if(item.type === 'story'){
                console.log('done')
                return 'some'
            } else {
                // call again with new parent val
                // return 'none'
                this.findOriginal(item.parent)


            }
        })

    }
    componentDidMount(){
        // this.findOriginal(this.post.parent)
    }
    // let origin = findOriginal(post.parent)
    // // setTimeout(function(){
    //     console.log('origin', origin)
    // // },5000)
    render(){
        // if(!this.post){
        //     console.log('nothing')
        //     return
        // }
        console.log(this.post)
        return (
            <div className={`Post ${utils.checkRoute() ? 'comment' : ''}`}>
            <div className="subtext">
            <div className="vote">
            <span><img src="https://news.ycombinator.com/grayarrow2x.gif"/></span>
            </div>
            <span className="age">
            {''}
            <a href={`https://news.ycombinator.com/item?id=${this.post.id}`}>&nbsp;{this.getDiff(this.post.time)}</a>
            </span>
            <span className="parent">
            {''}
            <a href={`https://news.ycombinator.com/item?id=${this.post.parent}`}>parent</a>
            </span>
            <span className="orignal-post">
            {''}
            <a href={`https://news.ycombinator.com/item?id=${this.post.parent}`}>original story</a>

            </span>
            <div className="by">
            {this.post.by}
            </div>

            </div>
            <div className="text-container">
            <div className="title">
            {this.post.text}
            </div>
            </div>
            </div>)
    }
}

export default CommentMarkup
