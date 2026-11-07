import { GrafLib } from "./lib/libA.js";
import { Snake } from "./lib/snake.js";
import { Apple } from "./lib/apple.js";

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

let ukuranKotak = 40;
let kolom = canvas_handler.width / ukuranKotak;
let baris = canvas_handler.height / ukuranKotak;

let apple = new Apple(kolom, baris);
apple.spawnApple(snake);

// Posisi awal snake
let dx = 1;
let dy = 0;
// Arah yang diminta pemain, baru dipakai di langkah berikutnya
let dxBaru = 1;
let dyBaru = 0;

let skor = 0;
let status = "main"; // "main", "kalah", atau "menang"

// Ganti arah, tapi tidak boleh balik arah 180 derajat (nabrak badan sendiri)
function ubahArah(x, y) {
    if (x === -dx && y === -dy) return;
    dxBaru = x;
    dyBaru = y;
}

document.getElementById("btn-atas").addEventListener("click", function() {
    ubahArah(0, -1);
});

document.getElementById("btn-bawah").addEventListener("click", function() {
    ubahArah(0, 1);
});

document.getElementById("btn-kiri").addEventListener("click", function() {
    ubahArah(-1, 0);
});

document.getElementById("btn-kanan").addEventListener("click", function() {
    ubahArah(1, 0);
});

// Kontrol keyboard (panah / WASD), Spasi atau Enter untuk main lagi
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp" || e.key === "w") ubahArah(0, -1);
    else if (e.key === "ArrowDown" || e.key === "s") ubahArah(0, 1);
    else if (e.key === "ArrowLeft" || e.key === "a") ubahArah(-1, 0);
    else if (e.key === "ArrowRight" || e.key === "d") ubahArah(1, 0);
    else if ((e.key === " " || e.key === "Enter") && status !== "main") mulaiLagi();
    else return;
    e.preventDefault();
});

document.getElementById("btn-restart").addEventListener("click", function() {
    mulaiLagi();
});

function mulaiLagi() {
    snake = new Snake(5,5);
    apple.spawnApple(snake);
    dx = 1;
    dy = 0;
    dxBaru = 1;
    dyBaru = 0;
    skor = 0;
    status = "main";
}

// Gambar semua (background, apel, snake) lalu tulis skor
function gambarSemua() {
    lib.background({r : 255, g : 255, b : 255});
    if (status !== "menang") apple.drawApple(lib, ukuranKotak);
    // (dx, dy) is used to determine the direction of the snake's head for drawing the eyes correctly
    snake.drawSnake(lib, ukuranKotak, dx, dy);

    context.putImageData(lib.image_data, 0, 0);

    context.font = "bold 20px sans-serif";
    context.textAlign = "left";
    context.fillStyle = "white";
    context.fillText("Skor: " + skor, 10, 26);

    if (status !== "main") {
        context.fillStyle = "rgba(0, 0, 0, 0.55)";
        context.fillRect(0, 0, canvas_handler.width, canvas_handler.height);
        context.fillStyle = "white";
        context.textAlign = "center";
        context.font = "bold 40px sans-serif";
        context.fillText(status === "menang" ? "MENANG!" : "GAME OVER", canvas_handler.width / 2, canvas_handler.height / 2 - 10);
        context.font = "20px sans-serif";
        context.fillText("Skor: " + skor + " | Tekan Spasi / Enter untuk main lagi", canvas_handler.width / 2, canvas_handler.height / 2 + 30);
    }
}

// Pergerakan ular
setInterval(() => {
    if (status !== "main") return;

    dx = dxBaru;
    dy = dyBaru;

    // Nabrak dinding? dicek sebelum snake gerak
    if (snake.willHitWall(dx, dy, kolom, baris)) {
        status = "kalah";
        gambarSemua();
        return;
    }

    snake.moveSnake(dx, dy);

    // Nabrak badan sendiri?
    if (snake.hitsSelf()) {
        status = "kalah";
        gambarSemua();
        return;
    }

    // Makan apel: snake nambah panjang, skor naik, apel pindah ke kotak kosong
    if (apple.isEaten(snake)) {
        snake.addNode();
        skor++;
        if (!apple.spawnApple(snake)) {
            status = "menang"; // grid sudah penuh
        }
    }

    // clear prev image lalu redraw
    gambarSemua();
}, 250); // 250 (interval ms) = 0,25 detik