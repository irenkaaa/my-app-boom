import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Register from './components/register';
import Test from './components/question';
import Home from './views/home';
import Finish from './views/finish';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: "",
      questions: [],
      isLoading: true,
      isLastQ: false,
      questionsIds: [],
      qData: {},
    };
  }

  async componentDidMount() {

    const getInfo = await fetch('https://mocki.io/v1/3acd2047-6bb0-4330-a9bf-844d21c1e6ca');

    const res = await getInfo.json()

    this.setState({
      questions: res,
      isLoading: false,
      questionsIds: res.map(e => e.id)
    })

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmitReg(e, data, props) {
    e.preventDefault();
    localStorage.setItem('username', data.username);
    localStorage.setItem('email', data.email);
    await this.setState({
      username: data.username,
      email: data.email
    });

    toast.success(`Welcome, ${this.state.username}`, { closeButton: false });
    props.history.push('/')
  }



  logout(e,props) {
    try {
      e.preventDefault();
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      this.setState({
        username: '',
        email: '',
      });
      toast.success(`Successful, logout`, { closeButton: false });
    } catch (error) {
      toast.error(`Something is wrong`, { closeButton: false });
    }

    props.history.push('/')
  }

  submitAnswer(data) {
    const nextId = Number(data);
    this.loadData(nextId);
  }

  async loadData(id) {
    const nId = Number(id)
    await this.setState({
      qData: this.state.questions[nId]
    })
  }


  render() {
    return (
      <div className="App">

        <Router>
          <ToastContainer />

          <Switch>

            <Route
              path='/'
              exact
              render={
                (props) =>
                  <Home
                    {...props}
                    username={this.state.username}
                    questions={this.state.questions}
                    questionsIds={this.state.questionsIds}
                    loadData={this.loadData.bind(this)}
                    logout={this.logout.bind(this)}
                  />} />

            <Route
              path='/register'
              render={
                (props) =>
                  <Register
                    {...props}
                    handleSubmitReg={this.handleSubmitReg.bind(this)}
                    handleChange={this.handleChange}
                  />} />



            <Route
              path='/test/:id'
              render={
                (props) =>
                  <Test
                    {...props}
                    questions={this.state.questions}
                    qData={this.state.qData}
                    submitAnswer={this.submitAnswer.bind(this)}
                    handleChange={this.handleChange}
                  />} />


            <Route 
              path='/finish'
              render={
                (props) =>
                <Finish 
                  {...props}
                  username={this.state.username}
                  logout={this.logout.bind(this)}
                />} />

          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
