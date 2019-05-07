import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      username: '',
      user: '',
      data: []
    }

    this.getData = this.getData.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    axios.get('/data').then(res => this.setState({data: res.data}));
  }

  async getData() {
    let result = await axios.get(`/data?buzzword=${this.state.search}`).then(res => res.data);
    this.setState({data: result, search: ''});
  }

  async login() {
    let {username} = this.state;
    await axios.post('/login', {username}).then(res => res.data);
    await this.setState({user: username});
    this.setState({username: ''});
    this.getData();
  }

  render() {
    let info = this.state.data.map(data => {
      return (
          <div className='info-node' key={data.id}>
            <img src={data.avatar} alt='avatar' className='avatar'/>
            <p className='username' style={{color: `${data.color}`}}>{data.username}</p>
            <p className='content'>{data.content}</p>
            <p className='buzzword'>{data.buzzword}</p>
          </div>
      )
    })
    return (
      <div className="App">
      <div className='container'>
      <div className='login'>
        {(this.state.user !== '') ? <p>Welcome, {this.state.user}.</p> : <p>Please Log In</p>}
        <div>
          <input className='logininput' value={this.state.username} placeholder='username' onChange={(e) => this.setState({username: e.target.value})}/>
          <button className='searchbutton' onClick={() => this.login()}>Login</button>
        </div>
      </div>
        <div className='searchbar'>
            <input className='searchinput' value={this.state.search} placeholder='search for a buzzword' onChange={(e) => this.setState({search: e.target.value})}/>
            <button className='searchbutton' onClick={() => this.getData()}>Search</button>
        </div>
        {info}
      </div>
  
      </div>
    );
  }


}
