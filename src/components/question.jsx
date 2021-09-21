import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/question.css';
import '../css/animations.css';


class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLast: false,
            qId: Number(this.props.match.params.id),
            isRightAnswer: '',
            chosenEl: '',
        }
    }

    isLast(){
        const arrLenght = this.props.questions.length;
        const idUrl = Number(this.props.match.params.id)

        if (idUrl < arrLenght) {
            this.setState({
                isRightAnswer: this.props.questions[this.state.qId - 1].success,
            })
        } else {
            this.setState({
                isLast: true
            })
        }
    }



    toggleClass(id) {

        this.isLast()

        const answer = document.getElementById(id);
        answer.classList.add('toggled');
        this.setState({
            chosenEl: answer.id
        })
        setTimeout(() => {
            if (this.state.chosenEl === this.state.isRightAnswer) {
                document.getElementById(id).classList.toggle('success');
            } else {
                document.getElementById(id).classList.toggle('error');
            }
        }, 300);
        document.getElementById('btnSubmit').hidden = false;
        document.getElementsByClassName('container')[0].classList.remove('animation')

    }

    unToggle() {
        const element = document.getElementById(this.state.chosenEl);
        document.getElementById(element.id).classList.remove('toggled')


        if (document.getElementById(element.id).classList.contains('success')) {
            document.getElementById(element.id).classList.remove('success')
        } else {
            (document.getElementById(element.id).classList.remove('error'))
        }

        document.getElementById('btnSubmit').hidden = true;

        document.getElementsByClassName('container')[0].classList.add('animation')
    }

    render() {

        const { question, additional, answers } = this.props.qData;


        return (

            <div className="container">
                <h1 className='question'>{question}</h1>
                <div className='codeQ'>
                    <pre>
                        <code>{additional}</code>
                    </pre>
                </div>


                <div className='answers'>
                    <button id='a' onClick={() => this.toggleClass('a')}>
                        <code>{answers.a}</code>
                    </button>
                    <button id='b' onClick={() => this.toggleClass('b')}>
                        <code>{answers.b}</code>
                    </button>
                </div>

                {
                    this.state.isLast ?
                        (
                            <Link hidden id='btnSubmit'
                                to={`/finish`}
                                type='submit'
                                
                            >Finish
                            </Link>
                        )
                        :
                        (
                            <Link hidden id='btnSubmit'
                                to={`/test/${this.state.qId + 1}`}
                                type='submit'
                                onClick={
                                    async () => {
                                        await this.props.submitAnswer(this.state.qId);
                                        await this.unToggle()
                                        await this.setState({
                                            isRightAnswer: '',
                                            chosenEl: '',
                                            qId: Number(this.props.match.params.id)+1,
                                        })
                                    }
                                }
                            >Next Question
                            </Link>
                        )
                }

            </div>
        );
    }
}

export default Test;