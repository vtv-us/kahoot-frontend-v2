/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from "react";

const SlideContext = createContext();
function SlideProvider(props) {
  const [meta, setMeta] = useState("");
  const [question, setQuestion] = useState("Multiple Choice");
  const [description, setDescription] = useState("");
  const value = { meta, setMeta, question, setQuestion, description, setDescription };
  return <SlideContext.Provider value={value} {...props} />;
}

function useSlide() {
  const context = useContext(SlideContext);
  if (typeof context === "undefined") throw new Error("useSlide must be used within a SlideProvider");
  return context;
}
export { SlideProvider, useSlide };
