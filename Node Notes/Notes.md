### Blocking vs Non-blocking
- Blocking is when the execution of additional avaScript in the Node.js process must wait until a non-JavaScript operation completes.
- This happens because the event loop is unable to continue running JavqScript while a blocking operation is occurring.
- ynchronous methods in the Node.js standard library that use Iibuv are the most commonly used blocking operations.

### Event Loop 
- The event loop is what allows Node.js to perform non-blocking 1/0 operations despite the fact that JavaScript is single-threaded --1 by offloading operations to the system  kernel whenever possible.
- Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background.
- When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the poll queue to eventually be executed.


### Phase Overview
- `timers`: this phase executes callbacks scheduled by setTimeout() and setlnterval().
- pending callbacks: executes I/O callbacks deferred to the next loop iteration.
- idle, prepare: only used internally.
- poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setlmmediate()); node will block here when appropriate.
- check: setlmmediate() callbacks are invoked here.
- close callback : some close callbacks, e.g. socket.on('close', ...)
- While each phase is special in its own way, generally, when the event loop enters a given phase, it will perform any operations specific to that phase, then execute callbacks in that phase's queue until the queue has been exhausted or the maximum number of callbacks has executed.

### Microtask Queue
- In Node, there are also two special microtask queues that can have callbacks added to them while a phase is running.
- The first microtask queue handles callbacks that have been registered using process.nextTick().
- The second microtask queue handles promises that reject or resolve.
- Callbacks in the microtask queues take priority over callbacks in the phase's normal queue, and callbacks in the next tick microtask queue run before callbacks in the promise microtask queue.


### RULES

- The Stack has to be empty before any callback can be executed.
- 

Priority Wise from top to bottom.
Microtask queues
next Tick
promise

Phases
timers
pending IO
check

### setImmediate() vs setTimeout()
- setlmmediate and setTimeout() are similar, but behave in different ways depending on when they are called.
- setlmmediate() is designed to execute a script once the current poll phase completes.
- setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.
- The order in which the timers are executed will vary depending on the context in which they are called.

### Node js
- written in c/C++ based interpreter running the V8 js engine.
- More of an API, which is an runtime environment.
- Javascript Run Time environment
- node package manager is a package management tool , like yarn
- npm vs npx - npx is a executor, 
- npx install the whole project setup with installing all the dependencies, 
- if we want to install multiple dependencies, you can create a script and use npx on them.

### Node js architecture
- process is the program under action.
- thread is the smallest instruction that can be handled independantly by a scheduler.
- thread are lightweight, process are not light weight. and process takes more time to terminate.
- `Multi Thread` - is the ability of CPU to provide multiple thread of execution concurrently.
- `Multi processing` - it is more resource consuming, than multi thread similar to multi thread but process.  
- random order scheduling
- priority based scheduling.
- it uses single thread event loop architecture to handle multiple clients at the same time.
- in multi thread language like java 
- In a multi-threaded request-response model. multiple clients send a request. and the server processes each one before sending the response back. However, multiple threads are used to process concurrent calls. These threads are defined in a thread pool. and each time a request comes in. an individual thread is assigned to handle it.

- `EVENT QUEUE` Queue of events.
- `EVENT LOOP` - non terminating loop that will be checking contiuously for any incoming request.
- `WORKER THREAD` - 
- Libuv is a multi-platform support library with a focus on asynchronous 1/0. It was primarily developed for use by Node.'s, but it's also used by Luvit, Julia, uvloop, and others. It gives thread pool to the node js.

- In React worker can be used to handle requests parallely. If there are many requests coming then you can use worked thread.
- Node.js maintains a limited thread pool to serve requests.
- Whenever a requests comes, node.js places it to the queue.
- Now the single threaded "Event loop" the core component comes into the picture, This event loop waits for requests indefinitely.
- If a request in blocking  if not then it sends the response back.
- if blocking then worker thread is assigned to process that blocking event. The group of auxiliary thread is called the worker group.
- the event loop tracks blocking requests and places them in the queue once the blocking task is processed. 

-  https://enlear.academy/understanding-service-workers-in-react-js-a90dc6fbec02


