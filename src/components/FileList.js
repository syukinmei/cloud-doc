import React, { useState, useEffect, useRef } from "react";
import { List } from "antd";
import { MediumOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import PropTypes from "prop-types";

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

const FileList = ({ files, onFileClick, onFileDelete, onSaveEdit }) => {
  return (
    <div>
      <List
        dataSource={mockData}
        renderItem={(item) => (
          <List.Item>
            <div className="fy--center w100">
              <MediumOutlined className="mr-small" />
              <span className="flex-1 single-text-overflow">{item.title}</span>
              <div>
                <EditFilled className="mx-small" />
                <DeleteFilled />
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

FileList.propTyoes = {
  files: PropTypes.array,
};

export default FileList;
