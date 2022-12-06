import React, { useLayoutEffect, useState, useRef } from "react";

function TextAreaAutoResize() {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const [height, setHeight] = useState("auto");
  //   const [parentHeight, setParentHeight] = useState("auto");

  const handleChange = e => {
    setHeight("auto");
    // setParentHeight(`${textareaRef?.current?.scrollHeight}px`);
    setText(e.target.value);
  };

  useLayoutEffect(() => {
    setHeight(`${textareaRef?.current?.scrollHeight}px`);
  }, [text]);

  return (
    <div className="mt-2">
      <textarea
        className="w-full max-w-[400px] p-5 rounded-lg border border-gray-300 focus:border-blue-400 resize-none overflow-hidden transition-all outline-none leading-normal"
        placeholder="Please enter your content..."
        value={text}
        ref={textareaRef}
        style={{ height }}
        onChange={handleChange}
      />
    </div>
  );
}

export default TextAreaAutoResize;
