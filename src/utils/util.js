/**
 *
 * @returns {string} UUID(通用唯一标识)
 */
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8; // x替换为随机生成的十六进制数字，y替换为特定的十六进制数字(4、5、6、7)。
    return v.toString(16);
  });
}

export { generateUUID };
