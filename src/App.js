import React, { useEffect, useState } from "react";
import "./styles.less";
import { message } from "antd";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import LeftMenuBtn from "./components/LeftMenuBtn";
import Markdown from "./components/Markdown";

const mockData = [
  {
    id: "1",
    title: "first post",
    body: "should be aware of this",
    createTime: 1677004129000,
  },
  {
    id: "2",
    title: "second post",
    body: "## this is the title",
    createTime: 1677004129000,
  },
  {
    id: "3",
    title: "wow~syukinmei No.1 fighting!!!",
    body: "## this is the title",
    createTime: 1677004129000,
  },
];

function App() {
  const dragControllerDiv = function () {
    console.log("dragControllerDiv方法挂载");
    const resize = document.getElementsByClassName("resize")[0];
    const left = document.getElementsByClassName("left-menu")[0];
    // 给拖动块添加事件
    // 鼠标点击 - 记录各种坐标
    resize.onmousedown = function (e) {
      resize.style.background = "#818181"; // 颜色改变提醒
      const startX = e.clientX; // 记录起始坐标
      const leftLeft = left.offsetWidth;
      // 鼠标拖动 - 计算活动距离
      document.onmousemove = function (e) {
        const endX = e.clientX; // 实时记录当前位置
        // endX - startX = 拖动距离。自身宽度 + 拖动距离 = 左侧域最终宽度
        let finalWidth;

        finalWidth = leftLeft + (endX - startX);

        if (finalWidth < 200) finalWidth = 200; // 设置最小宽度

        if (finalWidth > 400) finalWidth = 400; // 设置最大宽度
        left.style.width = finalWidth + "px";
      };

      // 鼠标松开 - 删除事件
      document.onmouseup = function (e) {
        resize.style.background = "#d6d6d6";
        document.onmousemove = null;
        document.onmouseup = null;
        resize.releaseCapture && resize.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
      };
      resize.setCapture && resize.setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
    };
  };

  const [files, setFiles] = useState(mockData); // 右侧文件列表
  const [activeFileId, setActiveFileId] = useState(""); // 选中文件id
  const [searchFiles, setSearchFiles] = useState(null); // 搜索列表，搜索内容时值为array展示searchFiles，不搜索值为null

  useEffect(() => {
    dragControllerDiv();
  }, []);

  const fileSearch = (value) => {
    // 如果没有value表示关闭搜索，赋值为null
    if (!value) {
      setSearchFiles(null);
      return;
    }

    const searchRes = files.filter((item) => item.title.includes(value));
    setSearchFiles(searchRes);
  };

  // 点击右侧文件
  const fileClick = (id) => {
    setActiveFileId(id);
  };

  const fileDelete = (id) => {
    const newFiles = files.filter((item) => item.id !== id);
    setFiles(newFiles);
    message.success("删除成功");
  };

  // 更新文档名称
  const updateFileName = (id, newTitle) => {
    const newFiles = files.map((item) => ({
      ...item,
      title: item.id === id ? newTitle : item.title,
    }));
    setFiles(newFiles);
  };

  const curOpenFile = () => {
    return files.find((item) => item.id === activeFileId);
  };
  return (
    <div className="app-container vh100 flex">
      <div className="left-menu fd--c pa-little">
        <FileSearch title="hello! cloud-doc" onFileSearch={fileSearch} />
        <FileList
          files={searchFiles || files}
          onFileClick={fileClick}
          onFileDelete={fileDelete}
          onSaveEdit={updateFileName}
        />
        <LeftMenuBtn
          onNewFile={() => console.log("onNewFile")}
          onImportFile={() => console.log("onImportFile")}
        />
      </div>
      <div className="resize fxy--center" title="收缩侧边栏">
        ⋮
      </div>
      <div className="right-main">
        {curOpenFile() ? (
          <Markdown file={curOpenFile()} />
        ) : (
          <div className="start-page">请选择或新建 Markdown 文档</div>
        )}
      </div>
    </div>
  );
}

export default App;
