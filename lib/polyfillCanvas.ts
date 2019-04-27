(() => {
  const proto = CanvasRenderingContext2D.prototype;

  if (!proto.resetTransform) {
    proto.resetTransform = function(): void {
      this.setTransform(1, 0, 0, 1, 0, 0);
    };
  }
})();