### CLUSTERING 
- clusters of process and each process has unique id.

### Disadvantages
- single threaded process, blocking process in avoidede using async mechanism
- complex calculations requires a lot of calculation, so it should be prevented.
- poor quality of open source tool.

### USES
- IOT ( MQTT Protocol is greatly served by node)
- REAL TIME APPLICATIONS ( chat applications, CRICBUZZ ) (Web Socket bi directional)
- data streaming applications.(Netflix)
- apps relying on scalibility.()
- Colaborative Tools ( google docs, notion document )

### Not advised to use Node.js
- CRUD Application - Node js is more than just that.
- Relational Database based server side applications - the relational database tools are not as advanced as those created for other platforms

### Express
``` 
const express = require('express')
const app = express() - this is a part of javascript - Initialization of an object.

app.get('/', callback(req,res) => {
    res.send("happy flow");
})

app.listen(5000, () => {console.log("app is running in port )});

```
- datatype of app - object 
- functions which return an object are factory function

#### FACTORY FUNCTION
```
function harsh(name){
    let obj = {}
    obj.name = name
    return obj;
}
console.log(harsh("aman"))
```
fs module - inbuilt module, to read and write system files.

req.query, req.params, req.body

req.query - data which you can see in the url.? variable only for get not for post, put delete.
req.params - data which is sent using the params. /:param
req.body - data which is sent into the body of the request. It should be used with body parser.
app.use(express.json()) - converts the data into json.

serverless - its cost effective than servers, because we pay for only the function we use.

libuv - libuv was originally developed to provide asynchronous I/O that includes asynchronous TCP & UDP sockets, (famous)event loop, asynchronous DNS resolution, file system read/write and etc It is written in C. 


### Middlewares
```
function middleware1((req,res,next) => {


    next();
})

function middleware2((req,res,next) => {


    next();
})
```

### process.env

```
npm i dotenv

require('dotenv').config()
console.log(process.env);
```

### router layer
```
const router = require('express').Router();

router.get('/', (req,res) =>{
    res.send("ok");
})

module.exports = router;

app.use(require('./routes/route_name.js')); // routing middleware

```



#! /usr/bin/env node - it is an instance of shebang line that tells the system what interpreter to pass that file to for execution, via the command line following the magic #! prefix. for mainly UNIX Like platform.


package-lock.json - exact version of the modules installed.
process.env - environment variables.
process.args - arguments passed in the terminal. 0, 1 have other information argv[2] is the first argument passed.


## EVENTS
The event model used in the browser comes from the DOM rather than javascript.
EventEmitter - Because the event model is tied to the DOM in browsers, Node created the Event Emitter class to provide some basic event functionality.

```
    const EventEmitter = require("events");
    const newInstance = new EventEmitter();

    // add event listener
    newInstance.on("my-event", function handler(...args){
        console.log("handler was called");
        console.log(args);
    });

    // firing of an event
    newInstance.emit("my-event"); // handler was called
```

- The on method takes two parameters: the name of the event to listen for and the function to call when that event is emitted.
- Because EventEmitter is an interface pseudoclass, the class that inherits from EventEmitter is expected to be invoked with the new keyword.

### Handling events only once
- When a listener is registered using the eventEmitter.on() method, that listener will be invoked every time the named event is emitted.
- Using the eventEmitter.once() method, it is possible to register a listener that is called at most once for a particular event. Once the event is emitted, the listener is unregistered and then called.


## File System

- opening a file in read, write, read && write mode.
- The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.
- All file system operations have synchronous and asynchronous forms.


### ASYNC FUNCTION
```
const fs = require('fs') ;
fs.unlink('/tmp/hello' ,(err)  =>{
if (err) throw err;
console. log(' successfully deleted / t')
})

```
### SYNC FUNCTION
```
const fs = require('fs') ;
try {
    fs.unlinkSync( ' /tmp/hello' ) ;
    console. log( 'successfully deleted');
} catch (err) {
// handle the error
}
```

- `File paths` Most fs operations accept filepaths that may be specified in the form of a string, a Buffer, or a URL object using the file: protocol.

