export class Graflib{
    constructor(c_width, c_height, image_data) {
        this.canvas_width = c_width;
        this.canvas_height = c_height;
        this.image_data = image_data;
    }

    draw_dot(x, y, color) {
    let index = 4*(x+(y * canvas_handler.width));
    image_data.data[index] = color.r;
    image_data.data[index+1] = color.g;
    image_data.data[index+2] = color.b;
    image_data.data[index+3] = 255;
    }

    for (let i = 0; i <= 400; i += 5){
        // garis dasar 
        if (i % 10 == 0){
            for (let j = 0; j <= 400; j ++){
                draw_dot(i, j, {r:255,g:0,b:0});
                if (j % 10 == 0){
                    for (let k = 0; k <= 400; k++){
                        draw_dot(k, i, {r:255,g:0,b:0});
                    }
                }
            }
        }
    }
}
context.putImageData(image_data,0,0);