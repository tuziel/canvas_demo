interface ILoader {
  /** 加载成功回调 */
  then: (listener: (this: HTMLElement, ev: Event) => any) => this;
  /** 发生错误回调 */
  catch: (listener: (this: HTMLElement, ev: ErrorEvent) => any) => this;
  /** 是否完成加载 */
  isComplete: () => boolean;
  /** 使用资源 */
  use: (callback: (media: HTMLElement) => void) => this;
  /** 获取资源 */
  getMedia: () => HTMLElement;
}
