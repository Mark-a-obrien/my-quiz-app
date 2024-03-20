

const Answer =  ({ answer, handleClick}: {answer:string, handleClick:any}) => {

  return (
    <button onClick={(e) => handleClick(e, answer)} className="p-2 min-w-40 min-h-10 bg-green-600 border-4 border-black rounded-lg hover:bg-opacity-80">{answer}</button>
  )
}

export default Answer