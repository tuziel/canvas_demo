window.addEventListener('load', () => {
  const canUseCanvas = !!document.createElement('canvas').getContext;
  if (!canUseCanvas) {
    return;
  }

  const app = document.getElementById('app') as HTMLCanvasElement;
  const context = app.getContext('2d')!;

  /** 按键次数 */
  let guesses = 0;
  /** 提示文本 */
  const message = 'Guess The Letter From a(lower) to z(higher)';
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
  function initGame() {
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
  function eventKeyPressed(e: KeyboardEvent) {
    const keyCode = e.keyCode;
    if (keyCode >= 65 && keyCode <= 90) {
      const letterPressed = String.fromCharCode(keyCode).toLowerCase();
      guesses++;
      lettersGuessed.push(letterPressed);

      if (letterPressed === letterToGuess) {
        gameOver = true;
      } else {
        const letterIndex = letters.indexOf(letterToGuess);
        const guessIndex = letters.indexOf(letterPressed);
        higherOrLower = guessIndex < letterIndex ? 'Lower' : 'Higher';
      }
    } else {
      higherOrLower = 'That is not a letter';
    }

    drawScreen();
  }

  function drawScreen() {
    // 背景
    context.fillStyle = '#ffffaa';
    context.fillRect(0, 0, 500, 300);
    context.strokeStyle = '#000000';
    context.strokeRect(5, 5, 490, 290);
    // 文本
    context.textBaseline = 'top';
    // 日期
    context.fillStyle = '#000000';
    context.font = '10px _';
    context.fillText(today.toLocaleDateString(), 150, 10);
    // 消息
    context.fillStyle = '#ff0000';
    context.font = '14px _';
    context.fillText(message, 125, 30);
    // 次数
    context.fillStyle = '#109910';
    context.font = '16px _';
    context.fillText(`Guesses: ${guesses}`, 215, 50);
    // 结果
    context.fillStyle = '#000000';
    context.font = '16px _';
    context.fillText(`Higher Or Lower: ${higherOrLower}`, 150, 125);
    // 猜过的字母
    context.fillStyle = '#ff0000';
    context.font = '16px _';
    context.fillText(`Letters Guessed: ${lettersGuessed.join()}`, 10, 260);

    if (gameOver) {
      context.fillStyle = '#ff0000';
      context.font = '40px _';
      context.fillText('You Got It!', 150, 180);
    }
  }

  initGame();
});
