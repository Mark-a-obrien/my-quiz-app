import { useEffect, useState } from "react";
import Question from "./question";
import Answer from "./answer";

interface Advice {
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



const Quize = () => {

  let numQuestionToFetch = 10; // Number of questions to fetch from api
  const [data, setData] = useState<Advice>({
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
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false);

  // Fetches date from adviceslip api
  async function fetchData() {
    const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestionToFetch}`);
    const quiz = await response.json();

    if (quiz.response_code === 0) {
      setData(() => quiz);
      console.log(quiz);
      return quiz;
    }
  }

  // moves to next question
  const nextQuestion = () => {
    setCorrectAnswer(false);
    
    console.log(questionNum);
    if (questionNum === numQuestionToFetch-1) { // checks if more questions needs to be fetched
      fetchData();
      console.log(questionNum);
    }
    setQuestionNum(questionNum+1);
  }

  // checks if questionNum equals 9 each time it is updated
  useEffect(() => {
    questionNum === numQuestionToFetch-1 && setQuestionNum(0);
  }, [questionNum])


  //  *** Uncomment this when uploading to the master  ***
  // Fetches data from api when the page is initially loaded 
  useEffect(() => {
    data.response_code === "1" && fetchData();
  }, [data])
  

  // when an answer is clicked checks if it is the correct answer
  const handleClick = (event: { target: { classList: { add: (arg0: string) => any } } }, answer:string) => {

    if (answer === data.results[questionNum].correct_answer) {
      setCorrectAnswer(true);
      // setScore(score+1);
      // setCurrentData(currentData+1)
    } else {
      event.target.classList.add("bg-red-500");
    }

  }

  // display category 
  const dispalyCategory = () => {
    return <h3 className="text-xl font-semibold">{formatQuestionText(data.results[questionNum].category)}</h3>
  }

  // display question 
  const displayQuestion= () => {
    return <Question question={formatQuestionText(data.results[questionNum].question)} />
  }

  // displays each answer fetch as a Answer compentent
  const displayAnswers = () => {
    const answers:Array<string> = [...data.results[questionNum].incorrect_answers, data.results[questionNum].correct_answer]
    
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
  
    // console.log(randomizedAnswers);
   
    return randomizedAnswers;
  }

  
  return (

    <section className="quiz flex flex-col justify-center gap-32 items-center text-white">

      {dispalyCategory()}

      <div className="flex flex-col items-center justify-between h-64">
        {displayQuestion()}
        {!correctAnswer ? displayAnswers() : <h1>Well done the correct answer is <strong>{data.results[questionNum].correct_answer}</strong></h1>}
      </div>

      <div className="flex gap-6 ">
        {/* <button onClick={fetchData} className="p-2 bg-blue-600 border-4 border-black rounded-lg hover:bg-opacity-80">Generate quiz</button> */}
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
  return text;
}

export default Quize;
