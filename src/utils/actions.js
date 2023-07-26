import { Modal } from "antd";

export const model = {
  /**
   * 显示确认对话框
   * @param {Object} options - 包含以下属性的对象：
   * @param {('info' | 'success' | 'error' | 'warning' | 'confirm')} options.method - 标题（默认为 "confirm" ）
   * @param {string} options.title - 标题
   * @param {string} options.content - 内容（默认为"你确定吗？"）
   * @param {string} options.cancelText - 取消按钮文本（默认为"取消"）
   * @param {string} options.okText - 确定按钮文本（默认为"确定"）
   * @returns {Promise<boolean>} - 当用户点击确认按钮时，Promise 解析为 true；当用户点击取消按钮时，Promise 解析为 false。
   */
  confirmModal: ({
    method = "confirm",
    title,
    content = "你确定吗？",
    cancelText = "取消",
    okText = "确定",
  }) => {
    if (
      typeof method !== "string" ||
      !["info", "success", "error", "warning", "confirm"].includes(method)
    ) {
      throw new Error(
        "Invalid method type。 \n method 应为：info' | 'success' | 'error' | 'warning' | 'confirm'"
      );
    }
    return new Promise((resolve) => {
      Modal[method]({
        title,
        content,
        cancelText,
        okText,
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  },
};

const exportObj = { model };
export default exportObj;
