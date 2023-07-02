import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "vditor/dist/index.css";
import Vditor from "vditor";

const MarkDown = ({ file }) => {
  const [vd, setVd] = useState();

  useEffect(() => {
    console.log("空依赖");
    const vditor = new Vditor("contentEditor", {
      height: "100%",
      width: "100%",
      after: () => {
        vditor.setValue("### " + file.title + "\n欢迎使用，`Vditro`");
        setVd(() => vditor);
      },
      // 设置大纲
      outline: {
        enable: true,
        position: "right", // 局右
      },
      // 文本字数统计
      counter: {
        enable: true,
        type: "text",
      },
      preview: {
        hljs: {
          lineNumber: true, // 是否启用行号
          style: "monokai",
        },
      },
    });
  }, []);

  useEffect(() => {
    console.log("file变化了", file, vd);
  }, [file]);

  const getDoc = () => {
    const value = vd.getValue();
    console.log(value);
  };

  return (
    <div className="w100">
      {/* <Button onClick={getDoc}>获取内容</Button> */}
      <div id="contentEditor"></div>
    </div>
  );
};

export default MarkDown;
