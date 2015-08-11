!function() {
    var config = {},
        width = 30,
        height = 30,
        speed = 1,
        size = 10;

    config.init = function() {
        var gameZone = document.getElementById("game-zone");
        if (!gameZone.getContext) {
            // 环境不支持游戏
            alert('您的浏览器版本太低，请您使用更高级的浏览器来运行');
            return;
        } else {
            this.context = gameZone.getContext("2d");
        }
    };
    config.speedup = function() {
        if (speed < 5){
            speed ++;
        }
    };
    config.speeddown = function() {
        if (speed > 1) {
            speed --;
        }
    };
    config.getSpeed = function() {
        return speed;
    };
    config.getWidth = function() {
        return width;
    };
    config.getHeight = function() {
        return height;
    };
    config.getSize = function() {
        return size;
    };

    window.config = config;
}();