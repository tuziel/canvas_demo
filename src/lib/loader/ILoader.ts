interface ILoader {
  /** 加载成功回调 */
  then: (listener: (this: HTMLImageElement, ev: Event) => any) => this;
  /** 发生错误回调 */
  catch: (listener: (this: HTMLImageElement, ev: ErrorEvent) => any) => this;
  /** 是否完成加载 */
  isComplete: () => boolean;
  /** 使用资源 */
  use: (callback: (media: HTMLElement) => void) => void;
}
