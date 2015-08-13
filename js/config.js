var config = {
    size: 13,
    width: 20,
    height: 20,
    context: null
};

!function() {
    // 按键调整方向
    function keyDirection(e) {
        switch(e.keyCode) {
            case 38: snack.pushDirection(0); break; // 向上
            case 39: snack.pushDirection(1); break; // 向右
            case 40: snack.pushDirection(2); break; // 向下
            case 37: snack.pushDirection(3); break; // 向左
        }
    }

    // 触摸调整方向
    var StartX = null,
        StartY = null,
        oneTouch = false;   // 是否是同一次move
    function touchStart(e) {
        StartX = e.targetTouches[0].pageX;
        StartY = e.targetTouches[0].pageY;
        oneTouch = true;
    }
    function touchMove(e) {
        e.preventDefault();

        if (oneTouch) {
            var xMove = e.targetTouches[0].pageX - StartX,
                yMove = e.targetTouches[0].pageY - StartY;
            if (Math.abs(xMove) < Math.abs(yMove) && yMove < 0) { // 向上
                snack.pushDirection(0);
            } else if (Math.abs(xMove) > Math.abs(yMove) && xMove > 0) { // 向右
                snack.pushDirection(1);
            } else if (Math.abs(xMove) < Math.abs(yMove) && yMove > 0) { // 向下
                snack.pushDirection(2);
            } else { // 向左
                snack.pushDirection(3);
            } 
            oneTouch = false;
        }

    }

    // 绑定开始事件
    function startControl() {
        var status = game.getStatus();
        
        if (status == '' || status == 'pause') {
            // 第一次开始
            game.start();
        } else if (status == 'fail' || status == 'success') {
            // 并不是第一次，清除上一次记录再开始
            game.reset();
            game.start();
        } else if (status == 'start') {
            game.pause();
        }
    }

    document.body.addEventListener("touchmove", touchMove, false);
    document.body.addEventListener("touchstart", touchStart, false);
    document.body.addEventListener("keydown", keyDirection, false);
    document.getElementById('controller').addEventListener("click", startControl, false);
}();
