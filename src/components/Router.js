import React from 'react'
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"
import Page from './Page'
import utils from '../utils'

// "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
// const routes = [
//     {
//         path:'/',
//         component: Page,
//         fetchData: utils.fetchData("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
//     },
//     {
//         path:'/new',
//         component: Page,
//         fetchData: utils.fetchData("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
//     },
//     {
//         path:'/show',
//         component: Page,
//         fetchData: utils.fetchData("https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty")
//     }

// ]
function one(){
    console.log('one')
}
function two(){
    console.log('two')

}
function three(){
    console.log('three')

}
function Router(){
    {/*
        <BrowserRouter>
        <Switch>
        <Route path="/" render={() => <Page data={utils.fetchData("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")} />} />
        <Route path="/newest" render={(props) => <Page data={console.log('new')} {...props} />} />
        <Route path="/show" render={() => <Page data={console.log('show')} />} />
        </Switch>
        </BrowserRouter>
        */}
    return(
        <BrowserRouter>
        <div>
        <Route exact path="/" component={() => <Page data={utils.fetchData("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")} />}/>
        <Route path="/newest" component={() => <Page data={utils.fetchData("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")} />}/>
        <Route path="/best" component={() => <Page data={utils.fetchData("https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty")} />}/>
        </div>
        </BrowserRouter>
    )
}

export default Router



// <Route path="/newest" component={Newest}/>
// <Route path="/show"   component={Show}/>
// <Route path="/ask"    component={Ask}/>
// <Route path="/job"    component={Job}/>
