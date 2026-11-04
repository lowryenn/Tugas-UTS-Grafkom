import { Node } from "./node.js";

export class Snake {
    // Ular butuh posisi awal
    constructor(startX, startY) {
        this.head = new Node(startX, startY);
        this.tail = this.head;
    }

    addNode() {
        let newNode = new Node(this.tail.x, this.tail.y);
        this.tail.next = newNode;
        this.tail = newNode;
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

    drawSnake(grafLib, ukuranKotak) {
        let current = this.head;
        let isHead = true;

        while (current) {
            // Kita bisa bedakan warna kepala dan badan
            let color = isHead ? {r: 0, g: 0, b: 255} : {r: 0, g: 150, b: 255}; 
            current.tambahEkor(grafLib, ukuranKotak, color);
            
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