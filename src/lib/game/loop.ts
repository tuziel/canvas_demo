/**
 * 更新回调
 *
 * @param ticks 游戏总 tick 数
 * @param runningTime 运行时长
 */
type GameUpdater = (ticks: number, runningTime: number) => void;
/**
 * 渲染回调
 *
 * @param detla 真实时钟领先游戏时钟的差值
 * @param runningTime 运行时长
 */
type GameRenderer = (detla: number, runningTime: number) => void;

export default class Loop {
  /** 游戏总 tick 数 */
  protected ticks: number;
  /** 游戏时钟 */
  protected clock: number;
  /** 真实时钟 */
  protected relaClock: number;
  /** RAF / 定时器 id */
  protected id: number;
  /** 游戏步长 */
  protected step: number;
  /** 更新回调 */
  protected updater: GameUpdater;
  /** 渲染回调 */
  protected renderer: GameRenderer;

  /**
   * 创建游戏循环
   * @param step 游戏步长
   */
  constructor(step: number = 10) {
    this.ticks = 0;
    this.clock = 0;
    this.relaClock = 0;
    this.id = -1;
    step = Math.floor(step);
    this.step = step > 0 ? step : 10;
    this.updater = this.renderer = () => void 0;
  }

  /**
   * 开始循环
   *
   * @param callback 回调
   */
  public start(callback?: (time: number) => void): void {
    if (this.id < 0) {
      this.id = requestAnimationFrame((time) => {
        const detla = time - this.relaClock;
        this.clock += detla;
        callback && callback(time);
        this.mainLoop(time);
      });
    }
  }

  /**
   * 停止循环
   */
  public stop(): void {
    cancelAnimationFrame(this.id);
    this.id = -1;
  }

  /**
   * 添加更新回调
   *
   * @param updater
   */
  public update(updater: GameUpdater): void {
    this.updater = updater;
  }
  /**
   * 添加渲染回调
   *
   * @param renderer
   */
  public render(renderer: GameRenderer): void {
    this.renderer = renderer;
  }

  /**
   * 主循环
   * @param time 当前时钟
   */
  protected mainLoop(time: number): void {
    // 请求下一帧
    this.id = requestAnimationFrame((t) => this.mainLoop(t));

    const step = this.step;
    /** 上一帧到现在的时间间隔 */
    const detla = time - this.clock;
    /** 上次的 detla */
    const lastDetla = this.relaClock - this.clock;
    /** 游戏更新次数 */
    let ticks = detla > this.step ? Math.floor(detla / this.step) : 0;

    // 更新真实时钟
    this.relaClock = time;

    // 更新游戏
    // 如果 ticks 过大则认为游戏处于休眠状态或机器无法跟上
    let currentTicks = this.ticks;
    if (ticks < 50) {
      while (ticks--) {
        this.clock += step;
        currentTicks = ++this.ticks;
        this.updater(currentTicks, currentTicks * step);
      }
    } else {
      // 但至少执行一次更新
      this.clock = time - lastDetla;
      currentTicks = ++this.ticks;
      this.updater(currentTicks, currentTicks * step);
    }

    // 更新视图
    const currentDetla = time - this.clock;
    this.renderer(currentDetla, currentTicks * step + currentDetla);
  }
}
