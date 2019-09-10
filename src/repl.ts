import { Lexer } from './lexer/lexer';
import * as token from './lexer/token';

const PROMPT = '>> ';

console.log('Hello, this is the Monkey programming language!');
process.stdout.write(PROMPT);

process.stdin.on('data', data => {
  const lexer = new Lexer(data.toString());

  for (let tok = lexer.nextToken(); tok.type != token.EOF; tok = lexer.nextToken()) {
    console.log(tok);
  }

  console.log(data.length);

  process.stdout.write(PROMPT);
});
