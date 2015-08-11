!function() {
    var game = {},
        food = null,
        snack = null,
        interval = null,
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

        interval = setInterval(function action() {
            if (!snack.move()) {
                _this.fail();
            } else {
                if (snack.eat(food)) {
                    _this.addScore(food.score);
                    food = new Food();
                }
            }
        }, 200 / config.getSpeed());
    };
    game.pause = function() {
        status = 'pause';
        controller.innerHTML = "继续";
        clearInterval(interval);
    };
    game.continue = function() {
        var _this = this;

        status = 'start';
        controller.innerHTML = "暂停";
        interval = setInterval(function() {
            if (!snack.move()) {
                _this.fail();
            } else {
                if (snack.eat(food)) {
                    _this.addScore(food.score);
                    food = new Food();
                }
            }
        }, 200 / config.getSpeed());
    };
    game.fail = function() {
        clearInterval(interval);
        status = 'fail';
    };
    game.succ = function() {
        clearInterval(interval);
        status = 'success';
    };
    game.addScore = function(_score) {
        score += _score
        scoreText.innerHTML = score;
        if (score % 10 == 0) {
            config.speedup();
        }
    };
    game.reset = function() {
        config.context.clearRect(0, 0, config.getWidth() * config.getSize(), config.getHeight() * config.getSize());
        controller.innerHTML = "再来一局";
        food = null;
        snack = null;
    };

    // 按键调整方向
    document.body.onkeydown = function(e) {
        if (snack !== null && snack.changeDir) {
            snack.changeDir = false;
            switch(e.keyCode) {
                case 38: 
                    if (snack.direction != 2) {
                        snack.direction = 0; 
                    }
                    break;
                case 39: 
                    if (snack.direction != 3) {
                        snack.direction = 1; 
                    }
                    break;
                case 40: 
                    if (snack.direction != 0) {
                        snack.direction = 2; 
                    }
                    break;
                case 37:
                    if (snack.direction != 1) {
                        snack.direction = 3;
                    }
                    break;
            }
        }
    };

    // 绑定开始事件
    controller.onclick = function() {
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
    };

    window.game = game;
}();