fs.openSync('fileName') => it does not come with the callback.

- In the form of promise
const fspromisified = require("fs/promises");

### FLAGS
- r+ => open the file for reading and writing.
- w+ => open the file for reading and writing. positioning the stream at the beginning of the file. The file is created if not existing.
- a => open the file for writing, positioning the stream at the end of the file. The file is created if not existing.
- a+ => open the file for reading and writing, positioning the stream at the end of the file. The file is created if not existing.


### FILE DETAILS.

Every file comes with a set of details that we can inspect using Node.js.
```
const file = "filetoread.txt";
console.log(fs.statSync(file).isFile() / .isDirectory());
```

### FILE PATHS
- Every file in the system has a path.
- There's a module 'path' for dealing with path-related things.

```

const path = require("path");
const notes = = "/Users/arfatsaIman/Desktop/node/fiIetoread.txt" ;

console.log(path.dirname(notes)); // users/arfatsalman/Desktop/node/fiIetoread.txt
console. log(path.basename( notes)); // filetoread.txt

console. log(path.extname(notes)); // .txt
path.basename(notes,path.extname(notes)); // filetoread

```

console.log(path.sep)

### READING AND WRITING FILES

```
const fs = require('fs');
async function main(){
    const data = await fs.readFile("filetoread.txt", "utf-8");
    console.log(data);
}

readFile() => async function.
readFileSync() => sync function
const fs = require('fs/promises") => fs.readFile() => promisified version

writeFile() => async function.
writeFileSync() => sync function
const fs = require('fs/promises") => fs.writeFile() => promisified version
```

- to prevent the rewriting the file use 
```
fs.appendFile()
```


### FOLDERS

- fs.access: to check if the folder exists and Node.js can access it With its permissions.
- it returns undefined if you have access.
- fs.mkdir/sync - to create a new folder.
- fs.readdir('folder name') return array to read the items in the directory.
- fs.existsSync: to check if a file / folder exists
- fs.rename/Sync: to rename a folder
- fs.rmdir(): to remove the folder


### OS
- os.EOL - CLRF
- os.arch() - architecture the of device.
- os.contanst - signals, error codes.
- os.cpus() - gives info about the cores.
- os.endianness()
- os.freemem()
- os.homedir()
- os.hostname()
- os.loadavg()
- os.networklnterfaces()

### PROCESS
- The process object is a global that providesinformation about, and control over, the current Node.js process.

#### Process Events
- The process object is an instance of EventEmitter.

    Event: 'beforeExit'

- The 'beforeExit' event is emitted when Node.js empties its event loop and has no additional work to schedule.
- The 'beforeExit' event is not emitted for conditions causing explicit termination, such as calling process.exit() or uncaught exceptions.
```
process.on('beforeExit', ()=>{
    console.log("beforeExit was called");
})
```

- The 'beforeExit' should not be used as an alternative to the 'exit' event unless the intention is to schedule additional work.

Event: 'exit'
- The 'exit' event is emitted when the Node.js process is about to exit as a result of either:
- The process.exit() method being called explicitly;
- The Node.js event loop no longer having any additional work to perform.

```
process.on("exit", ()=> {
    console.log("processs is exited");
})
```
- There is no way to prevent the exiting of the event loop at this point, and once all 'exit' listeners have finished running the Node.js process will terminate.

``` 
process.on("uncaughtException", (...args) => {
    console.log(args);
})

throw new Error("sdfas");
```

- The 'uncaughtException' event is emitted when an uncaught JavaScript exception bubbles all the way back to the event loop.
- By default, Node.js handles such exceptions by printing the stack trace to stderr and exiting.


## How Nodejs is serving Millions of Users in Real-Time

The thread pool size can be changed: 

```
process.env.UV_THREADPOOL_SIZE = 1;
```


## STREAMS

- Streams are abstractions of source and destination.
- Streams are collections of data - just like arrays or strings.
- The difference is that streams might not be available all at once, and they don't have to fit in memory.

