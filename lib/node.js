import { GrafLib } from "./libA.js";
let graflib = new GrafLib();

export class Node {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.next = null
    }

    tambahEkor(graflib, ukuranKotak, color) {
        let x = this.x * ukuranKotak
        let y = this.y * ukuranKotak

        for(let i = 0; i < ukuranKotak; i++){
            for(let j = 0; j < ukuranKotak; j++){
                graflib.draw_dot(x+i, y+j, color)
            }
        }
    }
}


// class Node {
//     constructor(value) {
//         this.info = value
//         this.next = null
//     }
// }

// class MyList{ 
//     constructor(){
//         this.head = null
//         this.tail = null
//         this.top = null
//     }

//     InsertLast(Q){ 
//         if (this.head == null){
//             this.head = Q
//             this.tail = Q
//         } else {
//             this.tail.next = Q
//             this.tail = Q
//         }
//     }
// }