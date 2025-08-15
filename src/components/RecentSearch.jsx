function RecentSearch({ recentHistory, setRecentHistory, setSelectedHistory }) {
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
      <div className="col-span-1 bg-zinc-600 h-screen text-center">
        <h1 className="text-xl text-white p-2 flex justify-center text-center">
          <span>Recent Searches</span>
          <button
            className="text-white ml-2 cursor-pointer"
            onClick={clearHistory}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
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
                  className="w-full p-1 pl-5 px-5 text-amber-50 cursor-pointer hover:bg-zinc-700 hover:text-amber-100 truncate"
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
                    fill="#1f1f1f"
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
