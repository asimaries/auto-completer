import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const [showLastSearchs, setShowLastSearchs] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      getSuggestions();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSuggestions = async () => {
    console.log(`API CALL ${searchQuery}`);
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_API}/autocomplete?q=${searchQuery}`
    );
    setSuggestions(data.Completions);
    console.log(data.Completions);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-7xl font-bold ">NLP Mini Project</h1>
      <h2 className="text-3xl font-bold ">AI-Powered Autocompleter</h2>
      <div className=" h-10 flex flex-col">
        <div className="flex">
          <input
            className="h-14 w-full text-xl px-4 bg-inherit border rounded-full"
            value={searchQuery}
            ref={inputRef}
            type="text"
            placeholder="Search"
            onChange={handleChange}
            // onFocus={() => setShowLastSearchs(true)}
            // onBlur={unLoadLastSearchs}
          />
        </div>
        <div>
          <div className=" bg-neutral-800  rounded-xl shadow-neutral-900 shadow-md w-full  ">
            <div className="flex flex-col">
              {suggestions.map((ele) => (
                <div key={ele} className="px-3 py-1">
                  {ele}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
