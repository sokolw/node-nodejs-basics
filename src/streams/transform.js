import { pipeline } from 'stream/promises';
import { EOL } from 'os';
import { Transform } from 'stream';

class ReverseTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(data, encoding, callback) {
    if (data.toString().toLowerCase() === `close${EOL}`) {
      process.stdin.emit('end');
      callback(null, '');
    } else {
      callback(null, data
        .toString()
        .replace(new RegExp(EOL, 'gi'), '')
        .split('').reverse().join('') + EOL
      );
    }
  };
}

export const transform = async () => {
  const reverseTransform = new ReverseTransform();
  process.stdin.on('end', () => { console.log('Bye, process close!'); });
  console.log('Enter text to transform, for exit write : close');
  await pipeline(process.stdin, reverseTransform, process.stdout);
};

transform();