window.addEventListener('load', (): void => {
  const canUseCanvas = !!document.createElement('canvas').getContext;
  if (!canUseCanvas) {
    return;
  }

  const app = document.getElementById('app') as HTMLCanvasElement;
  const context = app.getContext('2d')!;

  const c = new C(app);
});
