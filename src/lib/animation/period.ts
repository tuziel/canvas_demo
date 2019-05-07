import Ani from './ani';

export default class PeriodAni extends Ani {
  /**
   * 获取当前时间在周期中的位置
   *
   * @param period 周期
   * @param startStamp 起始时间
   * @param time 当前时间
   */
  public static getPhase(
    period: number,
    startStamp: number,
    time: number,
  ): number {
    return (time - startStamp) / period;
  }

  /** 动画周期 */
  protected period: number;

  /**
   * 创建周期动画
   *
   * @param startStamp 动画开始时间
   * @param period 周期
   */
  constructor(startStamp: number, period: number) {
    super(startStamp);
    this.period = period;
  }

  /**
   * 渲染动画帧
   *
   * @param time 当前时间
   * @param callback 渲染回调
   */
  public render(time: number, callback: (phase: number) => void): void {
    if (!this.state) {
      time = this.pauseStamp;
    }
    const phase = PeriodAni.getPhase(this.period, this.startStamp, time);
    callback(phase);
  }

  /**
   * 重新设置周期
   *
   * @param period 周期
   * @param time 当前时间
   */
  public setPeriod(period: number, time: number): void {
    if (!this.state) {
      this.startStamp += time - this.pauseStamp;
      this.pauseStamp = time;
    }
    const phase = PeriodAni.getPhase(this.period, this.startStamp, time);
    this.startStamp = time - (period * phase);
    this.period = period;
  }
}
