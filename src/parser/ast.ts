import { Token } from '../lexer/token';

interface ASTNode {
  tokenLiteral(): string;
}

interface Statement extends ASTNode {
  statementNode();
}

interface Expression extends ASTNode {
  expressionNode();
}

class Program implements ASTNode {
  statements: Array<Statement>;

  tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral();
    }
    return '';
  }
}

class LetStatement implements Statement {
  token: Token;
  name: Identifier;
  value: Expression;

  statementNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
}

class Identifier implements Expression {
  token: Token;
  value: string;

  constructor(token: Token, value: string) {
    this.token = token;
    this.value = value;
  }

  expressionNode() {}

  tokenLiteral(): string {
    return this.token.literal;
  }
}

export { Statement, Program, LetStatement, Identifier };
