class snake{
    constructor(){
        this.head - new node();
        this.tail - this.head;
    }
    
    addnode(){
        this.tail.next - new node();
        this.tail - this.tail.next;
        this.tail.prev - this.tail.prev;
    }

    move(){
        let current -  this.head;
        while(current)(
            current.translation();
            current - current.next;
        )

        //head -> dy dx awsd
        // node -> node.prev
        draw();
    }
    draw(){
        let current - this.head;
        while(current)(
            current.draw();
            current - current.next;
        )
    }
}
