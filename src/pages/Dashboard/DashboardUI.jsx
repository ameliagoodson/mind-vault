import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Flashcard from "../Study/Flashcard";
import { callOpenAI } from "../../api/CallOpenAI";

const DashboardUI = () => {
  const { user } = useAuth(); // Get logged-in user
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [shouldReset, setShouldReset] = useState();

  const handleAPIRequest = async () => {
    try {
      const result = await callOpenAI(query);
      setResponse(result);
    } catch (error) {
      console.log("Error " + error);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResponse("");
    setShouldReset(true);
  };

  return (
    <div className="m-auto max-w-4xl">
      <div className="dashboard-intro">
        <h1>Dashboard</h1>
        <h2 className="text-h4">Hi {user.email}</h2>
      </div>
      <div className="interface-wrapper">
        <div className="interface mt-18 gap-8 md:flex">
          <div className="flex-col justify-center md:w-1/2">
            {/* CHAT */}
            <textarea
              className="text-area min-h-60"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What do you want to ask ChatGPT to turn into a flashcard?"></textarea>
            <button onClick={() => handleClear()} className="btn-primary">
              Clear
            </button>
            <button
              onClick={handleAPIRequest}
              className="btn-primary mx-auto block w-fit">
              Submit
            </button>
          </div>
          <div className="md:w-1/2">
            <Flashcard
              query={query}
              setQuery={setQuery}
              response={response}
              setResponse={setResponse}
              type="preview"
              shouldReset={shouldReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUI;
