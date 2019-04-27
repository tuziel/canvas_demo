window.addEventListener('load', (): void => {
  const canUseCanvas = !!document.createElement('canvas').getContext;
  if (!canUseCanvas) {
    return;
  }

  const app = document.getElementById('app') as HTMLCanvasElement;
  const context = app.getContext('2d')!;

  const buttonExport = document.getElementById('createImageData') as HTMLInputElement;

  /** 按键次数 */
  let guesses = 0;
  /** 提示文本 */
  const message = '从 a（小） 到 z（大） 里猜一个字母';
  /** 字母表 */
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  /** 日期 */
  const today = new Date();
  /** 当前文字 */
  let letterToGuess = '';
  /** 高低状态 */
  let higherOrLower = '';
  /** 猜过的字母 */
  const lettersGuessed: string[] = [];
  /** 是否结束 */
  let gameOver = false;

  /**
   * 初始化游戏
   */
  function initGame(): void {
    const letterIndex = Math.floor(Math.random() * letters.length);
    letterToGuess = letters[letterIndex];
    guesses = 0;
    lettersGuessed.length = 0;
    gameOver = false;
    window.addEventListener('keydown', eventKeyPressed);
    drawScreen();
  }

  /**
   * 处理按键事件
   * @param e 事件
   */
  function eventKeyPressed(e: KeyboardEvent): void {
    if (gameOver) {
      initGame();
    }

    const keyCode = e.keyCode;
    if (keyCode >= 65 && keyCode <= 90) {
      const letterPressed = String.fromCharCode(keyCode).toLowerCase();
      guesses++;
      lettersGuessed.push(letterPressed);

      if (letterPressed === letterToGuess) {
        higherOrLower = '中了';
        gameOver = true;
      } else {
        const letterIndex = letters.indexOf(letterToGuess);
        const guessIndex = letters.indexOf(letterPressed);
        higherOrLower = guessIndex < letterIndex ? '小了' : '大了';
      }
    } else {
      higherOrLower = '不是一个字母';
    }

    drawScreen();
  }

  /**
   * 绘制界面
   */
  function drawScreen(): void {
    // 背景
    context.fillStyle = '#ffffaa';
    context.fillRect(0, 0, 500, 300);
    context.strokeStyle = '#000000';
    context.strokeRect(5, 5, 490, 290);
    // 文本
    context.textBaseline = 'top';
    // 日期
    context.fillStyle = '#000000';
    context.font = '10px serif';
    context.fillText(`日期：${today.toLocaleDateString()}`, 150, 10);
    // 消息
    context.fillStyle = '#ff0000';
    context.font = '14px serif';
    context.fillText(message, 125, 30);
    // 次数
    context.fillStyle = '#109910';
    context.font = '16px serif';
    context.fillText(`猜测次数: ${guesses}`, 215, 50);
    // 结果
    context.fillStyle = '#000000';
    context.font = '16px serif';
    context.fillText(`大或小: ${higherOrLower}`, 150, 125);
    // 猜过的字母
    context.fillStyle = '#ff0000';
    context.font = '16px serif';
    context.fillText(`猜过的字母: ${lettersGuessed.join()}`, 10, 260);

    if (gameOver) {
      context.fillStyle = '#ff0000';
      context.font = '40px serif';
      context.fillText('你猜中了！', 150, 180);
    }
  }

  /**
   * 点击导出
   * @param e 事件
   */
  function createImageDataPressed(): void {
    const elm = document.createElement('a');
    elm.download = '画布';
    elm.href = app.toDataURL();
    elm.click();
  }

  buttonExport.addEventListener('click', createImageDataPressed);
  initGame();
});
