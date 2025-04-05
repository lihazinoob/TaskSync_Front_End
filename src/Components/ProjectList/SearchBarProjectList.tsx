import { Search } from "lucide-react";


function SearchBarProjectList() {
  return (
    <>
     {/* Search Icon */}
      <div>
        <Search className="ml-4" />
      </div>
      {/* Input Text Area */}
      <div>
        <input
          type="text"
          placeholder="Search Project"
          className="w-full h-10 focus:outline-none placeholder-slate-500  rounded-4xl caret-black"
        />
      </div>
    </>
  );
}
export default SearchBarProjectList;
