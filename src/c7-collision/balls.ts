import Wall from './wall';

const max = Math.max;
const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;
const atan2 = Math.atan2;
const PI = Math.PI;
const PI2 = PI * 2;

export default class Ball implements ICollideObject2d {
  /** 中心点坐标 X */
  protected x: number = 0;
  /** 中心点坐标 Y */
  protected y: number = 0;
  /** 半径 */
  protected radius: number;
  /** 半径平法 */
  protected radiusSqua: number;
  /** 运动方向弧度 */
  protected arc: number = 0;
  /** 运动速度 */
  protected speed: number = 1;
  /** X 方向运动速度 */
  protected speedX: number = 1;
  /** Y 方向运动速度 */
  protected speedY: number = 0;
  /** 质量 */
  protected mass: number = 1;
  /** 填充样式 */
  protected fillStyle: string | CanvasGradient | CanvasPattern = '#000000';

  /**
   * 创建一个球体
   *
   * @param radius 半径
   */
  constructor(radius: number) {
    this.mass = this.radius = radius;
    this.radiusSqua = radius * radius;
  }

  /**
   * 更新
   */
  public update(): void {
    const pos = this.getNextPosition(1);
    this.x = pos.x;
    this.y = pos.y;
  }

  /**
   * 渲染
   *
   * @param renderer
   */
  public render(context: CanvasRenderingContext2D, detla: number): void {
    const pos = this.getNextPosition(detla);
    context.beginPath();
    context.arc(pos.x, pos.y, this.radius, 0, PI2, true);
    context.closePath();
    context.fillStyle = this.fillStyle;
    context.fill();
  }

  /**
   * 设置中心点坐标
   *
   * @param x 中心点坐标 X
   * @param y 中心点坐标 Y
   */
  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  /**
   * 获取下一个位置
   *
   * @param ticks 经过的 tick 数
   */
  public getNextPosition(ticks: number): { x: number, y: number } {
    return {
      x: this.x + this.speedX * ticks,
      y: this.y + this.speedY * ticks,
    };
  }

  /**
   * 设置速度
   *
   * @param speed 速度
   */
  public setSpeed(speed: number): void {
    this.speed = speed;
    // 修正速度分量
    this.speedX = speed * cos(this.arc);
    this.speedY = speed * sin(this.arc);
  }

  /**
   * 设置速度
   *
   * @param speed 速度
   */
  public setSpeedOnly(speed: number): void {
    this.speed = speed;
  }

  /**
   * 设置速度分量
   *
   * @param speedX 速度 X 分量
   * @param speedY 速度 Y 分量
   */
  public setDecomposition(speedX: number, speedY: number): void {
    this.speedX = speedX;
    this.speedY = speedY;
    // 修正总速度
    this.speed = sqrt(speedX * speedX + speedY * speedY);
    // 修正角度
    this.arc = atan2(speedY, speedX);
  }

  /**
   * 设置速度分量
   *
   * @param speedX 速度 X 分量
   * @param speedY 速度 Y 分量
   */
  public setDecompositionOnly(speedX: number, speedY: number): void {
    this.speedX = speedX;
    this.speedY = speedY;
  }

  /**
   * 设置运动方向
   *
   * @param arc 弧度
   */
  public setArc(arc: number): void {
    this.arc = arc;
    // 修正速度分量
    this.speedX = this.speed * cos(this.arc);
    this.speedY = this.speed * sin(this.arc);
  }

  /**
   * 设置运动方向
   *
   * @param arc 弧度
   */
  public setArcOnly(arc: number): void {
    this.arc = arc;
  }

  /**
   * 设置填充样式
   *
   * @param style  填充样式
   */
  public setStyle(style: string | CanvasGradient | CanvasPattern): void {
    this.fillStyle = style;
  }

  /**
   * 重叠检测
   *
   * @param target 测试的目标
   * @param effect 是否触发碰撞效果
   */
  public testCollide(target: ICollideObject2d, effect?: boolean): boolean {
    if (target instanceof Ball) {
      return this.testBall(target, effect);
    } else if (target instanceof Wall) {
      return this.testWall(target, effect);
    }
    return false;
  }

