import { expect } from 'chai';
import * as token from '../lexer/token';
import { Lexer } from '../lexer/lexer';
import { Parser } from './parser';
import { LetStatement } from './ast';

describe('parser', () => {
  it('let statement', () => {
    const tests: Array<[string, string, string | number | boolean]> = [
      ['let x = 5;', 'x', 5],
      ['let y = true;', 'y', true],
      ['let foobar = y;', 'foobar', 'y'],
    ];

    for (const [input, ident, value] of tests) {
      const lexer = new Lexer(input);
      const parser = new Parser(lexer);
      const program = parser.parseProgram();
      checkParserErrors(parser);

      expect(program.statements.length).to.equal(1);

      const stmt = program.statements[0];
      expect(stmt instanceof LetStatement);
      expect(stmt.tokenLiteral()).to.equal('let');
      expect((stmt as LetStatement).name.value).to.equal(ident);
      expect((stmt as LetStatement).name.tokenLiteral()).to.equal(ident);
    }
  });
});

function checkParserErrors(parser: Parser) {
  const errors = parser.errors;
  if (!errors || errors.length === 0) {
    return;
  }

  for (const error of errors) {
    console.error('parse error: ', error);
    expect(error).to.equal('');
  }
}
