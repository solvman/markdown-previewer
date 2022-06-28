import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkBreaks from "remark-breaks";
import initialString from "./data";

function App() {
  const [text, setText] = useState(initialString);

  const MarkdownComponents = {
    code({
      node,
      inline,
      className = "language-javascript",
      children,
      ...props
    }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={materialLight}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="App">
      <header>Markdown Previewer</header>
      <main>
        <textarea
          id="editor"
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea>
        <div id="preview">
          <ReactMarkdown
            children={text}
            components={MarkdownComponents}
            remarkPlugins={[remarkBreaks]}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
