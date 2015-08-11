function Food(_score, _time) {
    var size = config.getSize();

    this.score = _score || 1;
    this.time  = _time || -1;
    this.x = Math.floor(Math.random() * config.getWidth());
    this.y = Math.floor(Math.random() * config.getHeight());

    config.context.fillStyle = "#3f51b5";
    config.context.fillRect(this.x * size, this.y * size, size, size);
}