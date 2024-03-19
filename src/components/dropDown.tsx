
const DropDown = ({options, label, name}: {options:Array<{value:string, label:string}>, label:string, name:string}) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
    <label htmlFor="dropdown">{label}</label>
    <select className="p-2 w-full bg-blue-600 border-4 border-black rounded-lg" name={"dropdown-"+name} id="">
      {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
    </select>
    </div>
  )
}

export default DropDown