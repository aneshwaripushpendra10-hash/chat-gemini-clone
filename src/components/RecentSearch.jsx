function RecentSearch({
  recentHistory,
  setRecentHistory,
  setSelectedHistory,
  startNewChat,
}) {
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  const clearSelectedHistory = (selectedItem) => {
    let history = JSON.parse(localStorage.getItem("history"));
    history = history.filter((item) => {
      if (item !== selectedItem) {
        return item;
      }
    });
    setRecentHistory(history);
    localStorage.setItem("history", JSON.stringify(history));
  };
  return (
    <>
      <div className="col-span-1 bg-zinc-600 h-screen text-center overflow-auto">
        <h1 className="text-xl text-white p-2 flex justify-center text-center">
          <span>Recent Searches</span>
          <button
            className="rgba(255, 255, 255, 0.6) ml-2 cursor-pointer"
            onClick={clearHistory}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>

          <button
            className="rgba(255, 255, 255, 0.6) ml-2 cursor-pointer"
            onClick={startNewChat}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M120-160v-600q0-33 23.5-56.5T200-840h480q33 0 56.5 23.5T760-760v203q-10-2-20-2.5t-20-.5q-10 0-20 .5t-20 2.5v-203H200v400h283q-2 10-2.5 20t-.5 20q0 10 .5 20t2.5 20H240L120-160Zm160-440h320v-80H280v80Zm0 160h200v-80H280v80Zm400 280v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM200-360v-400 400Z" />
            </svg>
          </button>
        </h1>
        <ul className="text-left overflow-auto ">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <div
                className="flex justify-between pr-3 py-1"
                key={`${item}-${index}`}
              >
                <li
                  onClick={() => setSelectedHistory(item)}
                  className="w-full p-1 pl-5 px-5 text-white/90 cursor-pointer hover:bg-zinc-700 hover:text-white truncate"
                >
                  {item}
                </li>
                <button
                  className="text-white ml-2 cursor-pointer"
                  onClick={() => clearSelectedHistory(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                  </svg>
                </button>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
}

export default RecentSearch;
