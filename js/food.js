function Food(_score, _time) {
    var size = config.size;

    this.score = _score || 1;
    this.time  = _time || -1;
    this.x = Math.floor(Math.random() * config.width);
    this.y = Math.floor(Math.random() * config.height);

    config.context.fillStyle = "#3f51b5";
    config.context.fillRect(this.x * size, this.y * size, size, size);
}