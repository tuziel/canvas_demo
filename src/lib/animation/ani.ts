export default class Ani {
  /** 动画开始时间 */
  protected startStamp: number;
  /** 动画暂停时间 */
  protected pauseStamp = 0;
  /** 运动状态 */
  protected state = true;

  /**
   * 渲染回调
   *
   * @param time 当前时间
   */
  protected renderer: (time: number) => void;

  /**
   * 创建动画
   *
   * @param startStamp 动画开始时间
   * @param renderer 渲染回调
   */
  constructor(
    startStamp: number,
    renderer: (time: number) => void,
  ) {
    this.startStamp = this.pauseStamp = startStamp;
    this.renderer = renderer;
  }

  /**
   * 渲染动画帧
   *
   * @param time 当前时间
   */
  public render(time: number): void {
    if (!this.state) {
      time = this.pauseStamp;
    }
    this.renderer(time);
  }

  /**
   * 重置动画
   *
   * @param time 当前时间
   */
  public reset(time: number): void {
    this.startStamp = this.pauseStamp = time;
  }

  /**
   * 开始动画
   *
   * @param time 当前时间
   */
  public start(time: number): void {
    if (!this.state) {
      this.startStamp += time - this.pauseStamp;
      this.state = true;
    }
  }

  /**
   * 暂停动画
   *
   * @param time 当前时间
   */
  public pause(time: number): void {
    if (this.state) {
      this.pauseStamp = time;
      this.state = false;
    }
  }
}
