import { Node } from "./node.js";

export class Snake {
    // Ular butuh posisi awal
    constructor(startX, startY) {
        this.head = new Node(startX, startY);
        this.tail = this.head;
    }

    addNode() {
        let newNode = new Node(this.tail.x, this.tail.y);
        this.tail.next = newNode; // Buat sambungin ekor lama ke node baru
        this.tail = newNode; // Jadi node baru buat si ujung ekor
    }

    // dx dan dy adalah arah (contoh: dx=1, dy=0 berarti ke kanan)
    moveSnake(dx, dy) {
        // 1. Simpan posisi kepala sebelum digerakkan
        let prevX = this.head.x;
        let prevY = this.head.y;

        // 2. Majukan kepala
        this.head.x += dx;
        this.head.y += dy;

        // 3. Lakukan estafet posisi untuk sisa tubuhnya
        let current = this.head.next;
        while (current) {
            // Simpan posisi node ini sekarang (untuk diberikan ke node di belakangnya)
            let tempX = current.x;
            let tempY = current.y;

            // Beri node ini bekas posisi node di depannya
            current.x = prevX;
            current.y = prevY;

            // Update prevX dan prevY untuk iterasi node selanjutnya
            prevX = tempX;
            prevY = tempY;

            current = current.next;
        }
    }

    // Cek apakah ada bagian snake di kotak (x, y)
    occupies(x, y) {
        let current = this.head;
        while (current) {
            if (current.x === x && current.y === y) return true;
            current = current.next;
        }
        return false;
    }

    // Cek apakah kepala nabrak badannya sendiri (dipanggil setelah moveSnake)
    hitsSelf() {
        let current = this.head.next;
        while (current) {
            if (current.x === this.head.x && current.y === this.head.y) return true;
            current = current.next;
        }
        return false;
    }

    // Cek apakah kepala bakal keluar grid kalau jalan ke arah (dx, dy)
    willHitWall(dx, dy, kolom, baris) {
        let nextX = this.head.x + dx;
        let nextY = this.head.y + dy;
        return nextX < 0 || nextX >= kolom || nextY < 0 || nextY >= baris;
    }

    drawSnake(grafLib, ukuranKotak, dx, dy) {
        // Draw the snake's body and head
        let current = this.head;
        let isHead = true;

        // Linked List Looping
        while (current) {
            let color = isHead
                ? {r: 0, g: 0, b: 150}  // Darker blue for the head
                : {r: 0, g: 150, b: 255};   // Lighter blue for the body

            current.tambahEkor(grafLib, ukuranKotak, color);

            if (isHead) {
                let putih = {r: 255, g: 255, b: 255};
                let hitam = {r: 0, g: 0, b: 0};

                function gambarMata(mx, my, px, py) {
                    for (let i = 0; i < 8; i++) {  // Snake eye's 8x8 pixel
                        for (let j = 0; j < 8; j++) {
                            grafLib.draw_dot(x + mx + i, y + my + j, putih);
                        }
                    }

                    for (let i = 0; i < 4; i++) { // Snake pupil's 4x4 pixel
                        for (let j = 0; j < 4; j++) {
                            grafLib.draw_dot(x + px + i, y + py + j, hitam);
                        }
                    }
                }

                // determine head position
                let x = current.x * ukuranKotak;
                let y = current.y * ukuranKotak;

                if (dx === 1) {
                    gambarMata(25, 5, 30, 10);
                    gambarMata(25, 25, 30, 30);
                }
                else if (dx === -1) {
                    gambarMata(5, 5, 5, 10);
                    gambarMata(5, 25, 5, 30);
                }
                else if (dy === -1) {
                    gambarMata(5, 5, 10, 5);
                    gambarMata(25, 5, 30, 5);
                }
                else if (dy === 1) {
                    gambarMata(5, 25, 10, 30);
                    gambarMata(25, 25, 30, 30);
                }
            }
            // Next node
            isHead = false;
            current = current.next;
        }
    }
}


// import { Node } from "./node.js";

// class Snake {
//     constructor(){
//         this.head = new Node();
//         this.tail = this.head;
//     }

//     addNode(){
//         this.tail.next = new Node();
//         this.tail = this.tail.next;
//     }

//     moveSnake(){
//         let current = this.head;
//         while (current){
//             current.translation();
//             current = current.next;
//         }
//     }

//     drawSnake(){
//         let current = this.head;
//         while (current){
//             current.draw();
//             current = current.next;
//         }
//     }
    
// }