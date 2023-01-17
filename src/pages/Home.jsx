import React from 'react'
import { ButtonPrimary, ButtonSecondary } from '../components/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { CardMultiple } from '../components/Card'
import { useNavigate } from 'react-router-dom'

export default function Home() {

    const [questions, setQuestions] = useState([])
    const [second, setSecond] = useState(60);

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("resume") === 'true'){
            navigate('/quiz')
        }else{
            getQuestion();
            localStorage.setItem("resume", false)
        }
    }, [])


    const getQuestion = () => {
        axios
            .get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy')
            .then((res) => {
                if(res.status === 200){
                    const data = res.data.results;
                    let arr = []
                    data.map((item) => {
                        const {question, incorrect_answers, correct_answer, type} = item
                        let questionData = {
                            type: type,
                            question : question,
                            choice: shuffle([...incorrect_answers, correct_answer]),
                            answer: correct_answer
                        }
                        arr.push(questionData)
                    })
                    setQuestions(arr)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }


  return (
    <section className='w-2/3 h-screen py-7 grid grid-rows-2 gap-3 mx-auto'>
        <div className=' row-span-1 w-full flex justify-between flex-col rounded-lg p-10 shadow-md mx-auto bg-white'>
            <div>
                <p className='text-3xl font-bold mb-1'>
                    Welcome to Quiz | DOT, Are you ready to take the quiz? 😊 
                </p>
                <p className='text-gray-400'>
                    Click button start below to start quiz
                </p>
            </div>
            <div className='flex justify-between mt-4 mb-2'>
                <p className='text-xl text-blue-600 font-semibold'>
                    {questions.length} Question
                </p>
                <p className='text-xl text-blue-600 font-semibold'>
                    {second} Second
                </p>
            </div>
            <ButtonPrimary text="Start Quiz" click={() => navigate('/quiz', {state : {data : questions}})}/>   
            <div className='mt-4'>
                <ButtonSecondary text="Logout" click={() => {localStorage.removeItem('token'), window.location.reload(false)} }/>    
            </div> 
        </div>
    </section>
  )
}
