import { useEffect, useState } from "react";
import { toast } from "sonner";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BASEURL } from "../config/axiosConfig";
import { Globe, LoaderCircle, NotebookPen, Search, Trash2 } from "lucide-react";
import { Card } from "./brain-board/card";
import { useDispatch } from "react-redux";
import { toggleState } from "../redux/Slices/contentSlice";
import { Tweet } from "react-tweet";

interface SearchResult {
  _id: string;
  type: string;
  link: string;
  scrapped?: string[];
  text: string;
  timestamp: string;
  publisher?: string;
}



export function AiSearch() {



  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    if (query.trim() === "") {
      toast.error("Please enter a search query");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosPrivate.post(`${BASEURL}/api/v1/query`, { query });
      console.log(response.data.bestMatch);
      if (response.data.status) {

        setResults(response.data.bestMatch);
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
    } finally {
      setLoading(false);
    }
  };
  const [username, setUsername] = useState("");
  useEffect(() => {
    const user = sessionStorage.getItem("username");
    if (user) {
      setUsername(user);
    }

  }, [])



  return (
    <div className=" px-48 mr-20 flex  justify-center gap-2 ">
      <div>
        <div className="bg-gradient-to-b mt-20 md:mt-0 mb-8 from-neutral-800 via-neutral-600 to-neutral-300 bg-clip-text">
          <h1 className="font-normal md:text-6xl tracking-[-0.03em] text-4xl text-transparent">
            Good Evening <span>{username}</span>
          </h1>
        </div>

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
                {loading ? (<div className="animate-spin text-white">
                  <LoaderCircle />
                </div>) : (<Search className="text-white" />)}
              </button>
            </div>
          </form>
        </div>

        <div className="my-6">
          <div className="flex flex-col md:flex-row md:gap-6">
            {loading ? (
              <div className="flex flex-col   justify-start items-center  text-sm pl-2">
                <div className="flex flex-col gap-2  animate-pulse">
                  <div className="w-28 bg-gray-200 h-4 rounded-md"></div>
                  <div className="w-80 bg-gray-200 h-4 rounded-md"></div>
                  <div className="w-96 bg-gray-200 h-4 rounded-md"></div>
                  <div className="w-72 bg-gray-200 h-4 rounded-md"></div>
                  <div className="w-60 bg-gray-200 h-4 rounded-md"></div>
                </div>

                <div className="flex gap-1 animate-pulse items-center pt-2 justify-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <span className="pl-2">Searching through your memories...</span>
                </div>
              </div>
            ) : (
              <>
                {summary && <div className=" border border-zinc-200 px-8 py-2 rounded-3xl leading-relaxed">
                  <div className="flex justify-between">
                    <div className="pb-2 pt-2 text-gray-500 text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      second brain response</div>
                    {/* <div >date</div>  the time when the query was fetched */}
                  </div>

                  {summary}</div>}
              </>
            )}

          </div>
        </div>
      </div>
      {loading ? (<></>) : (<div className="ml-2 mt-24">
        {results && (
          <CardHere {...results} />
        )}
      </div>)}


    </div>
  );
}

interface CardHereProps {
  _id?: string;
  author?: string;
  contentId?: string;
  description?: string;
  imageUrl?: string;
  logoUrl?: string;
  originUrl?: string;
  title?: string;
  url?: string;
  text?: string;
  userId?: string;
  type?: string;
  publisher?: string;
}

interface webCardProps {
  logoUrl: string;
  title: string;
  url: string;
  originUrl: string;
}

function CardHere(results: CardHereProps) {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const handleDelete = async (contentId: String) => {
    try {

      console.log(`Deleting ${contentId}`);
      const response = await axiosPrivate.delete(`${BASEURL}/api/v1/${contentId}`);
      if (response.data.valid) {
        toast.success("Content deleted successfully", {
          action: {
            label: 'close',
            onClick: () => { }
          }
        });
        dispatch(toggleState());
      } else {
        toast.error("Failed to add memory!");
      }
    } catch (error) {

    }
  }


  function populateTweetCard(link: string) {
    const tweetId: string = link.split('/')[5];
    return (
      <div className='light dark:dark react-tweet-theme' >
        <Tweet id={tweetId} />
      </div>
    );
  }

  function populateWebsiteCard({ logoUrl, title, url, originUrl }: webCardProps) {

    return (
      <div className='flex flex-col gap-6 group bg-gray-200 pb-4'>
        <div className='h-28 w-full object-cover rounded-t-2xl shadow-inner'>
          <img
            src={logoUrl}
            className="h-28 w-full object-cover rounded-t-2xl shadow-inner"
            alt="Website Logo"
          />
        </div>
        <div className='px-4 flex flex-col gap-2'>
          <h1 className='text-xl font-semibold'>{title || "Untitled"}</h1>
          <div className='flex justify-between items-center mt-2'>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {originUrl ? originUrl.split('/')[2] : "Unknown Source"}
            </a>
          </div>
        </div>
      </div>
    );
  }

  function populateNoteCard(text: string) {
    return <div className='px-6 py-10 font-normal whitespace-normal break-words overflow-auto'>{text}</div>
  }


  function cardType(type: string | null) {
    if (type === "Youtube" || type === "X") {
      return null;
    }
    if (type === 'Note') {
      return (
        <div className='bg-gray-200 rounded-3xl text-gray-800  px-2 py-1 mt-1'>
          {type === "Note" && (
            <div className='flex items-center gap-1'>
              <NotebookPen className='h-3 w-3' />
              <div className='text-xs '>Note</div>
            </div>
          )}
        </div>
      )
    } else {
      return (

        <div className='bg-gray-200 rounded-3xl text-gray-800  px-2 py-1 mt-1'>


          <div className='flex items-center gap-1'>
            <Globe className='h-3 w-3' />
            <div className='text-xs '>Page</div>
          </div>

        </div>
      );
    }

  }

  return (
    <div>
      <div className={`group relative ${results.type === "Note" ? "bg-green-50 " : "bg-white"} 
        rounded-2xl shadow-md max-w-72   min-w-72 transition-all duration-300 overflow-hidden border-gray-300 border   ` }>
        <div>
          {results.type === undefined ?
            (<div className='absolute top-2 right-2 '>{cardType(String(results.publisher))}</div>)
            : (<div className='absolute top-2 right-2 '>{cardType(String(results.type))}</div>)}

          {results.publisher === "YouTube" && (
            <iframe
              className="w-full"
              src={results.url?.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {results.publisher === "X" && populateTweetCard(String(results.url))}
          {results.publisher !== "X" && results.publisher !== "YouTube" && results.type === undefined &&
            populateWebsiteCard({
              logoUrl: results.logoUrl!,
              title: results.title!,
              url: results.url!,
              originUrl: results.originUrl!
            })
          }
          {results.type === "Note" && populateNoteCard(String(results.text))}

          <div className='absolute bottom-2 right-2 bg-gray-300 p-2 rounded-full cursor-pointer hidden group-hover:block transition-opacity duration-200'
            onClick={() => handleDelete(String(results.contentId))}>
            <Trash2 className='h-3 w-3 text-gray-700' />
          </div>

        </div>
      </div>
    </div>
  )
}