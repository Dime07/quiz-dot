import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ButtonPrimary } from "../components/Button"
import { CardMultiple } from "../components/Card"

export default function Quiz() {

    const [questions, setQuestions] = useState([])
    const [currentPosition, setCurrentPosition] = useState(0)
    const [selectedText, setSelectedText] = useState('')
    const [answer, setAnswer] = useState([])
    const [rightAnswer, setRightAnswer] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    const [isQuizDone, setIsQuizDone] = useState(false)
    const [seconds, setSeconds] = useState(60);
    const {state} = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('resume')==='true'){
            const timer = parseInt(localStorage.getItem("lastSecond"))
            if(timer > 0){
                const interval = setInterval(() => setSeconds(timer-1), 1000);
                localStorage.setItem("lastSecond", timer-1);
                return () => clearInterval(interval);
            }else{
                submitAnswer()
            }
        }else{
            if(seconds > 0){
                const interval = setInterval(() => setSeconds(seconds-1), 1000);
                localStorage.setItem("lastSecond", seconds-1);
                return () => clearInterval(interval);
            }else{
                submitAnswer()
            }
        }

    }, [seconds])
    

    useEffect(() => {
        getQuestions();

        const handleTabClose = event => {
            event.preventDefault();
            return (event.returnValue = 'Are you sure you want to exit?', localStorage.setItem('resume', true));
        };
      
        window.addEventListener('beforeunload', handleTabClose);
    
        return () => {
            window.removeEventListener('beforeunload', handleTabClose);
        };
    }, [])

    const getQuestions = () => {
        if(localStorage.getItem('resume') === 'true'){
            const data = localStorage.getItem("dataQuestion")
            const position = localStorage.getItem("currentPosition")
            const answer = localStorage.getItem("answer")
            setQuestions(JSON.parse(data))
            setAnswer(JSON.parse(answer))
            setCurrentPosition(parseInt(position))
        }else{
            const { data} = state
            setQuestions(data)
            localStorage.setItem("dataQuestion", JSON.stringify(data));
        }
    }
    

    const saveSelectedAnswer = (data) => {

        if(currentPosition === questions.length - 1){
            submitAnswer()
        }else{
            setSelectedText(data) 
            const ans = [...answer];
            ans[currentPosition] = data;
            setAnswer(ans);

            localStorage.setItem("currentPosition", currentPosition+1);
            setCurrentPosition(currentPosition+1)
            localStorage.setItem("answer", JSON.stringify(ans));
            setSelectedText(answer[currentPosition+1])
        }
    } 

    const submitAnswer = () => {
        localStorage.removeItem("lastSecond");
        localStorage.removeItem("currentPosition");
        localStorage.removeItem("dataQuestion");
        localStorage.removeItem("answer");
        localStorage.setItem("resume", false);
        let right = 0, wrong = 0
        questions.map((item,index) => {
            console.log(item.answer, answer[index])
            item.answer === answer[index] ? right += 1 : wrong += 1 
        })
        setRightAnswer(right)
        setWrongAnswer(wrong)
        setIsQuizDone(true)
    }

    onbeforeunload

    return (
        <section className="w-2/3 h-screen py-7 grid grid-rows-5 gap-3 mx-auto">
            <div className="row-span-2 w-full flex justify-between flex-col rounded-lg p-10 shadow-md mx-auto bg-white">
                <div className="flex justify-between">
                    <p className='text-2xl text-blue-600 font-semibold'>
                        Question {currentPosition + 1}
                    </p>
                    <p className='text-2xl text-blue-600 font-semibold'>
                        {seconds} Second
                    </p>
                </div>
                <p dangerouslySetInnerHTML={{ __html: questions[currentPosition]?.question }} className="text-2xl font-semibold text-center">
                </p>
                <p className="text-center text-gray-400">
                    After select the answer, you can't go back to the question so please answer carefully
                </p>
            </div>
            {isQuizDone ?
                (
                    <div className='row-span-3 flex flex-col gap-5 justify-center items-center bg-white p-5'>
                        <p className="text-xl font-semibold">
                            {seconds > 0 ?
                                (
                                    <>
                                        Congrats you have done your quiz, this is your result
                                    </>
                                ) :
                                (
                                    <>
                                        Time is up !!
                                    </>
                                )
                            }
                        </p>
                        <p className='text-xl text-blue-600 font-semibold'>
                            You have answered {answer.length + 1} questions with results
                        </p>
                        <p className='text-xl text-green-600 font-semibold'>
                            {rightAnswer} Question answered right ✅
                        </p>
                        <p className='text-xl text-red-600 font-semibold'>
                            {wrongAnswer} Question answered wrong ❌
                        </p>
                        <div className="mt-2">
                            <ButtonPrimary text="Back to home" click={() => navigate('/')} />
                        </div>
                    </div>
                ) :
                (
                    <div className=' row-span-3 flex flex-col gap-5 justify-center items-center bg-white p-5'>
                        {questions[currentPosition]?.choice.map((item, index) => (
                            <div key={index} className="w-full">
                                <CardMultiple text={item} answer={(data) => saveSelectedAnswer(data)} selected={selectedText} />
                            </div>
                        ))}
                    </div>
                )
            }
        </section>
    )
}
