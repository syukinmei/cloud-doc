import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import useKeyPress from "../hooks/useKeyPress";

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false); // 输入框状态
  const [value, setValue] = useState(""); // 输入框文案

  const node = useRef(null);

  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);

  const closeSearch = () => {
    setInputActive(false);
    setValue("");
    onFileSearch(""); // 关闭的时候搜索空，告诉外部组件关闭了搜索
  };

  useEffect(() => {
    if (!inputActive) return;

    if (enterPressed) onFileSearch(value);

    if (escPressed) closeSearch();
    // TODO：按下 enter 时，onFileSearch 会被调用，这个时候外层 App 组件就会更新，这样FileSearch 也会被更新，所以这段 effect 又会被调用，这时候如果我们按住 enter 键不松手，那么 第一个条件又成立，onFileSearch 又被触发，这样就会多次触发这个 effect。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterPressed, escPressed]); // 添加依赖解决重复调用的bug

  useEffect(() => {
    if (inputActive) node.current.focus();
  }, [inputActive]);

  return (
    <div>
      {!inputActive ? (
        <div className="fx--between-center">
          <div className="single-text-overflow">{title}</div>
          <Button
            onClick={(e) => {
              setInputActive(true);
            }}
          >
            <SearchOutlined />
          </Button>
        </div>
      ) : (
        <div className="fx--between-center">
          <Input
            className="single-text-overflow"
            placeholder="请输入你要搜索的文件名"
            bordered={false}
            value={value}
            ref={node}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button onClick={closeSearch}>
            <CloseOutlined />
          </Button>
        </div>
      )}
    </div>
  );
};

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
};

FileSearch.defaultProps = {
  title: "hello world",
};

export default FileSearch;
