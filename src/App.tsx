import { useState } from 'react';
import './App.css';
import Menu from './components/menu';
import Quize from './components/quiz';

function App() {

  const [showQuize, setShowQuize] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [questionType, setQuestionType] = useState<string>("");


  const handleClick = () => {
    setShowQuize(true);
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();

    switch (e.target.name) {
      case "dropdown-difficulty": setDifficulty(e.target.value); break;
      case "dropdown-category": setCategory(e.target.value); break;
      case "dropdown-type": setQuestionType(e.target.value); break;
    }
  }

  return (
    <div className="App bg-gray-800">
      <main className='flex flex-col justify-center items-center gap-4 h-screen text-white'>
        
        {showQuize ? <Quize category={category} difficulty={difficulty} questionType={questionType}/> : <Menu handleSubmit={handleSubmit}/>}

        {!showQuize && <button className='p-2 font-sim bg-green-600 border-4 border-black rounded-lg hover:bg-opacity-80' onClick={handleClick}>Creat Quiz</button>}
      </main>

    </div>
  );
}

export default App;
