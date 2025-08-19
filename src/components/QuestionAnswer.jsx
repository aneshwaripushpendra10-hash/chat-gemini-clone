import Answers from "./Answers";

function QuestionAnswer({ item, index }) {
  return (
    <>
      <div key={index} className={item.type == "q" ? "flex justify-end" : ""}>
        {item.type == "q" ? (
          <li
            key={index}
            className="text-right p-2 border-2 border-zinc-700 bg-zinc-600 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit text-white"
          >
            <Answers
              ans={item.text}
              totalResult={1}
              index={index}
              type={item.type}
            />
          </li>
        ) : (
          item.text.map((ansItem, ansIndex) => (
            <li key={ansIndex} className="text-left p-1">
              <Answers
                ans={ansItem}
                totalResult={item.length}
                index={ansIndex}
                type={item.type}
              />
            </li>
          ))
        )}
      </div>
    </>
  );
}
export default QuestionAnswer;
