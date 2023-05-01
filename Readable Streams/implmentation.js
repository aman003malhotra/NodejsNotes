const stream = require('stream');

const { Readable } = stream;

class Counter extends Readable{
    constructor({upperlimit = 100} = {}){
        super();
        this.start = 1;
        this.upperlimt = upperlimit;
    }

    // _destroy()

    _read(){
        if(this.start > this.upperlimt){
            this.push(null);
        }else{
            this.push(this.start.toString());
            this.start = this.start + 1;
        }
    }
}


const c = new Counter();

c.setEncoding('ascii');

c.on('data', (chunk) => {
    console.log(chunk);
})