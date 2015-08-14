!function() {
    var game = {},
        score = 0,
        food = null,
        status = '',
        moveTimeout = null,
        scoreText = document.getElementById('score'),
        controller = document.getElementById('controller');

    game.init = function() {
        var gameZone = document.getElementById("game-zone");
        if (!gameZone.getContext) {
            // 环境不支持游戏
            alert('您的浏览器版本太低，请您使用更高级的浏览器来运行');
            return;
        } else {
            config.context = gameZone.getContext("2d");
        }
        snack.init();
        food = new Food();
    };
    game.addScore = function(_score) {
        score += _score
        scoreText.innerHTML = score;
        if (score % 10 == 0) {
            snack.speedUp();
        }
    };
    game.start = function() {
        var _this = this;

        status = 'start';
        controller.innerHTML = "暂停";

        moveTimeout = setTimeout(function action() {
            if (!snack.move()) {
                _this.fail();
                return;
            } else {
                if (snack.eat(food)) {
                    _this.addScore(food.score);
                    food = new Food();
                }
                moveTimeout = setTimeout(action, snack.getSpeed());
            }
        }, snack.getSpeed());
    };
    game.pause = function() {
        status = 'pause';
        controller.innerHTML = "继续";
        clearTimeout(moveTimeout);
    };
    game.fail = function() {
        status = 'fail';
        controller.innerHTML = "再来一局";
        
        this.showInfo("你输啦");
    };
    game.succ = function() {
        status = 'success';
        controller.innerHTML = "再来一局";
        
        this.showInfo("你赢啦");
    };
    game.reset = function() {
        this.hideInfo();
        
        score = 0;
        scoreText.innerHTML = score;
        config.context.clearRect(0, 0, config.width * config.size, config.height * config.size);
        
        // 先清除画布，再绘制蛇和食物
        snack.reset();
        food = new Food();
    };
    game.getStatus = function() {
        return status;
    };
    game.showInfo = function(text) {
        var info = document.getElementById("result");
        
        info.innerHTML = text;
        info.style.opacity = "1";
    };
    game.hideInfo = function() {
        var info = document.getElementById("result");
        info.style.opacity = "0";
    };

    window.game = game;
}();