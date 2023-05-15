import { Editor } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useParams } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import LanguageSelectDropDown from "./languageSelectDropDown";
import "./codeEditor.css";
const CodeEditor = () => {
  const socket = useSocket("http://localhost:4000");
  const { id } = useParams<{ id: string }>();
  const [code, setCode] = useState<string | undefined>("");
  const [language, setLanguage] = useState("JavaScript");
  const languages = ["JavaScript", "Python", "Java", "C++", "Ruby"];
  const handleOnChange = (value: string | undefined) => {
    socket?.emit("code-change", value);
  };

  useEffect(() => {
    socket?.on("receive-change", (value: string) => {
      setCode(value);
    });
  }, [socket]);

  useEffect(() => {
    socket?.emit("join-room", id);
  }, [socket, id]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);

    socket?.emit("language-change", newLanguage);
  };
  return (
    <>
      <nav
        className={`m-5 border-2 rounded-3xl ${
          isDarkMode
            ? "bg-[#1E1E1E]  border-white"
            : "bg-white border-[#c6c6c6ab]"
        }`}
      >
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-between  ">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-white text-2xl font-bold ml-10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
                  CodeStream
                </span>
              </h1>
            </div>
            <div className="mr-10 flex ">
              <LanguageSelectDropDown
                options={languages}
                selectedLanguage={language}
                onLanguageChange={handleLanguageChange}
              />
              <button className="mr-5 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
                Share this editor
              </button>
              <button
                className={`toggler  ${isDarkMode ? "dark" : "light"}`}
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <FiSun /> : <FiMoon />}
                <span className="ml-2">
                  {isDarkMode ? "Light mode" : "Dark mode"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-screen  flex flex-col bg-gray-800 text-gray-200">
        <div className="flex-1 overflow-y-auto">
          <Editor
            height="100%"
            defaultLanguage={language.toLowerCase()}
            value={code}
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            onChange={handleOnChange}
            options={{
              automaticLayout: true,
              scrollbar: {
                useShadows: false,
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
              fontSize: 20,
              cursorBlinking: "smooth",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
