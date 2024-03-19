import DropDown from "./dropDown"

const Menu = ({handleSubmit}: {handleSubmit:Function}) => {

  const categoryOptions = [
    {value:"any", label: "Any Category"},
    {value:"9", label: "General Knowledge"},
    {value:"10", label: "Entertainment: Books"},
    {value:"11", label: "Entertainment: Film"},
    {value:"12", label: "Entertainment: Music"},
    {value:"13", label: "Entertainment: Musicals & Theatres"},
    {value:"14", label: "Entertainment: Television"},
    {value:"15", label: "Entertainment: Video Games"},
    {value:"16", label: "Entertainment: Board Games"},
    {value:"17", label: "Science & Nature"},
    {value:"18", label: "Science: Computers"},
    {value:"19", label: "Science: Mathematics"},
    {value:"20", label: "Mythology"},
    {value:"21", label: "Sports"},
    {value:"22", label: "Geography"},
    {value:"23", label: "History"},
    {value:"24", label: "Politics"},
    {value:"25", label: "Art"},
    {value:"26", label: "Celebrities"},
    {value:"27", label: "Animals"},
    {value:"28", label: "Vehicles"},
    {value:"29", label: "Entertainment: Comics"},
    {value:"30", label: "Science: Gadgets"},
    {value:"31", label: "Entertainment: Japanese Anime & Manga"},
    {value:"32", label: "Entertainment: Cartoon & Animations"},
  ]; 


  const difficultyOptions = [
    {value:"any", label: "Any Difficulty"},
    {value:"easy", label: "Easy"},
    {value:"medium", label: "Medium"},
    {value:"hard", label: "Hard"},
  ]

  const typeoptions = [
    {value:"any", label: "Any Type"},
    {value:"multiple", label: "Multiple Choice"},
    {value:"boolean", label: "True / False"},
  ]


  return (
    <section className="menu flex flex-col justify-center gap-32 items-center text-white">
      <form className="flex flex-col gap-4" method="" onChange={e => handleSubmit(e)}>
        <DropDown options={categoryOptions} label="Choose a Category" name="category"/>
        <DropDown options={difficultyOptions} label="Choose a Difficulty" name="difficulty"/>
        <DropDown options={typeoptions} label="Choose a Type" name="type"/>
      </form>
    </section>
  )
}

export default Menu