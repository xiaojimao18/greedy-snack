!function() {
    var game = {},
        food = null,
        snack = null,
        timeout = null,
        score = 0,
        status = '',
        scoreText = document.getElementById('score'),
        controller = document.getElementById('controller');

    game.init = function() {
        food = new Food();
        snack = new Snack();
    };
    game.start = function() {
        var _this = this;

        status = 'start';
        controller.innerHTML = "暂停";
        food  = food == null ? new Food() : food;
        snack = snack == null ? new Snack() : snack;

        timeout = setTimeout(function action() {
            if (!snack.move()) {
                _this.fail();
            } else {
                if (snack.eat(food)) {
                    _this.addScore(food.score);
                    food = new Food();
                }
                timeout = setTimeout(action, 250 - 50 * config.getSpeed());
            }
        }, 200 / config.getSpeed());
    };
    game.pause = function() {
        status = 'pause';
        controller.innerHTML = "继续";
        clearTimeout(timeout);
    };
    game.continue = function() {
        var _this = this;

        status = 'start';
        controller.innerHTML = "暂停";
        timeout = setInterval(function() {
            if (!snack.move()) {
                _this.fail();
            } else {
                if (snack.eat(food)) {
                    _this.addScore(food.score);
                    food = new Food();
                }
                timeout = setTimeout(action, 250 - 50 * config.getSpeed());
            }
        }, 200 / config.getSpeed());
    };
    game.fail = function() {
        status = 'fail';
        controller.innerHTML = "再来一局";
    };
    game.succ = function() {
        status = 'success';
        controller.innerHTML = "再来一局";
    };
    game.addScore = function(_score) {
        score += _score
        scoreText.innerHTML = score;
        if (score % 10 == 0) {
            config.speedup();
        }
    };
    game.reset = function() {
        score = 0;
        scoreText.innerHTML = score;
        food = null;
        snack = null;
        config.resetSpeed();
        config.context.clearRect(0, 0, config.getWidth() * config.getSize(), config.getHeight() * config.getSize());
    };

    // 按键调整方向
    function keyDirection(e) {
        if (snack !== null && snack.changeDir) {
            snack.changeDir = false;
            switch(e.keyCode) {
                case 38: // 向上
                    if (snack.direction != 2) {
                        snack.direction = 0; 
                    }
                    break;
                case 39: // 向右
                    if (snack.direction != 3) {
                        snack.direction = 1; 
                    }
                    break;
                case 40: // 向下
                    if (snack.direction != 0) {
                        snack.direction = 2; 
                    }
                    break;
                case 37: // 向左
                    if (snack.direction != 1) {
                        snack.direction = 3;
                    }
                    break;
            }
        }
    }

    // 触摸调整方向
    var StartX = null,
        StartY = null,
        dirTimeout = null;
    function touchDirection(e) {
        e.preventDefault();
        if (dirTimeout == null) {
            StartX = e.targetTouches[0].pageX;
            StartY = e.targetTouches[0].pageY;
        } else {
            clearTimeout(dirTimeout);
        }

        dirTimeout = setTimeout(function() {
            var xMove = e.targetTouches[0].pageX - StartX,
                yMove = e.targetTouches[0].pageY - StartY;
            if (snack.changeDir) {
                if (Math.abs(xMove) < Math.abs(yMove) && yMove < 0) {
                    // 向上
                    if (snack.direction != 2) {
                        snack.direction = 0; 
                    }
                } else if (Math.abs(xMove) > Math.abs(yMove) && xMove > 0) {
                    // 向右
                    if (snack.direction != 3) {
                        snack.direction = 1; 
                    }
                } else if (Math.abs(xMove) < Math.abs(yMove) && yMove > 0) {
                    // 向下
                    if (snack.direction != 0) {
                        snack.direction = 2; 
                    }
                } else {
                    // 向左
                    if (snack.direction != 1) {
                        snack.direction = 3;
                    }
                }
            }
            dirTimeout = null;
        }, 30);
    }

    // 绑定开始事件
    function startControl() {
        if (status == '') {
            // 第一次开始
            game.start();
        } else if (status == 'fail' || status == 'success') {
            // 并不是第一次，清除上一次记录再开始
            game.reset();
            game.start();
        } else if (status == 'start') {
            game.pause();
        } else if (status == 'pause') {
            game.continue();
        }
    }

    document.body.addEventListener("keydown", keyDirection, false);
    document.body.addEventListener("touchmove", touchDirection, false);
    controller.addEventListener("click", startControl, false);
    controller.addEventListener("tap", startControl, false);

    window.game = game;
}();