  /**
   * 对球体的重叠检测
   *
   * @param target 目标
   * @param effect 是否触发碰撞效果
   */
  public testBall(target: Ball, effect?: boolean): boolean {
    // 计算两个圆心的距离
    const distanceX = target.x - this.x;
    const distanceY = target.y - this.y;
    const distanceMin = this.radius + target.radius;

    /** 是否有重叠 */
    const hasOverlap = distanceX * distanceX + distanceY * distanceY <= distanceMin * distanceMin;

    // 计算碰撞效果
    if (hasOverlap && effect) {
      /** 质量 */
      const m1 = this.mass;
      /** 目标质量 */
      const m2 = target.mass;
      /** 碰撞角 */
      const theta = atan2(distanceY, distanceX);
      const cosT = cos(theta);
      const sinT = sin(theta);

      // 计算沿碰撞角的速度分量
      // vx = speed * cos(arc - detla)
      //    = speed * cos(arc) * cos(detla) + speed * sin(arc) * sin(detla)
      //    = speedX * cos(detla) + speedY * sin(detla)
      const vv11 = this.speedX * cosT + this.speedY * sinT;
      const vv21 = target.speedX * cosT + target.speedY * sinT;

      // 如果目标速度追不上或方向相反则不会触发碰撞
      if (vv11 >= vv21) {
        const vh1 = this.speedY * cosT - this.speedX * sinT;
        const vh2 = target.speedY * cosT - target.speedX * sinT;

        // 计算碰撞后的速度
        const mSum = m1 + m2;
        const mDiff = m1 - m2;
        const vv12 = ((m2 + m2) * vv21 + mDiff * vv11) / mSum;
        const vv22 = ((m1 + m1) * vv11 - mDiff * vv21) / mSum;

        // 设置速度分量
        this.setDecomposition(vv12 * cosT - vh1 * sinT, vh1 * cosT + vv12 * sinT);
        target.setDecomposition(vv22 * cosT - vh2 * sinT, vh2 * cosT + vv22 * sinT);
      }
    }

    return hasOverlap;
  }

  /**
   * 对墙的重叠检测
   *
   * @param target 目标
   * @param effect 是否触发碰撞效果
   */
  public testWall(target: Wall, effect?: boolean): boolean {
    const wall = target.getCollideData();

    // 如果与AABB盒重叠再进行下一步检测
    if (
      this.y >= wall.outerTop - this.radius &&
      this.x <= wall.outerRight + this.radius &&
      this.y <= wall.outerBottom + this.radius &&
      this.x >= wall.outerLeft - this.radius
    ) {
      // 建立坐标系, 以矩形起点为原点, 宽的方向为正X轴
      const distanceX = this.x - wall.x;
      const distanceY = this.y - wall.y;

      /** 圆心和矩形起点的距离 */
      const distance = sqrt(distanceX * distanceX + distanceY * distanceY);

      /** 矩形坐标系中圆心相对矩形起点的角度 */
      const theta = atan2(distanceY, distanceX) - wall.rotate;
      const thetaX = distance * cos(theta);
      const thetaY = distance * sin(theta);

      // 折叠矩形宽高. 问题简化为圆与点碰撞
      const relativeX = thetaX > 0 ? max(0, thetaX - wall.width) : thetaX;
      const relativeY = thetaY > 0 ? max(0, thetaY - wall.height) : thetaY;
      const hasOverlap = relativeX * relativeX + relativeY * relativeY <= this.radiusSqua;

      // 计算碰撞效果
      if (hasOverlap && effect) {
        /** 矩形坐标系的碰撞角 */
        const detla = atan2(relativeY, relativeX);
        /** 碰撞角的实际角度 */
        const alpha = detla + wall.rotate;
        /** 碰撞角坐标系的速度方向 */
        const beta = this.arc - alpha;

        // 如果远离矩形则不会碰撞
        if (this.speed * cos(beta) < 0) {
          // 计算运动方向, 并还原坐标系
          this.setArc((PI - beta + alpha) % PI2);
        }
      }

      return hasOverlap;
    }

    return false;
  }
}
