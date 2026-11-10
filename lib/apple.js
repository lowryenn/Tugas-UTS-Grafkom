export class Apple {
    // kolom & baris = jumlah kotak di grid
    constructor(kolom, baris) {
        this.kolom = kolom;
        this.baris = baris;
        this.x = 0;
        this.y = 0;
    }

    // Taruh apel di kotak yang kosong (bukan di badan snake)
    // return false kalau grid sudah penuh
    spawnApple(snake) {
        let kosong = [];
        for (let x = 0; x < this.kolom; x++) {
            for (let y = 0; y < this.baris; y++) {
                if (!snake.occupies(x, y)) {  // Pengecekan di titik x,y ada badan & kepala ular 
                    kosong.push({ x: x, y: y });
                }
            }
        }

        if (kosong.length === 0) return false;

        let pilih = kosong[Math.floor(Math.random() * kosong.length)];
        this.x = pilih.x;
        this.y = pilih.y;
        return true;
    }

    // Apel dimakan kalau kepala snake ada di kotak yang sama
    isEaten(snake) {
        return snake.head.x === this.x && snake.head.y === this.y;
    }

    drawApple(grafLib, ukuranKotak) {
        let merah = { r: 215, g: 35, b: 35 };
        let kilau = { r: 255, g: 150, b: 150 };
        let coklat = { r: 110, g: 70, b: 30 };
        let hijau = { r: 30, g: 140, b: 40 };

        // titik tengah apel
        let cx = this.x * ukuranKotak + 20;
        let cy = this.y * ukuranKotak + 20;
        let radius = 14;

        // badan apel (lingkaran penuh)
        for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
                if (i * i + j * j <= radius * radius) {
                    grafLib.draw_dot(cx + i, cy + j, merah);
                }
            }
        }

        // kilau
        for (let i = -3; i <= 3; i++) {
            for (let j = -3; j <= 3; j++) {
                if (i * i + j * j <= 9) {
                    grafLib.draw_dot(cx - 5 + i, cy - 5 + j, kilau);
                }
            }
        }

        // tangkai 3x6 pixel
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 6; j++) {
                grafLib.draw_dot(cx - 1 + i, cy - radius - 4 + j, coklat);
            }
        }

        // daun
        for (let i = -4; i <= 4; i++) {
            for (let j = -4; j <= 4; j++) {
                if (i * i + j * j <= 16) {
                    grafLib.draw_dot(cx + 6 + i, cy - radius - 2 + j, hijau);
                }
            }
        }
    }
}
