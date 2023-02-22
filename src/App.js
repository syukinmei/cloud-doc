import React, { useEffect } from 'react';
import './styles.less';
import FileSearch from './components/FileSearch';


function App() {
  const dragControllerDiv = function () {
    console.log('dragControllerDiv方法挂载')
    const resize = document.getElementsByClassName('resize')[0];
    const left = document.getElementsByClassName('left-menu')[0];
    // 给拖动块添加事件
    // 鼠标点击 - 记录各种坐标
    resize.onmousedown = function (e) {
      resize.style.background = '#818181'; // 颜色改变提醒
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
        left.style.width = finalWidth + 'px';
      };

      // 鼠标松开 - 删除事件
      document.onmouseup = function (e) {
        resize.style.background = '#d6d6d6';
        document.onmousemove = null;
        document.onmouseup = null;
        resize.releaseCapture && resize.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
      };
      resize.setCapture && resize.setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
    };
  };
  useEffect(() => {
    dragControllerDiv();
  }, [])
  return (
    <div className="app-container vh100 flex">
      <div className='left-menu'>
        <FileSearch
          title="hello! cloud-doc"
          onFileSearch={(value) => { console.log(value) }}
        />
      </div>
      <div className='resize fxy--center' title="收缩侧边栏" >⋮</div>
      <div className='right-main'>内容区域</div>

    </div>
  );
}

export default App;
