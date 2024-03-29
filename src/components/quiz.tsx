import { useEffect, useState } from "react";
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

if (!Boolean(document.cookie)) document.cookie = "highScore=0; SameSite=None; Secure"; // Creates highScore cookie if it is not already created

const getHighScoreCookie = () => {
  let num = parseInt(document.cookie.split("=")[1]);
  return num;
}

const setHighScoreCookie = (score:number) => {
  document.cookie = `highScore=${score}; SameSite=None; Secure`;
}

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
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(getHighScoreCookie());


  // Fetches date from adviceslip api
  async function fetchData(numQuestionToFetch:number, category:string) {
    const fetchUrl = `https://opentdb.com/api.php?amount=${numQuestionToFetch}${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}${questionType && `&type=${questionType}`}`;
    const response = await fetch(fetchUrl);
    const quiz = await response.json();

    // if the data is fetched successfully the data will be displayed
    if (quiz.response_code === 0 && response.status === 200) {
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

  // If the user has gotten to last loaded question it will fetch new data
  useEffect(() => {
    if (questionNum === numQuestionToFetch-1) {
      fetchData(numQuestionToFetch, category);
    }
  }, [questionNum])


  // Fetches data from api when the page is initially loaded 
  useEffect(() => {
    data.response_code === "1" && fetchData(numQuestionToFetch, category);
  }, [data])
  

  useEffect(() => {
    if (score > highScore) {
      setHighScoreCookie(score);
      setHighScore(() => score);
    }
    getHighScoreCookie();
  }, [score])
  

  // when an answer is clicked checks if it is the correct answer
  const handleClick = (event:MouseEvent, answer:string) => {
    
    if (answer === data.results[questionNum].correct_answer) {
      setCorrectAnswer("correct");
      setScore(() => score + 1);
    } else {
      setCorrectAnswer("wrong");
      // (event.target as Element).classList.add("bg-red-500"); // changes the background color to blue when clicked
    }

  }

  // display category 
  const dispalyCategory = () => {
    return <h3 className="text-xl font-semibold">{formatQuestionText(data.results[questionNum].category)}</h3>
  }

  // display score 
  const displayScore = () => {
    return <h3 className="text-base font-semibold">Score: {score} | Highscore: {highScore}</h3>
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

  // Randomizes the order of answers fetched
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
  
    console.log("Answer : ", answers[0]);
   
    return randomizedAnswers;
  }

  // displays Loading... while fetching data from the api
  const handleLoadingNewData = () => {
    if (questionNum === numQuestionToFetch-1 || data.response_code === "1") return <p>Loading...</p>;

    return (
      <>
      <div>
        {dispalyCategory()}
        {displayScore()}
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