### WHY STREAMS
- Streams are really powerful when working with large amounts of data, or data that's coming from an external source one chunk at a time.
- They also give us the power of composability in our code.
- In Unix, streams have proven themselves over the decades as a dependable way to compose large systems out of small components that do
one thing well.
- Memory efficient: you don't need to load large amounts of data in memory before you are able to process it.
- Time efficiency: it takes significantly less time to start processing data as soon as you have it.

### TYPES OF STREAMS
- All streams created by Node.js APIs operate exclusively on strings and Buffer (or Uint8Array) objects.
- It is possible, however, for stream implementations to work with other types of JavaScript values (with the exception of null, which serves a special purpose within streams).
- Such streams are considered to operate in "object mode".
- For example - Readable.from creates an object mode strings.
- Readable: streams from which data can be read (for example, fs.createReadStream()).
- Writable: streams to which data can be written (for example, fs.createWriteStream()).
- Duplex: streams that are both Readable and Writable (for example, net.Socket).
- Transform: Duplex streams that can modify or transform the data as it is written and read (for example, zlib.createDeflate()).

### Readable Stream

- A readable stream is an abstraction for a source from which data can be consumed.
- An example of that is the fs.createReadStream method.
- All streams are instances of Event Emitter. They emit events that can be used to read and write data.


```
const { createReadStream, ...fs } = require("fs");

// not a good idea because it reads the whole file at once
fs.readFile('filetoread.txt', 'utf-8' ,(err, data) => {
   console.log(data); 
})

// without the utf-8 it will give me a buffer value.

const stream = createReadStream('filetoread.txt');

// stream here is an object

// you have to set encoding otherwise it will be buffer

stream.setEncoding('utf-8');

stream.on('data', (chunk) => {
    console.log(' --- data handler called ');
    console.log(chunk.length);
});
// 65536 is the standard size of the buffer.

```
### Consuming a Readable Stream.

- using 'data' event.
- using 'readable' event. 
- the difference is that in `readable` you have to ask the chunk through this.read() but in `data` the chunk comes as an argument of the callback.
- the `data` event, which is emitted whenever the stream passes a chunk of the data to the consumer.
- the `end` event which is emitted when there is no more data to be consumed from the stream.
- the  `close` event is emitted when the stream and any if its underlying resource (a file descriptor, for example) have been closed.

```
stream.on('readable', function(){
    console.log('--------- readable handler called);
    const data = this.read();
    console.log(data.length);
})

```

- using 'pipe' method.
- The pipe method returns the destinatin stream, which enabled us to do the chaining above.

```
    const stream = createReadStream('ws.txt');
    const output = createWriteStream('newfile.txt');
    // copy and pase the file.
    const capitalize = function(){

    }
    stream.pipe(capitalize).pipe(output);
    we can add more stream.pipe().pipe() and moving forward.
    
    // readableSrc.pipe(writableDest);

    // this will basically log the output.
    stream.pipe(process.stdout);
```

- using `async` method.

```
    async functin main(){
        for await (const chunk of stream) {
            console.log(typeof chunk, chunk.length);
        }
    }
```

### Advantages of Node pipe method

- Beside reading from a readable stream source and writing to a writable destination, the pipe method automatically manages a few things along the way
- for example, it handles errors , end-of-files and the cases when one stream is slower than the other.

### Readable streams

#### Events
- data
- end
- error
- close
- readable

#### Functions
- pipe(), unpipe()
- read(), unshift(), resume()
- pause(), isPaused()
- setEncoding()


### Writable Stream

#### Events
- drain
- finish
- error
- close
- pipe/unpipe

#### Functions
- write()
- end()
- cork(), uncork()
- setDefaultEncoding()










## Express

### HTTP
- In order to support the full spectrum of possible HTTP applications, the Node.js HTTP API is very low-level.
- It deals with stream handling and message parsing only.
- It parses a message into headers and body but it does not parse the actual headers or the body.

### HTTP Classes
- Agent
- ClientRequest extends Stream.
- Server extends extends net.Server extends EventEmitter.
- ServerResponse extends Stream.
- IncomingMessage extends Stream.Readable.


