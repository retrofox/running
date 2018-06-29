Running
=======

An useful tool for runners.


### Example

```es6
import Running from 'running'

const running = new Running();

// what's the pace if I wanna get a marathon in 2:40 minutes?
running.setDistance('42km');
running.setTime('2:40:00');
console.log( `You will have to run to ${running.pace()}.`);
```