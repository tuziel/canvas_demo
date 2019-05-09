(() => {
  /**
   * 获取当前时间戳
   */
  const now = (() => {
    if (Date.now) {
      return Date.now;
    } else {
      return () => new Date().getTime();
    }
  })();

  /** 打开页面的时间戳 */
  const __TIMESTAMP__ = now();

  /**
   * 请求动画绘制
   *
   * 要求浏览器在下次重绘之前调用指定的回调函数更新动画
   * XXX: 可以使用订阅发布模式避免开多个定时器
   * @param callback 更新动画帧所调用的函数
   */
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    (window as any).oRequestAnimationFrame ||
    (window as any).msRequestAnimationFrame ||
    ((callback: FrameRequestCallback) =>
      window.setTimeout(() => {
        const time = now() - __TIMESTAMP__;
        callback(time);
      }, 1000 / 60));

  /**
   * 取消动画绘制
   *
   * 取消一个先前通过调用window.requestAnimationFrame()方法添加到计划中的动画帧请求.
   * @param handel 取消回调的标识
   */
  window.cancelAnimationFrame =
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    (window as any).mozCancelAnimationFrame ||
    (window as any).oCancelAnimationFrame ||
    (window as any).msCancelAnimationFrame ||
    window.clearTimeout;
})();
