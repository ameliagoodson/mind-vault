import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeEditor = ({ value, onChange, language = "javascript" }) => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="code-editor-container relative">
      {showEditor ? (
        <textarea
          className="textarea min-h-[150px] w-full bg-gray-900 p-4 font-mono text-gray-100"
          value={value}
          onChange={(e) => onChange(e)}
          onBlur={() => setShowEditor(false)}
          autoFocus
        />
      ) : (
        <div onClick={() => setShowEditor(true)} className="cursor-text">
          <SyntaxHighlighter
            language={language}
            style={nightOwl}
            customStyle={{ minHeight: "150px" }}>
            {value || "// Click to add code"}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};
export default CodeEditor;
