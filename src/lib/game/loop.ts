/**
 * 更新回调
 *
 * @param ticks 游戏总 tick 数
 * @param tickTime tick 总时长
 */
type GameUpdater = (ticks: number, tickTime: number) => void;
/**
 * 渲染回调
 *
 * @param detla 真实时钟领先游戏时钟的差值
 * @param tickTime tick 总时长
 */
type GameRenderer = (detla: number, tickTime: number) => void;

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

export default class Loop {
  /** 游戏总 tick 数 */
  protected ticks: number = 0;
  /** 游戏时钟 */
  protected clock: number = 0;
  /** 真实时钟 */
  protected realClock: number = 0;
  /** RAF / 定时器 id */
  protected id: number = -1;
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
        const detla = time - this.realClock;
        this.clock += detla;
        this.realClock = time;
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

    /** 循环开始时间 */
    const startStamp = now();

    const step = this.step;
    let ticks = this.ticks;
    let clock = this.clock;

    /** 当前时钟领先游戏时钟的长度 */
    const detla = time - clock;

    // 游戏时间领先，跳过本次循环
    if (detla < 0) { return; }

    /** 上次的 detla */
    const lastDetla = this.realClock - clock;
    /** 本次循环的更新次数 */
    let updateTicks = detla > step ? Math.floor(detla / step) : 0;
    /** 本次循环增加的游戏时间 */
    let updateTime = updateTicks * step;

    // 更新游戏
    // 如果 ticks 过大则认为游戏处于休眠状态
    if (updateTicks < 50) {
      while (updateTicks--) {
        ticks++;
        this.updater(ticks, ticks * step);
        // 超时则停止更新
        const costTime = now() - startStamp;
        if (costTime > updateTime) {
          clock = time = time + costTime;
          updateTime = 0;
          break;
        }
      }
      clock += updateTime;
    } else {
      // 但至少执行一次更新
      ticks++;
      clock = time - lastDetla;
      this.updater(ticks, ticks * step);
    }

    // 更新视图
    const currentDetla = time - clock;
    this.renderer(currentDetla, ticks * step + currentDetla);

    // 更新时钟
    this.ticks = ticks;
    this.clock = clock;
    this.realClock = time;
  }
}
