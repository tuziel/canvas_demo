"use strict";
window.addEventListener('load', function () {
    var canUseCanvas = !!document.createElement('canvas').getContext;
    if (!canUseCanvas) {
        return;
    }
    var app = document.getElementById('app');
    var context = app.getContext('2d');
    context.fillStyle = '#ffffaa';
    context.fillRect(0, 0, 500, 300);
    context.fillStyle = '#000000';
    context.font = '20px Sans-Serif';
    context.textBaseline = 'top';
    context.fillText('Hello World!', 195, 80);
    var hwImg = new Image();
    hwImg.addEventListener('load', function () {
        context.drawImage(hwImg, 160, 130);
    });
    hwImg.src = 'hello-world.jpg';
    context.strokeStyle = '#000000';
    context.strokeRect(5, 5, 490, 290);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtJQUM5QixJQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDbkUsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixPQUFPO0tBQ1I7SUFFRCxJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBc0IsQ0FBQztJQUNoRSxJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO0lBRXRDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakMsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDOUIsT0FBTyxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztJQUNqQyxPQUFPLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM3QixPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFMUMsSUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUMxQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1FBQzdCLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxHQUFHLEdBQUcsaUJBQWlCLENBQUM7SUFFOUIsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7SUFDaEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUVyQyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gIGNvbnN0IGNhblVzZUNhbnZhcyA9ICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dDtcclxuICBpZiAoIWNhblVzZUNhbnZhcykge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhcHAuZ2V0Q29udGV4dCgnMmQnKSE7XHJcblxyXG4gIGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmZmYWEnO1xyXG4gIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgNTAwLCAzMDApO1xyXG4gIGNvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xyXG4gIGNvbnRleHQuZm9udCA9ICcyMHB4IFNhbnMtU2VyaWYnO1xyXG4gIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ3RvcCc7XHJcbiAgY29udGV4dC5maWxsVGV4dCgnSGVsbG8gV29ybGQhJywgMTk1LCA4MCk7XHJcblxyXG4gIGNvbnN0IGh3SW1nID0gbmV3IEltYWdlKCk7XHJcbiAgaHdJbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGh3SW1nLCAxNjAsIDEzMCk7XHJcbiAgfSk7XHJcbiAgaHdJbWcuc3JjID0gJ2hlbGxvLXdvcmxkLmpwZyc7XHJcblxyXG4gIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XHJcbiAgY29udGV4dC5zdHJva2VSZWN0KDUsIDUsIDQ5MCwgMjkwKTtcclxuXHJcbn0pO1xyXG4iXX0=