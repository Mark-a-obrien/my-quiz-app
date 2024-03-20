import { useEffect, useRef, useState } from "react";
import Question from "./question";
import Answer from "./answer";
import { MouseEvent } from "react";

interface Data {
  response_code: string,
  results: [{
    category:string,
    correct_answer:string,
    difficulty: "easy" | "medium" | "hard",
    incorrect_answers:string[],
    question:string,
    type: "boolean" | "multiple"
  }];
}

type Answer = "correct" | "wrong" |"not answered";

const Quize = ({category, difficulty, questionType, goToMenu}: {category:string, difficulty:string, questionType:string, goToMenu:any}) => {

  let numQuestionToFetch = 10; // Number of questions to fetch from api
  const [data, setData] = useState<Data>({
    response_code: "1",
    results: [{
      category:"dumby data",
      correct_answer:"dumby data",
      difficulty:"easy",
      incorrect_answers:["dumby data", "dumby data", "dumby data"],
      question:"dumby data",
      type:"multiple"
    }]
  });

  const [questionNum, setQuestionNum] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<Answer>("not answered");

  // Fetches date from adviceslip api
  async function fetchData(numQuestionToFetch:number, category:string) {
    const fetchUrl = `https://opentdb.com/api.php?amount=${numQuestionToFetch}${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}${questionType && `&type=${questionType}`}`;
    const response = await fetch(fetchUrl);
    const quiz = await response.json();

    if (quiz.response_code === 0 && response.status === 200) {
      console.log("response_code : ", response.status);
      setData(quiz);
      setQuestionNum( () => 0);
      return quiz;
    }
  }

  // moves to next question
  const nextQuestion = () => {
    setCorrectAnswer("not answered");
      setQuestionNum(() => questionNum+1);
  }

  // checks if questionNum equals numQuestionToFetch-1 each time it is updated
  useEffect(() => {
    console.log(questionNum);

    if (questionNum === numQuestionToFetch-1) {
      fetchData(numQuestionToFetch, category);
    }
  }, [questionNum])


  //  *** Uncomment this when uploading to the master  ***
  // Fetches data from api when the page is initially loaded 
  useEffect(() => {
    console.log(data)
    data.response_code === "1" && fetchData(numQuestionToFetch, category);

    data.response_code === "1" && console.log("fetched");
  }, [data])
  

  // when an answer is clicked checks if it is the correct answer
  const handleClick = (event:MouseEvent, answer:string) => {

    console.log(event.target)
    if (answer === data.results[questionNum].correct_answer) {
      setCorrectAnswer("correct");
    } else {
      setCorrectAnswer("wrong");
      // (event.target as Element).classList.add("bg-red-500"); // changes the background color to blue when clicked
    }

  }

  // display category 
  const dispalyCategory = () => {
    return <h3 className="text-xl font-semibold">{formatQuestionText(data.results[questionNum].category)}</h3>
  }

  // displays difficulty 
  const dispalyDifficulty = () => {
    return <h3 className="text-lg font-semibold text-green-400">{formatQuestionText(data.results[questionNum].difficulty)}</h3>
  }

  // display question 
  const displayQuestion= () => {
    return <Question question={formatQuestionText(data.results[questionNum].question)} />
  }

  // displays each answer fetch as a Answer compentent
  const displayAnswers = () => {
    const answers:Array<string> = [data.results[questionNum].correct_answer, ...data.results[questionNum].incorrect_answers]
    
    return (
      <div className="grid grid-cols-2 gap-6">
        {randomizeAnswerPositions(answers.length, answers)}
      </div>
      )
  }

  // randomizes the answers fetched
  const randomizeAnswerPositions = (amountOfValues:number, answers:Array<string>) => {
    let currentValues:Array<number> = [];
    let randomizedAnswers:Array<React.JSX.Element> = [];
    
    function getRandomInt(max:number) {
      return Math.floor(Math.random() * max);
    }
  
    while (randomizedAnswers.length < amountOfValues) {
        let rand = getRandomInt(amountOfValues);
        if (!currentValues.includes(rand)) {
          currentValues.push(rand);
          const answer = formatQuestionText(answers[rand])
          randomizedAnswers.push(<Answer key={rand} answer={answer} handleClick={handleClick} />);
      }
    }
  
    console.log(answers[0]);
   
    return randomizedAnswers;
  }

  // displays Loading... while fetching data from the api
  const handleLoadingNewData = () => {
    if (questionNum === numQuestionToFetch-1 || data.response_code === "1") return <p>Loading...</p>;



    return (
      <>
      <div>
        {dispalyCategory()}
        {dispalyDifficulty()}
      </div>
      <div className="flex flex-col items-center justify-between h-64">
        {displayQuestion()}
        {correctAnswer === "not answered" ? displayAnswers() // displays the data depending if the user gave the correct answer, wrong answer or hasn't answerd 
        : correctAnswer === "correct" ? <h1 className="text-green-400">Well done the correct answer is <strong>{data.results[questionNum].correct_answer}</strong></h1>
        : <h1 className="text-red-400">Incorrect the correct answer is <strong>{data.results[questionNum].correct_answer}</strong></h1>}
      </div>
      </>
    )
  }


  
  return (
    <section className="quiz flex flex-col justify-between items-center sm:py-10 py-4  h-full text-white">

      {handleLoadingNewData()}

      <div className="flex gap-6">
        <button onClick={goToMenu} className="p-2 bg-blue-600 border-4 border-black rounded-lg hover:bg-opacity-80">Menu</button>
        <button onClick={nextQuestion} className="p-2 bg-orange-700 border-4 border-black rounded-lg hover:bg-opacity-80">Next Question</button>
      </div>
      
    </section>
  )
}

// formats the text provide for question by the api 
const formatQuestionText = (text:string) => {
  text = text
        .replaceAll("&#039;", "'")
        .replaceAll("&quot;", "\"")
        .replaceAll("&eacute;", "É")
        .replaceAll("&amp;", "&")
        .replaceAll("&reg;", "®")
        .replaceAll("&trade;", "™")
        .replaceAll("&oacute;", "Ó")
        .replaceAll("&Aring;", "å")
  return text;
}

export default Quize;