```
http.request(options[, callback])
http.request(url[, options][, callback])
http.get(options[,callback])
http.get(url[,options][,callback])
```


```
const http = require('http')
const options = {
    hostname:'jsonplaceholder.typicode.com',
    port:80,
    path:'/todos/1',
};

http.get(options, (res) => { 
    console.log(res.statusCode);
    res.pipe(process.stdout);
})

```

```
const http = require('http');
const url = 'jsonplaceholder.typicode.com/todos/2';

http.get(
    url,
    {}, // can put headers into this
    (res) => {
    res.pipe(process.stdout);
})

const writable = http.request(
    url,
    { method:'POST' },
    (res) => {
        res.pipe(process.stdout);
    }
)

writable.write('');
writable.end('');
```


```
const http = require('http');
const server = http.createServer((req,res) => {
    if(req.url == = '/'){
        res.end('home\n');
    }else{
        res.write('not home\n');
        res.end();
    }
    console.log(req.url);
    console.log(req.headers);
    console.log(req.method);

    res.write('done\n');
    res.end();
})

server.listen(8080);

```


- Express is fast unopinionated minimalist web framework for node.js
- Node Js based web framework. 
- inspired by Ruby's Sinatra.

```
const express = require('express');
const app = express();
app.get( '/' , (req,res) => res.send('Hello Worldl'));
app.listen(3000,() => console. log( 'Example app listening on port 3000!'))

```


### Why Express.js
- Configurable
- Middle-wares
- Session Management
- Routing
- Views and templates
- Robust and secure

### MVC Theory
- Model View Controller (MVC) is a software architecture pattern, commonly used to implement user interfaces: it is therefore a popular choice for architecting web apps.
- it separates out the application logic into three separate parts, promoting modularity and ease of collaboration and reuse.

#### The Model
• The model defines what data the app should contain.
• If the state of this data changes, then the model will usually notify the view (so the display can change as needed) and sometimes the controller.

#### The View
The view defines how the app's data should be displayed.

#### The Controller
The controller contains logic that updates the model and/or view in response to input from the users of the app.

#### Basic Routing
- Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
- Each route can have one or more handler functions, which are executed when the route is matched.

```
const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.send('Working');
});

```
`Body Parser` Parses incoming request bodies in a middleware before your handlers, available under the req.body property.

#### Route Paths

```
app.get('/ab?cd', (req,res) => {
    res.send('ab?cd');
})

```

matches acd and abcd

```
app.get('/ab+cd' (req,res) => {
    res.send('ab+cd');
})
```

matches abcd, abbcd, abbbcd and so on.

```
app.get(/.*fly$/, (req,res) => {
    res.end('done\n')
})

```

match butterfly and dragonfly, but not butterffyman, dragonflyman, and so on.

#### Route Parameters

```
app.get('/users/:userId/books/:bookid', (req,res) => {
    res.send(req.params);
})

Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }

// Adding constraints to what is allowed
Route path: /user/:userld(\d+)
Request URL: http://localhost:3000/user/42
// req.params: {"userld": "42"}

```

### Middlewares

#### What is middleware
- Middleware functions are functions that have access to the request object (req), the response object (res),and the next middleware function in the application's request-response cycle.

#### Middleware functions can perform the following tasks:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.
- If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function.

#### An express application can use the following types of middleware
- Application Level middleware.
- Router Level Middleware.
- Error Handling Middleware.
- Built-in Middleware.
- Third Party Middleware.


#### error handling middleware

```
app.use((err, req,res,next) => {
    console.log(err.stack);
    res.status(500).send('Something Broke');
})
```

#### Built In Middleware
```
app.use(express.json());

```

#### Third Party Middleware

```
app.use(cookieParser());

```

### View Template engines

```
const path = require('path');
app.set('views', path.join(___driname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req,res)=> {
    res.render('index', {name:"Aman malhotra", city:"Ludhiana"});
})

```

- A template engine enables you to use static template files in your application.
- At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client.
- This approach makes it easier to design an HTML page.
- Express supports many template engines 

#### View Layout and Partials

- We can make block of codes and then can reuse them for multiple HTML files.
