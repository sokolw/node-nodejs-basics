import { pipeline } from 'stream/promises';
import { EOL } from 'os';

export const transform = async () => {
  process.stdin.on('data', () => { process.stdin.emit('end'); });
  await pipeline(process.stdin, reverseLine, process.stdout);
};

async function* reverseLine (source, { signal }) {
  source.setEncoding('utf8');
  for await (const chunk of source) {
    yield await chunk.replace(new RegExp(EOL, 'gi'), '').split('').reverse().join('');
  }
}

transform();