import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false); // 输入框状态
  const [value, setValue] = useState(""); // 输入框文案

  const node = useRef(null);

  const closeSearch = () => {
    setInputActive(false);
    setValue("");
  };

  useEffect(() => {
    const handleInputEvent = (event) => {
      if (!inputActive) return;
      const { keyCode } = event;
      if (keyCode === 13) {
        onFileSearch(value);
      } else if (keyCode === 27) {
        closeSearch();
      }
    };

    document.addEventListener("keyup", handleInputEvent);
    return () => {
      document.removeEventListener("keyup", handleInputEvent);
    };
  });

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
