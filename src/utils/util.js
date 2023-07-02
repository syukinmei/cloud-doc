/**
 * 生成uuid
 * @returns {string} UUID(通用唯一标识)
 */
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8; // x替换为随机生成的十六进制数字，y替换为特定的十六进制数字(4、5、6、7)。
    return v.toString(16);
  });
}

/**
 * 同步阻塞线程 time 毫米，默认1000ms
 * @param {number} time
 * @returns
 */
const sleepSync = function (time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
};

/**
 * 防抖函数
 * @param {Function} fn 函数
 * @param {Number} interval 时间间隔，默认500ms
 * @returns
 */
const debounce = (fn, interval) => {
  let timer = null;
  let gapTime = interval || 500; // 间隔时间，如果interval不传，则默认500ms
  return function () {
    clearTimeout(timer);
    let context = this;
    let args = arguments; // 保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function () {
      fn.call(context, args);
    }, gapTime);
  };
};

/**
 * 节流函数，interval为 2000 时可以做到短时间内重复提交的效果
 * @param {Function} fn 函数
 * @param {Number} interval 时间间隔，默认2000ms
 * @returns
 */
const throttle = (fn, interval) => {
  let enterTime = 0; // 触发的时间
  let gapTime = interval || 2000; // 间隔时间，如果interval不传，则默认2000ms
  return function () {
    let context = this;
    let backTime = new Date(); // 第一次函数return即触发的时间
    if (backTime - enterTime >= gapTime) {
      fn.call(context, arguments);
      enterTime = backTime; // 赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
};

export { generateUUID, sleepSync, debounce, throttle };
