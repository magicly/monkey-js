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
  peekChar() {
    if (this.readPosition >= this.input.length) {
      return '';
    } else {
      return this.input[this.readPosition];
    }
  }

  nextToken(): token.Token {
    let tok: token.Token;

    this.skipWhitespace();

    if (this.ch === '=') {
      if (this.peekChar() === '=') {
        this.readChar();
        tok = { type: token.EQ, literal: '==' };
      } else {
        tok = { type: token.ASSIGN, literal: this.ch };
      }
    } else if (this.ch === '+') {
      tok = { type: token.PLUS, literal: this.ch };
    } else if (this.ch === '-') {
      tok = { type: token.MINUS, literal: this.ch };
    } else if (this.ch === '*') {
      tok = { type: token.ASTERISK, literal: this.ch };
    } else if (this.ch === '/') {
      tok = { type: token.SLASH, literal: this.ch };
    } else if (this.ch === '<') {
      tok = { type: token.LT, literal: this.ch };
    } else if (this.ch === '>') {
      tok = { type: token.GT, literal: this.ch };
    } else if (this.ch === '!') {
      if (this.peekChar() === '=') {
        this.readChar();

        tok = { type: token.NOT_EQ, literal: '!=' };
      } else {
        tok = { type: token.BANG, literal: this.ch };
      }
    } else if (this.ch === ',') {
      tok = { type: token.COMMA, literal: this.ch };
    } else if (this.ch === ';') {
      tok = { type: token.SEMICOLON, literal: this.ch };
    } else if (this.ch === ':') {
      tok = { type: token.COLON, literal: this.ch };
    } else if (this.ch === '(') {
      tok = { type: token.LPAREN, literal: this.ch };
    } else if (this.ch === ')') {
      tok = { type: token.RPAREN, literal: this.ch };
    } else if (this.ch === '{') {
      tok = { type: token.LBRACE, literal: this.ch };
    } else if (this.ch === '}') {
      tok = { type: token.RBRACE, literal: this.ch };
    } else if (this.ch === '[') {
      tok = { type: token.LBRACKET, literal: this.ch };
    } else if (this.ch === ']') {
      tok = { type: token.RBRACKET, literal: this.ch };
    } else if (this.ch === '') {
      tok = { type: token.EOF, literal: this.ch };
    } else if (this.isLetter(this.ch)) {
      const ident = this.readIdentifier();
      tok = { type: token.lookupIdent(ident), literal: ident };
      return tok;
    } else if (this.isDigit(this.ch)) {
      const num = this.readNumber();
      tok = { type: token.INT, literal: num };
      return tok;
    } else {
      tok = { type: token.ILLEGAL, literal: this.ch };
    }

    this.readChar();
    return tok;
  }

  skipWhitespace() {
    while (this.ch === ' ' || this.ch === '\t' || this.ch === '\n' || this.ch === '\r') {
      this.readChar();
    }
  }
  readNumber(): string {
    const pos = this.position;
    while (this.isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.slice(pos, this.position);
  }

  isDigit(ch: string): boolean {
    return '0' <= ch && ch <= '9';
  }

  readIdentifier(): string {
    const pos = this.position;
    while (this.isLetter(this.ch)) {
      this.readChar();
    }
    return this.input.slice(pos, this.position);
  }

  isLetter(ch: string): boolean {
    return ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z') || ch === '_';
  }
}

export { Lexer };
