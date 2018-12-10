import React, {Component} from 'react'
import Page from './components/Page'
import Router from './components/Router'
import './App.css';

class App extends Component {
	render() {
		return (<div className="App">
			<Router/>
		</div>);
	}
}

export default App;
