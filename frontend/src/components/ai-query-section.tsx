import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BASEURL } from "../config/axiosConfig";

export function AiSearch() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate(); // ✅ Move hook call to the top level

  async function fetchAiResult() {
    if (!search.trim()) return;
    setLoading(true);
    setError(null);
    console.log("searching....")
    try {
      const response = await axiosPrivate.post(`${BASEURL}/api/v1/query`, {
        query: search,
      });

      setResult(response.data);
    } catch (err) {
      console.error("Error fetching AI result:", err);
    //   setError("Failed to fetch AI results. Please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-md mx-auto">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter your query..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={fetchAiResult}
        disabled={loading}
        className="mt-2 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <h3 className="font-bold">AI Response:</h3>
          <p>{JSON.stringify(result, null, 2)}</p>
        </div>
      )}
    </div>
  );
}
