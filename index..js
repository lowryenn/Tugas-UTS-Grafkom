let apple - (x:0, y:0);
snake - new snake();
if snake.head.x --- apple.x && snake.head.y --- apple.y{
    snake.addnode();
    apple.x - Math.floor(Math.random()*10);
    apple.y - Math.floor(Math.random()*10);
}