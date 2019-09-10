import { Lexer } from '../lexer/lexer';
import * as token from '../lexer/token';
import {
  Statement,
  Program,
  LetStatement,
  Identifier,
  ReturnStatement,
  Expression,
  ExpressionStatement,
  IntegerLiteral,
  PrefixExpression,
} from './ast';

type prefixParseFn = () => Expression;
type infixParseFn = (exp: Expression) => Expression;

let order = 0;
const LOWEST = order++;
const EQUALS = order++;
const LESSGREATER = order++;
const SUM = order++;
const PRODUCT = order++;
const PREFIX = order++;
const CALL = order++;
const INDEX = order++;

class Parser {
  lexer: Lexer;
  curToken: token.Token;
  peekToken: token.Token;
  errors: Array<string> = [];

  prefixParseFns: Map<token.TokenType, prefixParseFn>;
  infixParseFns: Map<token.TokenType, infixParseFn>;

  constructor(lexer: Lexer) {
    this.lexer = lexer;

    this.nextToken();
    this.nextToken();

    this.prefixParseFns = new Map();
    this.registerPrefix(token.IDENT, this.parseIdentifier.bind(this));
    this.registerPrefix(token.INT, this.parseIntegerLiteral.bind(this));
    this.registerPrefix(token.BANG, this.parsePrefixExpression.bind(this));
    this.registerPrefix(token.MINUS, this.parsePrefixExpression.bind(this));
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
    if (this.curToken.type === token.RETURN) {
      return this.parseReturnStatement();
    }
    return this.parseExpressionStatement();
  }

  parseExpressionStatement(): ExpressionStatement {
    const stmt = new ExpressionStatement();
    stmt.token = this.curToken;
    stmt.expression = this.parseExpression(LOWEST);

    if (this.peekTokenIs(token.SEMICOLON)) {
      this.nextToken();
    }
    return stmt;
  }

  parseExpression(precedence: number): Expression {
    const prefix = this.prefixParseFns[this.curToken.type];
    if (!prefix) {
      this.noPrefixParseFnError(this.curToken.type);
      return null;
    }
    return prefix();
  }

  parsePrefixExpression(precedence: number): Expression {
    const exp = new PrefixExpression(this.curToken, this.curToken.literal);

    this.nextToken();

    exp.right = this.parseExpression(PREFIX);

    return exp;
  }

  noPrefixParseFnError(tt: token.TokenType) {
    this.errors.push(`no prefix parse function for ${tt} found`);
  }

  parseIdentifier(): Expression {
    return new Identifier(this.curToken, this.curToken.literal);
  }
  parseIntegerLiteral(): Expression {
    const value = parseInt(this.curToken.literal, 10);
    if (isNaN(value)) {
      const msg = `could not parse ${this.curToken.literal} as a int`;
      this.errors.push(msg);
      return;
    }
    return new IntegerLiteral(this.curToken, value);
  }

  parseReturnStatement(): Statement {
    const stmt = new ReturnStatement();
    stmt.token = this.curToken;

    this.nextToken();

    while (!this.curTokenIs(token.SEMICOLON)) {
      this.nextToken();
    }

    return stmt;
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

  registerPrefix(tt: token.TokenType, fn: prefixParseFn) {
    this.prefixParseFns[tt] = fn;
  }
  registerInfix(tt: token.TokenType, fn: infixParseFn) {
    this.infixParseFns[tt] = fn;
  }
}

export { Parser };
