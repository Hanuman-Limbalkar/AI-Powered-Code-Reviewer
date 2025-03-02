import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function MainPage() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state

  useEffect(() => {
    prism.highlightAll();
  }, [code, review]); // Highlight updates when code or review changes

  async function reviewCode() {
    setIsLoading(true); // Show loader
    try {
      const response = await axios.post("https://ai-powered-code-reviewer-fmua.onrender.com/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      setReview("❌ Error: Unable to fetch review. Please try again.");
    }
    setIsLoading(false); // Hide loader
  }

  return (
    <main>
      {/* Left Section */}
      <div className="left">
        <h2>🚀 Welcome to Code Reviewer! Enter your code below and get instant feedback.</h2>
        <div className="code">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <button onClick={reviewCode} className="review">Review</button>
      </div>

      {/* Right Section */}
      <div className="right">
        {isLoading ? (
          <div className="loader"></div> // Show loader while processing
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        )}
      </div>
    </main>
  );
}

export default MainPage;
