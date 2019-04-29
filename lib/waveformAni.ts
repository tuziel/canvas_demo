class Ani {
  /**
   * 获取当前时间在周期中的位置
   *
   * @param period 周期
   * @param startStamp 起始时间
   * @param time 当前时间
   */
  public static getPhase(period: number, startStamp: number, time: number) {
    return (time - startStamp) % period / period;
  }

  /** 动画注册时间 */
  protected startStamp: number;
  /** 动画暂停时间 */
  protected pauseStamp = 0;
  /** 动画周期 */
  protected period: number;
  /** 运行状态 */
  protected state = true;

  /**
   * 渲染回调
   *
   * @param phase 在周期中的位置
   */
  protected renderer: (phase: number) => void;

  constructor(
    startStamp: number,
    period: number,
    renderer: (phase: number) => void,
  ) {
    this.startStamp = startStamp;
    this.period = period;
    this.renderer = renderer;
  }

  /**
   * 渲染动画帧
   *
   * @param time 当前时间
   */
  public render(time: number) {
    if (this.state) {
      this.renderer(Ani.getPhase(this.period, this.startStamp, time));
    }
  }

  /**
   * 重置动画
   *
   * @param time 当前时间
   */
  public reset(time: number) {
    this.startStamp = time;
  }

  /**
   * 开始动画
   *
   * @param time 当前时间
   */
  public start(time: number) {
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
  public pause(time: number) {
    if (this.state) {
      this.pauseStamp = time;
      this.state = false;
    }
  }

  /**
   * 重新设置周期
   *
   * @param period 周期
   * @param time 当前时间
   */
  public setPeriod(period: number, time: number) {
    if (this.state) {
      this.startStamp += time - this.pauseStamp;
    }
    const phase = Ani.getPhase(this.period, this.startStamp, time);
    this.startStamp = time - (period * phase);
    this.period = period;
  }
}
