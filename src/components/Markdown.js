import React from "react";

const Markdown = ({ file }) => {
  return (
    <div>
      <h1>{file.title}</h1>
      <p>{file.body}</p>
    </div>
  );
};

export default Markdown;
