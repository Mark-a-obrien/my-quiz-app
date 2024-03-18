import { useState } from "react";
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

  const [data, setData] = useState<Advice>({
    response_code: "0",
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
  async function getAdvice() {
    const response = await fetch(`https://opentdb.com/api.php?amount=10`);
    const advice = await response.json();

    if (advice.response_code === 0) {
      setData(advice);
      console.log(advice)
    }
    console.log(data.results[0].question)
  }

  // moves to next question
  const nextQuestion = () => {
    setCorrectAnswer(false);
    setQuestionNum(questionNum+1);
  }

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

  // display question 
  const displayQuestion= () => {
    return formatQuestionText(data.results[questionNum].question);
  }

  // displays each answer fetch as a Answer compentent
  const displayAnswers = () => {
    const answers:Array<string> = [...data.results[questionNum].incorrect_answers, data.results[questionNum].correct_answer]
    
    return (
      <div className="grid grid-cols-2 gap-2">
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
          randomizedAnswers.push(<Answer key={rand} answer={answers[rand]} handleClick={handleClick} />);
      }
    }
  
    console.log(randomizedAnswers);
   
    return randomizedAnswers;
  }


  return (

    <section className="quiz flex flex-col items-center text-white">
      <button onClick={getAdvice} className="p-2 bg-blue-600 rounded-lg hover:opacity-80">Generate quiz</button>

      {displayQuestion()}

      {!correctAnswer ? displayAnswers() : <h1>Well done the correct answer is <strong>{data.results[questionNum].correct_answer}</strong></h1>}

      <button onClick={nextQuestion} className="p-2 bg-orange-700 rounded-lg hover:opacity-80">Next Question</button>
    </section>
  )
}

// formats the text provide for question by the api 
const formatQuestionText = (text:string) => {
  text = text
        .replaceAll("&#039;", "'")
        .replaceAll("&quot;", "\"");
  return text;
}

export default Quize;
