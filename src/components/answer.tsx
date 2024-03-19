

const Answer =  ({ answer, handleClick}: {answer:string, handleClick:any}) => {

  return (
    <button onClick={(e) => handleClick(e, answer)} className="p-2 min-w-40 min-h-10 bg-green-600 border-4 border-black rounded-lg hover:bg-opacity-80">{answer}</button>
  )
}

export default Answer




// import { forwardRef } from "react"
// interface ChildProps {
//   answer:string, 
//   handleClick:any
// }




// const Answer =  forwardRef<HTMLDivElement, ChildProps>(({answer, handleClick}, ref) => {

//   const handleClick2 = () => {
//     console.log("BOOOOOOOOOM", ref);
//   }

//   console.log(ref)
//   return (
//     <button  onClick={(e) => handleClick2(  )} className="p-2 min-w-40 min-h-10 bg-green-600 border-4 border-black rounded-lg hover:bg-opacity-80">{answer}</button>
//   )
// })

// export default Answer