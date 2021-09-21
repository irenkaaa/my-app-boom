import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../css/home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
        }
    }
    componentDidMount() {
        if (this.props.username) {
            this.setState({
                id: this.props.questionsIds[0]
            })

        }
    }

    render() {
        return (
            <main>
                {
                    this.props.username ?
                        (
                            <div className="welcome">
                                <h1>Welcome to TestLand, {this.props.username}!</h1>
                                <p>
                                    <Link to={`/test/${this.state.id}`} onClick={() => this.props.loadData('0')}>Start Test!</Link>
                                </p>
                                <NavLink className='logout' to='/' onClick={(e) => this.props.logout(e, this.state)}>Logout</NavLink>
                            </div>
                        )
                        :
                        (
                            <div className="welcome">
                                <h1>Welcome to TestLand!</h1>
                                <p>
                                    <Link to="/register">Add your Info</Link>
                                </p>
                            </div>
                        )
                }

            </main>
        );
    }
}

export default Home;
