
const DropDown = ({options, label}: {options:Array<{value:string, label:string}>, label:string}) => {
  return (
    <div className="flex flex-col items-start gap-2">
    <label htmlFor="dropdown">{label}</label>
    <select className="p-2 bg-blue-600 border-4 border-black rounded-lg" name={"dropdown-" + label} id="">
      {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
    </select>
    </div>
  )
}

export default DropDown