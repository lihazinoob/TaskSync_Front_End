import { Search } from "lucide-react";
import {useState} from "react"
interface SearchBarProjectListProps{
  onSearch:(query:string) => void
}

function SearchBarProjectList({onSearch}:SearchBarProjectListProps) {
  
  // State for taking the input search query
  const [searchQuery,setSearchQuery] = useState("");

  function handleInputChange(event:React.ChangeEvent<HTMLInputElement>)
  {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  }
  
  return (
    <>
      {/* Search Icon */}
      <div>
        <Search className="ml-4"  />
      </div>
      {/* Input Text Area */}
      <div>
        <input
          type="text"
          placeholder="Search Project"
          className="w-full h-10 focus:outline-none placeholder-slate-500  rounded-4xl caret-black"
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}
export default SearchBarProjectList;
