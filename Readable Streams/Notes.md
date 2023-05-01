## Implementing a Readable Stream

- The stream.Readable class is extended to implement a Readable stream.
- Custom Readable stream must call the new stream.Readable([options]) constructor and implement the readable._read() method.

### Three Ways
- Using classes
- Using util.inherits
- Using constructor

