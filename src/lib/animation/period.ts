import Ani from './ani';

interface IPhase {
  /** 坐标位置 */
  coord: number;
  /** 周期中位置 */
  phase: number;
  /** 周期次数 */
  times: number;
}

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
  ): IPhase {
    const coord = (time - startStamp) / period;
    const times = Math.floor(coord);
    const phase = (coord + 1) % 1;
    return { coord, phase, times };
  }

  /** 动画周期 */
  protected period: number;

  /**
   * 渲染回调
   *
   * @param phase 周期中的位置
   * @param times 第几个周期
   */
  protected periodRenderer: (phase: number, times?: number) => void;

  /**
   * 创建周期动画
   *
   * @param startStamp 动画开始时间
   * @param period 周期
   * @param renderer 渲染回调
   */
  constructor(
    startStamp: number,
    period: number,
    periodRenderer: (phase: number, times?: number) => void,
  ) {
    super(startStamp, PeriodAni.prototype.render);
    this.periodRenderer = periodRenderer;
    this.period = period;
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
    const phase = PeriodAni.getPhase(this.period, this.startStamp, time);
    this.periodRenderer(phase.phase, phase.times);
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
    this.startStamp = time - (period * phase.coord);
    this.period = period;
  }
}