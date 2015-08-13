!function() {
    var snack = {};
    
    var track = [],       // 蛇身轨迹
        head = null,      // 蛇头位置
        speed = 250,      // 蛇的速度
        snackLen = 5,     // 蛇身长
        direction = 1,    // 方向：0-上;1-右;2-下;3-左
        dirQueue = [],    // 待处理方向队列
        dirQueueMax = 3;  // 待处理方向队列最大长度

    snack.init = function() {
        for (var i = 0; i < snackLen; i ++) {
            track.push({x:i,y:0});
            config.context.fillStyle = "#333";
            config.context.fillRect(i * config.size, 0, config.size, config.size);
        }
        head = {
            x: i - 1,
            y: 0
        };
    };

    snack.reset = function() {
        track = [];
        speed = 250;
        snackLen = 5;
        direction = 1;
        dirQueue = [];
        
        this.init(); 
    };
    snack.speedUp = function() {
        if (speed > 50) {
            speed -= 50;
        }  
    };
    snack.getSpeed = function() {
        return speed;
    };
    snack.pushDirection = function(dir) {
        if (dirQueue.length < dirQueueMax) {
            dirQueue.push(dir);   
        }
    };
    snack.move = function() {
        var size = config.size;
    
        // 根据方向队列改变方向
        while (dirQueue.length > 0) {
            var dir = dirQueue.shift();
            if (dir == direction || Math.abs(direction - dir) == 2) {
                // 相同方向或者相反，则不改变方向
                continue;
            } else {
                direction = dir;
                break;
            }
        }
    
        // 根据方向移动
        switch(direction) {
            case 0: head.y -= 1; break;
            case 1: head.x += 1; break;
            case 2: head.y += 1; break;
            case 3: head.x -= 1; break;
        }
        
        // 如果撞到墙壁或者自己，则失败
        if (this.crash()) {
            return false;
        }
    
        // 绘制头部
        track.push({x:head.x, y:head.y});
        config.context.fillStyle = "#333";
        config.context.fillRect(head.x * size, head.y * size, size, size);
    
        // 清除尾部
        if (snackLen < track.length) {
            var last = track.shift();
            config.context.clearRect(last['x'] * size, last['y'] * size, size, size);
        }
    
        return true;
    };
    snack.eat = function(food) {
        var size = config.size;
    
        if (head.x == food.x && head.y == food.y) {
            snackLen ++;
            config.context.fillStyle = "#333";
            config.context.fillRect(head.x * size, head.y * size, size, size);
            return true;
        } else {
            return false;
        }
    };
    snack.onbody = function(_x, _y) {
        for (var i = 0; i < track.length; i ++) {
            if (track[i].x == _x && track[i].y == _y) {
                return true;
            }
        }
    
        return false;
    }
    // 撞到墙壁或者自己
    snack.crash = function() {
        if (head.x < 0 || head.x > config.width) {
            return true;
        } else if (head.y < 0 || head.y > config.height) {
            return true;
        }
    
        return this.onbody(head.x, head.y);
    };
    
    window.snack = snack;
}();

