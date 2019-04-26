"use strict";
window.addEventListener('load', function () {
    var canUseCanvas = !!document.createElement('canvas').getContext;
    if (!canUseCanvas) {
        return;
    }
    var app = document.getElementById('app');
    var context = app.getContext('2d');
    var guesses = 0;
    var message = 'Guess The Letter From a(lower) to z(higher)';
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    var today = new Date();
    var letterToGuess = '';
    var higherOrLower = '';
    var lettersGuessed = [];
    var gameOver = false;
    function initGame() {
        var letterIndex = Math.floor(Math.random() * letters.length);
        letterToGuess = letters[letterIndex];
        guesses = 0;
        lettersGuessed.length = 0;
        gameOver = false;
        window.addEventListener('keydown', eventKeyPressed);
        drawScreen();
    }
    function eventKeyPressed(e) {
        var keyCode = e.keyCode;
        if (keyCode >= 65 && keyCode <= 90) {
            var letterPressed = String.fromCharCode(keyCode).toLowerCase();
            guesses++;
            lettersGuessed.push(letterPressed);
            if (letterPressed === letterToGuess) {
                gameOver = true;
            }
            else {
                var letterIndex = letters.indexOf(letterToGuess);
                var guessIndex = letters.indexOf(letterPressed);
                higherOrLower = guessIndex < letterIndex ? 'Lower' : 'Higher';
            }
        }
        else {
            higherOrLower = 'That is not a letter';
        }
        drawScreen();
    }
    function drawScreen() {
        context.fillStyle = '#ffffaa';
        context.fillRect(0, 0, 500, 300);
        context.strokeStyle = '#000000';
        context.strokeRect(5, 5, 490, 290);
        context.textBaseline = 'top';
        context.fillStyle = '#000000';
        context.font = '10px _';
        context.fillText(today.toLocaleDateString(), 150, 10);
        context.fillStyle = '#ff0000';
        context.font = '14px _';
        context.fillText(message, 125, 30);
        context.fillStyle = '#109910';
        context.font = '16px _';
        context.fillText("Guesses: " + guesses, 215, 50);
        context.fillStyle = '#000000';
        context.font = '16px _';
        context.fillText("Higher Or Lower: " + higherOrLower, 150, 125);
        context.fillStyle = '#ff0000';
        context.font = '16px _';
        context.fillText("Letters Guessed: " + lettersGuessed.join(), 10, 260);
        if (gameOver) {
            context.fillStyle = '#ff0000';
            context.font = '40px _';
            context.fillText('You Got It!', 150, 180);
        }
    }
    initGame();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtJQUM5QixJQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDbkUsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixPQUFPO0tBQ1I7SUFFRCxJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBc0IsQ0FBQztJQUNoRSxJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO0lBR3RDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUVoQixJQUFNLE9BQU8sR0FBRyw2Q0FBNkMsQ0FBQztJQUU5RCxJQUFNLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztJQUU3QyxJQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBRXpCLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUV2QixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFFdkIsSUFBTSxjQUFjLEdBQWEsRUFBRSxDQUFDO0lBRXBDLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztJQUtyQixTQUFTLFFBQVE7UUFDZixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsYUFBYSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUIsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLGVBQWUs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QUFDYixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gIGNvbnN0IGNhblVzZUNhbnZhcyA9ICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dDtcclxuICBpZiAoIWNhblVzZUNhbnZhcykge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhcHAuZ2V0Q29udGV4dCgnMmQnKSE7XHJcblxyXG4gIC8qKiDmjInplK7mrKHmlbAgKi9cclxuICBsZXQgZ3Vlc3NlcyA9IDA7XHJcbiAgLyoqIOaPkOekuuaWh+acrCAqL1xyXG4gIGNvbnN0IG1lc3NhZ2UgPSAnR3Vlc3MgVGhlIExldHRlciBGcm9tIGEobG93ZXIpIHRvIHooaGlnaGVyKSc7XHJcbiAgLyoqIOWtl+avjeihqCAqL1xyXG4gIGNvbnN0IGxldHRlcnMgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xyXG4gIC8qKiDml6XmnJ8gKi9cclxuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgLyoqIOW9k+WJjeaWh+WtlyAqL1xyXG4gIGxldCBsZXR0ZXJUb0d1ZXNzID0gJyc7XHJcbiAgLyoqIOmrmOS9jueKtuaAgSAqL1xyXG4gIGxldCBoaWdoZXJPckxvd2VyID0gJyc7XHJcbiAgLyoqIOeMnOi/h+eahOWtl+avjSAqL1xyXG4gIGNvbnN0IGxldHRlcnNHdWVzc2VkOiBzdHJpbmdbXSA9IFtdO1xyXG4gIC8qKiDmmK/lkKbnu5PmnZ8gKi9cclxuICBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICog5Yid5aeL5YyW5ri45oiPXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gaW5pdEdhbWUoKSB7XHJcbiAgICBjb25zdCBsZXR0ZXJJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKTtcclxuICAgIGxldHRlclRvR3Vlc3MgPSBsZXR0ZXJzW2xldHRlckluZGV4XTtcclxuICAgIGd1ZXNzZXMgPSAwO1xyXG4gICAgbGV0dGVyc0d1ZXNzZWQubGVuZ3RoID0gMDtcclxuICAgIGdhbWVPdmVyID0gZmFsc2U7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50S2V5UHJlc3NlZCk7XHJcbiAgICBkcmF3U2NyZWVuKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlpITnkIbmjInplK7kuovku7ZcclxuICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgKi9cclxuICBmdW5jdGlvbiBldmVudEtleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgY29uc3Qga2V5Q29kZSA9IGUua2V5Q29kZTtcclxuICAgIGlmIChrZXlDb2RlID49IDY1ICYmIGtleUNvZGUgPD0gOTApIHtcclxuICAgICAgY29uc3QgbGV0dGVyUHJlc3NlZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5Q29kZSkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgZ3Vlc3NlcysrO1xyXG4gICAgICBsZXR0ZXJzR3Vlc3NlZC5wdXNoKGxldHRlclByZXNzZWQpO1xyXG5cclxuICAgICAgaWYgKGxldHRlclByZXNzZWQgPT09IGxldHRlclRvR3Vlc3MpIHtcclxuICAgICAgICBnYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbGV0dGVySW5kZXggPSBsZXR0ZXJzLmluZGV4T2YobGV0dGVyVG9HdWVzcyk7XHJcbiAgICAgICAgY29uc3QgZ3Vlc3NJbmRleCA9IGxldHRlcnMuaW5kZXhPZihsZXR0ZXJQcmVzc2VkKTtcclxuICAgICAgICBoaWdoZXJPckxvd2VyID0gZ3Vlc3NJbmRleCA8IGxldHRlckluZGV4ID8gJ0xvd2VyJyA6ICdIaWdoZXInO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoaWdoZXJPckxvd2VyID0gJ1RoYXQgaXMgbm90IGEgbGV0dGVyJztcclxuICAgIH1cclxuXHJcbiAgICBkcmF3U2NyZWVuKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkcmF3U2NyZWVuKCkge1xyXG4gICAgLy8g6IOM5pmvXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmZmFhJztcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgNTAwLCAzMDApO1xyXG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcclxuICAgIGNvbnRleHQuc3Ryb2tlUmVjdCg1LCA1LCA0OTAsIDI5MCk7XHJcbiAgICAvLyDmlofmnKxcclxuICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ3RvcCc7XHJcbiAgICAvLyDml6XmnJ9cclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgY29udGV4dC5mb250ID0gJzEwcHggXyc7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHRvZGF5LnRvTG9jYWxlRGF0ZVN0cmluZygpLCAxNTAsIDEwKTtcclxuICAgIC8vIOa2iOaBr1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnI2ZmMDAwMCc7XHJcbiAgICBjb250ZXh0LmZvbnQgPSAnMTRweCBfJztcclxuICAgIGNvbnRleHQuZmlsbFRleHQobWVzc2FnZSwgMTI1LCAzMCk7XHJcbiAgICAvLyDmrKHmlbBcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMxMDk5MTAnO1xyXG4gICAgY29udGV4dC5mb250ID0gJzE2cHggXyc7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KGBHdWVzc2VzOiAke2d1ZXNzZXN9YCwgMjE1LCA1MCk7XHJcbiAgICAvLyDnu5PmnpxcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgY29udGV4dC5mb250ID0gJzE2cHggXyc7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KGBIaWdoZXIgT3IgTG93ZXI6ICR7aGlnaGVyT3JMb3dlcn1gLCAxNTAsIDEyNSk7XHJcbiAgICAvLyDnjJzov4fnmoTlrZfmr41cclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZjAwMDAnO1xyXG4gICAgY29udGV4dC5mb250ID0gJzE2cHggXyc7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KGBMZXR0ZXJzIEd1ZXNzZWQ6ICR7bGV0dGVyc0d1ZXNzZWQuam9pbigpfWAsIDEwLCAyNjApO1xyXG5cclxuICAgIGlmIChnYW1lT3Zlcikge1xyXG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmYwMDAwJztcclxuICAgICAgY29udGV4dC5mb250ID0gJzQwcHggXyc7XHJcbiAgICAgIGNvbnRleHQuZmlsbFRleHQoJ1lvdSBHb3QgSXQhJywgMTUwLCAxODApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdEdhbWUoKTtcclxufSk7XHJcbiJdfQ==