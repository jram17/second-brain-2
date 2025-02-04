import { useState } from "react";
import { toast } from "sonner";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BASEURL } from "../config/axiosConfig";
import { Search } from "lucide-react";
import { Card } from "./brain-board/card";

export function AiSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");
  const [summary, setSummary] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    if (query.trim() === "") {
      toast.error("Please enter a search query");
      return;
    }

    try {
      const response = await axiosPrivate.post(`${BASEURL}/api/v1/query`, { query });

      if (response.data.status) {
        setResults(response.data.bestmatch);
        setSummary(response.data.summary);
        toast.success("Search results found", {
          action: {
            label: "Close",
            onClick: () => { }
          }
        });
      }
    } catch (error) {
      toast.error("Error fetching search results");
      console.error(error);
    }
  };

  const getType=()=>{
    if( !results?.publiser.toLowerCase().conatins("youtube || x || twitter")){
      return "Website";
    }else{
      return results.publisher
    }
  }

  return (
    <div className="border border-gray-200 px-48 mr-20 flex  justify-center gap-2">
      {/* Greeting */}
      <div>
        <div className="bg-gradient-to-b mt-20 md:mt-0 mb-8 from-neutral-800 via-neutral-600 to-neutral-300 bg-clip-text">
          <h1 className="font-normal md:text-6xl tracking-[-0.03em] text-4xl text-transparent">
            Good Evening <span>jaavy</span>
          </h1>
        </div>

        {/* Search Box */}
        <div className="flex flex-col lg:flex-row lg:gap-8 gap-4 w-full">
          <form
            onSubmit={handleQuery}
            className="flex flex-col group relative rounded-3xl shadow-md p-4 bg-white bg-opacity-60 dark:bg-opacity-90 border border-neutral-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 w-full"
          >
            <textarea
              placeholder="Ask your memories..."
              className="p-0 resize-none flex-grow outline-none bg-transparent text-gray-900 dark:text-gray-100 font-semibold text-2xl placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200 focus:ring-0"
              rows={4}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex gap-4 justify-end">
              <button
                type="submit"
                className="self-center rounded-full p-3 bg-neutral-800 border disabled:opacity-50 hover:bg-neutral-700 transition-colors"
              >
                <Search className="text-white" />
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="my-6">
          <div className="flex flex-col md:flex-row md:gap-6">
            <div className=" border border-zinc-200 px-8 py-2 rounded-3xl leading-relaxed">{summary}</div></div>
        </div>
      </div>
      (results && <div><Card contentId={"unknown"}
        type={ getType}
        link={results.}
        scrapped={scrapped}
        text={text}
        timestamp={timestamp} />
      </div>)
    </div>
  );
}
