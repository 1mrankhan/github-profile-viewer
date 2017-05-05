import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';
// import RepoList from './github/RepoList.jsx';

class App extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username: 'ikhan',
			userData: [],
			userRepos: [],
			perPage: 10
		}
	}

	//get user data from GitHub

	getUserData(){
		$.ajax({
			url: 'https://api.github.com/users/' + this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userData: data})				
			}.bind(this),
			error: function(xhr, status, err){
				this.setState({username: null})
				console.log(err)
			}.bind(this)		
		});		
	}
	
	//get user repos

	getUserRepos(){
		$.ajax({
			url: 'https://api.github.com/users/' + this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userRepos: data})				
			}.bind(this),
			error: function(xhr, status, err){
				this.setState({username: null})
				console.log(err)
			}.bind(this)		
		});		
	}

	handleFormSubmit(username){
		this.setState({username:username},function(){
			this.getUserData();
			this.getUserRepos();
		});
	}

	componentDidMount(){
		this.getUserData();
		this.getUserRepos();
	}

	render(){
		return(
			<div>
			 	<Search  onFormSubmit = { this.handleFormSubmit.bind(this) }/>
				<Profile {...this.state} />
			</div>
		)
	}
}

App.propTypes = {
	clientId: React.PropTypes.string,
	clientSecret: React.PropTypes.string	
};

App.defaultProps = {
	clientId: '',
	clientSecret: ''
}

export default App
