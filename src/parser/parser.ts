import { Lexer } from '../lexer/lexer';
import * as token from '../lexer/token';
import { Statement, Program, LetStatement, Identifier } from './ast';

class Parser {
  lexer: Lexer;
  curToken: token.Token;
  peekToken: token.Token;
  errors: Array<string> = [];

  constructor(lexer: Lexer) {
    this.lexer = lexer;

    this.nextToken();
    this.nextToken();
  }

  nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.lexer.nextToken();
  }

  parseProgram(): Program {
    const program = new Program();
    program.statements = [];

    while (this.curToken.type != token.EOF) {
      const stmt = this.parseStatement();
      if (stmt) {
        program.statements.push(stmt);
      }
      this.nextToken();
    }
    return program;
  }

  parseStatement(): Statement {
    if (this.curToken.type === token.LET) {
      return this.parseLetStatement();
    }
    return null;
  }

  parseLetStatement(): Statement {
    const stmt = new LetStatement();
    stmt.token = this.curToken;

    if (!this.expectPeek(token.IDENT)) {
      return null;
    }

    stmt.name = new Identifier(this.curToken, this.curToken.literal);

    if (!this.expectPeek(token.ASSIGN)) {
      return null;
    }

    while (!this.curTokenIs(token.SEMICOLON)) {
      this.nextToken();
    }

    return stmt;
  }

  curTokenIs(tt: token.TokenType): boolean {
    return this.curToken.type == tt;
  }
  peekTokenIs(tt: token.TokenType): boolean {
    return this.peekToken.type == tt;
  }

  expectPeek(tt: token.TokenType): boolean {
    if (this.peekTokenIs(tt)) {
      this.nextToken();
      return true;
    }
    this.peekError(tt);
    return false;
  }

  peekError(tt: token.TokenType) {
    const msg = `expected next token to be ${tt}, got ${this.peekToken.type} instead.`;
    this.errors.push(msg);
  }
}

export { Parser };
