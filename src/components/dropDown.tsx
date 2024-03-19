
const DropDown = ({options}: {options:Array<{value:string, label:string}>}) => {
  return (
    <select className="p-2 bg-blue-600 border-4 border-black rounded-lg" name="" id="">
      {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
    </select>
  )
}

export default DropDown