import React from 'react'
import classes from './quiz.css'
import ActiveQuiz from "../../components/activQuiz/activQuiz";
import FinishedQuiz from "../../components/finishidQuiz/finishidQuiz";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/loader/loader";

class Quiz extends React.Component {
    state = {
        results: [],
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true,
    }

    onAnswerClickHandler = (answerId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'sucsess') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'sucsess'
            }
            this.setState({
                answerState: {[answerId]: 'sucsess'}
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinish()) {
                    this.setState({
                        isFinished: true,
                        results: results
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })
        }

    }

    isQuizFinish() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            results: [],
            isFinished: false,
        })
    }

    async componentDidMount() {
        try {
            const res = await axios.get(`/quizes/${this.props.match.params.id}.json`)

            const quiz = res.data
            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {

        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на вопросы</h1>
                    {
                        this.state.loading ?
                            <Loader/> :

                            this.state.isFinished
                                ? <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    inRetry={this.retryHandler}
                                />
                                : <ActiveQuiz
                                    answers={this.state.quiz[this.state.activeQuestion].answer}
                                    question={this.state.quiz[this.state.activeQuestion].question}
                                    onAnswerClick={this.onAnswerClickHandler}
                                    quizLength={this.state.quiz.length}
                                    answerNamber={this.state.activeQuestion + 1}
                                    state={this.state.answerState}
                                />

                    }

                </div>

            </div>
        )
    }
}

export default Quiz
