import { expect } from 'chai';
import * as token from './token';
import { Lexer } from './lexer';

interface TestType {
  expectedType: string;
  expectedLiteral: string;
}
describe('lexer', () => {
  it('nextToken', () => {
    const input = `=+(){},;`;
    const tests: Array<TestType> = [
      { expectedType: token.ASSIGN, expectedLiteral: '=' },
      { expectedType: token.PLUS, expectedLiteral: '+' },
      { expectedType: token.LPAREN, expectedLiteral: '(' },
      { expectedType: token.RPAREN, expectedLiteral: ')' },
      { expectedType: token.LBRACE, expectedLiteral: '{' },
      { expectedType: token.RBRACE, expectedLiteral: '}' },
      { expectedType: token.COMMA, expectedLiteral: ',' },
      { expectedType: token.SEMICOLON, expectedLiteral: ';' },
      { expectedType: token.EOF, expectedLiteral: '' },
    ];

    const lexer = new Lexer(input);
    for (const tt of tests) {
      const tok = lexer.nextToken();
      expect(tok.type).to.equal(tt.expectedType);
      expect(tok.literal).to.equal(tt.expectedLiteral);
    }
  });
});
