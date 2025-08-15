import { useState, useEffect } from "react";
import { checkHeading, replaceHeadingStars } from "../helper";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
const Answers = ({ ans, index, totalResult, type }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  //   console.log(index);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    }
  }, []);

  const renderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, "")}
          language="{match[1]}"
          style={dark}
          PreTag="div"
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div>
      {index == 0 && totalResult > 1 ? (
        <span className="pt-5 block text-2xl">{answer}</span>
      ) : heading ? (
        <span className="pt-2 block text-2xl">{answer}</span>
      ) : (
        <span className={type == "q" ? "pl-1" : "pl-5"}>
          <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>{" "}
        </span>
      )}
    </div>
  );
};

export default Answers;
