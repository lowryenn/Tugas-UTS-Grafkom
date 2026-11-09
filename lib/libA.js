let width = 400

export class GrafLib {
    constructor(width, height, image_data){
        this.width = width;
        this.height = height;
        this.image_data = image_data;
    }

    draw_dot(x, y, color) {
        // kalau titiknya di luar canvas, jangan digambar
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;

        let index = 4*(x + (y * this.width));
        this.image_data.data[index] = color.r;
        this.image_data.data[index+1] = color.g;
        this.image_data.data[index+2] = color.b;
        this.image_data.data[index+3] = 255;
    }

    background(color) {
        let ukuranKotak = 40; 
        
        let warna1 = {r: 170, g: 215, b: 81}; // Hijau terang
        let warna2 = {r: 162, g: 209, b: 73}; // Hijau gelap

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let kolom = Math.floor(x / ukuranKotak);
                let baris = Math.floor(y / ukuranKotak);

                if ((kolom + baris) % 2 === 0) {
                    this.draw_dot(x, y, warna1);
                } else {
                    this.draw_dot(x, y, warna2);
                }   
            }
        }
    }

    polygon(kump_titik, color) {
        if (!kump_titik || kump_titik.length < 2) return;
        for (let i = 0; i < kump_titik.length - 1; i++) {
            this.dda_line(kump_titik[i].x, kump_titik[i+1].x, kump_titik[i].y, kump_titik[i+1].y, color);
        }
        this.dda_line(kump_titik[kump_titik.length-1].x, kump_titik[0].x, kump_titik[kump_titik.length-1].y, kump_titik[0].y, color);
    }

    dda_line(x1, x2, y1, y2, color) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let step = Math.max(Math.abs(dx), Math.abs(dy));

        // kalau titiknya sama, gambar satu titik aja
        if (step === 0) {
            this.draw_dot(x1, y1, color);
            return;
        }

        let x_inc = dx / step;
        let y_inc = dy / step;
        let x = x1;
        let y = y1;

        for (let i = 0; i <= step; i++) {
            this.draw_dot(Math.round(x), Math.round(y), color);
            x += x_inc;
            y += y_inc;
        }
    }

        // for (let x = 0; x <= this.width; x++) {
        //     // garis horizontal
        //     if (x % 40 == 0) {
        //         let i = 0;
        //         for (let y = 0; y <= this.height; y++) {
        //             if (i%2 != 0){
        //                 this.floodFillStack(0, 0, {r:0,g:0,b:0}, {r:0,g:128,b:0})
        //             } else {
        //                 i += 1
        //             }
        //             this.draw_dot(x, y, {r:255,g:0,b:0});
        //             // garis vertikal
        //             if (y % 40 == 0) {
        //                 for (let k = 0; k <= this.width; k++) {
        //                     this.draw_dot(k, y, {r:255,g:0,b:0});
        //                 }
        //             }
        //         }
        //     }
        // }
    

    gbr_lingkaran(xc, yc, radius, color) {
        // sapu berdasarkan x
        for (let x = xc-radius; x <= xc+radius; x++) {
            var y = yc + Math.sqrt(radius*radius - (x-xc)*(x-xc));
            this.draw_dot(Math.ceil(x), Math.ceil(y), color);
            var y = yc - Math.sqrt(radius*radius - (x-xc)*(x-xc));
            this.draw_dot(Math.ceil(x), Math.ceil(y), color);
        }
        // sapu berdasarkan y supaya lingkarannya ga bolong
        for (let y = yc-radius; y <= yc+radius; y++) {
            var x = xc + Math.sqrt(radius*radius - (y-yc)*(y-yc));
            this.draw_dot(Math.ceil(x), Math.ceil(y), color);
            var x = xc - Math.sqrt(radius*radius - (y-yc)*(y-yc));
            this.draw_dot(Math.ceil(x), Math.ceil(y), color);
        }
    }

    floodFillStack(x0, y0, to_flood, color) {
        var tumpukan = [];
        tumpukan.push({ x: x0, y: y0 });

        while (tumpukan.length > 0) {
            var titik_sekarang = tumpukan.pop();
            
            if (titik_sekarang.x < 0 || titik_sekarang.x >= this.width || titik_sekarang.y < 0 || titik_sekarang.y >= this.height) {
                continue;
            }

            var index_sekarang = 4 * (titik_sekarang.x + (titik_sekarang.y * this.width));

            var r1 = this.image_data.data[index_sekarang];
            var g1 = this.image_data.data[index_sekarang + 1];
            var b1 = this.image_data.data[index_sekarang + 2];

            if (r1 === to_flood.r && g1 === to_flood.g && b1 === to_flood.b) {

                this.image_data.data[index_sekarang] = color.r;
                this.image_data.data[index_sekarang + 1] = color.g;
                this.image_data.data[index_sekarang + 2] = color.b;
                this.image_data.data[index_sekarang + 3] = 255;

                tumpukan.push({ x: titik_sekarang.x + 1, y: titik_sekarang.y }); // Kanan
                tumpukan.push({ x: titik_sekarang.x - 1, y: titik_sekarang.y }); // Kiri
                tumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y + 1 }); // Bawah
                tumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y - 1 }); // Atas
            }
        }
    }

    lingkaran_polar(xc, yc, radius, color) {
        for (var theta = 0; theta < Math.PI*2; theta += 0.01) {
            let x = xc + radius * Math.cos(theta);
            let y = yc + radius * Math.sin(theta);
            this.draw_dot(Math.ceil(x), Math.ceil(y), color);
        }
    }

    elipse(xc, yc, rx, ry, color) {
        for (var theta = 0; theta < Math.PI*2; theta += 0.01) {
            let x = xc + rx * Math.cos(theta);
            let y = yc + ry * Math.sin(theta);
            this.draw_dot(Math.ceil(x), Math.ceil(y), color);
        }
    }

    siput(xc, yc, color) {
        for (var theta = 0; theta <= Math.PI*10; theta += 0.01) {
            let r = 6 * theta;
            let x = xc + r * Math.cos(theta);
            let y = yc + r * Math.sin(theta);
            this.draw_dot(Math.ceil(x), Math.ceil(y), color);
        }
    }

    bunga(xc, yc, n, color) {
        for (var theta = 0; theta <= Math.PI*100; theta += 0.001) {
            let r = 6 * theta;
            let x = xc + r * Math.cos(n*theta) * Math.cos(theta);
            let y = yc + r * Math.cos(n*theta) * Math.sin(theta);
            this.draw_dot(Math.ceil(x), Math.ceil(y), color);
        }
    }
}


// var i = 0
// ketika x != width
// dari x = 0 sampe ujung
// dari y = 0 sampe ujung
// kalo i%2 != 0
// warnain x y color
// else: warnain x y color

// let i = 0;
// while (x != this.width){
//     for(let x = 0; x <= this.width; x++){
//         for(let y = 0; y <= this.height; y++){
//             if (i%2 != 0){
//                 this.floodFillStack(x, y, {r:0,g:0,b:0}, {r:0,g:128,b:0})
//             } else {
//                 this.floodFillStack(x, y, {r:0,g:0,b:0}, {r:255,g:0,b:0})
//             }
//         }
//     }
// }