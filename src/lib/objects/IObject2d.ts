/** 2D 物件 */
interface IObject2d {
  /** 更新物件 */
  update(ticks?: number, tickTime?: number): void;
  /** 渲染物件 */
  render(context: CanvasRenderingContext2D, detlaTicks?: number, tickTime?: number): void;
}

/** 碰撞物件 */
interface ICollideObject2d extends IObject2d {
  /** 碰撞检测 */
  testCollide(target: ICollideObject2d, effect?: boolean): boolean;
}
