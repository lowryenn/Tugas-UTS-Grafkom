import { GrafLib } from "./lib/libA.js";
import { Snake } from "./lib/snake.js";

let canvas_handler = document.getElementById("mycanvas");
let context = canvas_handler.getContext("2d");
const image_data = context.createImageData(canvas_handler.width, canvas_handler.height);

let lib = new GrafLib(canvas_handler.width, canvas_handler.height, image_data);
let snake = new Snake(5,5)

let array_titik = [
    {x: 100, y: 100},
    {x: 100, y: 200},
    {x: 200, y: 100}
]


// lib.polygon(array_titik, red_color);
// let array_titik_baru = lib.translation_multiple(array_titik, {x: 100, y: 50});
// lib.polygon(array_titik_baru, blue_color);
// context.putImageData(lib.image_data, 0, 0);

// setInterval(() => {
//     context.clearRect(0, 0, canvas_handler.width, canvas_handler.height);
//     lib.image_data = context.createImageData(canvas_handler.width, canvas_handler.height);
//     lib.polygon(array_titik, red_color);
//     array_titik_baru = lib.translation_multiple(array_titik_baru, {x: 1, y: 0});
//     lib.polygon(array_titik_baru, blue_color);
//     context.putImageData(lib.image_data, 0, 0);
// }, 50);


// for (let i = 0; i <= 400; i += 5){
//     // garis dasar 
//     if (i % 10 == 0){
//         for (let j = 0; j <= 400; j ++){
//             lib.draw_dot(i, j, {r:255,g:0,b:0});
//             if (j % 10 == 0){
//                 for (let k = 0; k <= 400; k++){
//                     lib.draw_dot(k, i, {r:255,g:0,b:0});
//                 }
//             }
//         }
//     }
//     if (i % 50 == 0){
//         for (let j = 0; j <= 400; j++){
//             lib.draw_dot(j, i+1, {r:255,g:0,b:0});
//             if (j % 50 == 0){
//                 for (let k = 0; k <= 400; k++){
//                     lib.draw_dot(i+1, k, {r:255,g:0,b:0});
//                 }
//             }
//         }
//     }
// }


lib.background({r:255,g:255,b:255});

// function start(){
//     let ukuranKotak = 40
//     snake.moveSnake(120, 120);
//     snake.drawSnake(GrafLib, ukuranKotak);
// }

setInterval(() => {
    let ukuranKotak = 40
    snake.moveSnake(1, 0);
    snake.drawSnake(lib, ukuranKotak);
    context.putImageData(lib.image_data, 0, 0);
}, 150);

// setInterval.addEventlistener("click")

context.putImageData(image_data,0,0);