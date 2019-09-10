import * as token from './token';

class Lexer {
  input: string;
  position: number = 0;
  readPosition: number = 0;
  ch: string;

  constructor(input: string) {
    this.input = input;
    this.readChar();
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = '';
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  nextToken(): token.Token {
    let tok: token.Token;
    if (this.ch === '=') {
      tok = { type: token.ASSIGN, literal: this.ch };
    }
    if (this.ch === '+') {
      tok = { type: token.PLUS, literal: this.ch };
    }
    if (this.ch === '-') {
      tok = { type: token.MINUS, literal: this.ch };
    }
    if (this.ch === '*') {
      tok = { type: token.ASTERISK, literal: this.ch };
    }
    if (this.ch === '/') {
      tok = { type: token.SLASH, literal: this.ch };
    }
    if (this.ch === ',') {
      tok = { type: token.COMMA, literal: this.ch };
    }
    if (this.ch === ';') {
      tok = { type: token.SEMICOLON, literal: this.ch };
    }
    if (this.ch === ':') {
      tok = { type: token.COLON, literal: this.ch };
    }
    if (this.ch === '(') {
      tok = { type: token.LPAREN, literal: this.ch };
    }
    if (this.ch === ')') {
      tok = { type: token.RPAREN, literal: this.ch };
    }
    if (this.ch === '{') {
      tok = { type: token.LBRACE, literal: this.ch };
    }
    if (this.ch === '}') {
      tok = { type: token.RBRACE, literal: this.ch };
    }
    if (this.ch === '[') {
      tok = { type: token.LBRACKET, literal: this.ch };
    }
    if (this.ch === ']') {
      tok = { type: token.RBRACKET, literal: this.ch };
    }
    if (this.ch === '') {
      tok = { type: token.EOF, literal: this.ch };
    }
    this.readChar();

    return tok;
  }
}

export { Lexer };
