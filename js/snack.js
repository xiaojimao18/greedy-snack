function Snack() {
    this.snackLen  = 5;    // 蛇身长
    this.direction = 1;    // 方向：0-上;1-右;2-下;3-左
    this.track = [];       // 蛇身轨迹
    this.head = null;      // 蛇头位置
    this.changeDir = true; // 能否改变蛇的方向，只有在走了一步以后才能改变方向

    for (var i = 0; i < this.snackLen; i ++) {
        config.context.fillStyle = "#333";
        config.context.fillRect(i * config.getSize(), 0, config.getSize(), config.getSize());
        this.track.push({x:i,y:0});
    }
    this.head = {x:i -1, y:0};
}

Snack.prototype.move = function() {
    var size = config.getSize();

    // 是否允许改变方向
    this.changeDir = true;

    // 改变方向
    switch(this.direction) {
        case 0: this.head.y -= 1; break;
        case 1: this.head.x += 1; break;
        case 2: this.head.y += 1; break;
        case 3: this.head.x -= 1; break;
    }
    if (this.crash()) {
        return false;
    }

    // 绘制头部
    this.track.push({x:this.head.x, y:this.head.y});
    config.context.fillStyle = "#333";
    config.context.fillRect(this.head.x * size, this.head.y * size, size, size);

    // 清除尾部
    if (this.snackLen < this.track.length) {
        var last = this.track.shift();
        config.context.clearRect(last['x'] * size, last['y'] * size, size, size);
    }

    return true;
};
Snack.prototype.eat = function(food) {
    var size = config.getSize();

    if (this.head.x == food.x && this.head.y == food.y) {
        this.snackLen ++;
        config.context.fillStyle = "#333";
        config.context.fillRect(this.head.x * size, this.head.y * size, size, size);
        return true;
    } else {
        return false;
    }
};

// 撞到墙壁或者自己
Snack.prototype.crash = function() {
    if (this.head.x < 0 || this.head.x > config.getWidth()) {
        return true;
    } else if (this.head.y < 0 || this.head.y > config.getHeight()) {
        return true;
    }

    for (var i = 0; i < this.track.length; i ++) {
        if (this.track[i].x == this.head.x && this.track[i].y == this.head.y) {
            return true;
        }
    }

    return false;
};