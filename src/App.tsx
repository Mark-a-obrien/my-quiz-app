import { useState } from 'react';
import './App.css';
import Menu from './components/menu';
import Quize from './components/quiz';

function App() {

  const [showQuize, setShowQuize] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

  const handleClick = () => {
    setShowQuize(true);
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setCategory(e.target.value);
  }

  return (
    <div className="App bg-gray-800">
      <main className='flex justify-center h-screen'>
        
        {showQuize ? <Quize category={category}/> : <Menu handleSubmit={handleSubmit}/>}

        <button onClick={handleClick}>Click me!</button>
      </main>

    </div>
  );
}

export default App;
