import React, { Component } from 'react';
import '../css/form.css';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };

    this.handleChange = props.handleChange.bind(this);
  }

  render() {
    const { username, email} = this.state;

    return (
      
        <div className="form-wrapper">
          <h2>Give us some little information</h2>
          <form onSubmit={ (e) => this.props.handleSubmitReg(e, this.state,this.props)} >
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input onChange={this.handleChange} type="text" name="email" id="email" placeholder="Enter e-mail" value={email} />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input onChange={this.handleChange} type="text" name="username" id="username" placeholder="Enter username" value={username} />
            </div>
            <button type="submit">Done!</button>
            
          </form>
        </div>
      


    );
  }
}

export default Register;
