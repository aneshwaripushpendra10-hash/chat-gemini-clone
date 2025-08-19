import { URL } from "./constants";
import { useEffect, useRef, useState } from "react";

import RecentSearch from "./components/RecentSearch";
import QuestionAnswer from "./components/QuestionAnswer";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const [loader, setLoader] = useState(false);

  const scrollToAns = useRef();

  const askQuestion = async () => {
    if (!question.trim() && !selectedHistory) {
      return false;
    }

    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [question, ...history];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

    const payloadData = question ? question : selectedHistory;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: payloadData,
            },
          ],
        },
      ],
    };

    setLoader(true);

    let response = await fetch(URL, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify(payload),
    });
    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text.split("* ");
    dataString = dataString.map((item) => item.trim());
    // console.log("Response:", dataString);
    // setResult([question, dataString]);
    setResult([
      ...result,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: dataString },
    ]);
    setQuestion("");

    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
      // scrollToAns.current({ behavior: "smooth" });
    }, 500);
    setLoader(false);
  };

  const isEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      askQuestion();
    }
  };

  useEffect(() => {
    // console.log("Selected History:", selectedHistory);
    askQuestion();
  }, [selectedHistory]);

  return (
    <div className="grid grid-cols-5 h-screen">
      <RecentSearch
        recentHistory={recentHistory}
        setRecentHistory={setRecentHistory}
        setSelectedHistory={setSelectedHistory}
      />
      {/* //body part */}
      <div className="col-span-4 p-10">
        <h1 className="text-3xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-5">
          Hello User, Ask Me Anything
        </h1>
        {loader ? (
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : null}

        <div
          ref={scrollToAns}
          className="container h-[calc(100vh-200px)] overflow-auto"
        >
          <div>
            <ul>
              {/* {result.map((item, index) => (
                <li
                  className={`p-1 ${
                    item.type === "q" ? "text-blue-500" : "text-black"
                  }`}
                  key={index + Math.random()}
                >
                  {item.type === "q" ? (
                    <span className="font-bold">{item.text}</span>
                  ) : (
                    <Answers
                      ans={item.text}
                      index={index}
                      totalResult={result.length}
                    />
                  )}
                </li>
              ))} */}
              {result.map((item, index) => (
                <QuestionAnswer
                  key={index + Math.random()}
                  item={item}
                  index={index}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-zinc-600 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc=100 text-center flex h-16">
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full h-full p-3 outline-none"
            placeholder="Ask me anything"
            onKeyDown={isEnter}
          />
          <button onClick={askQuestion} className="cursor-pointer">
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
