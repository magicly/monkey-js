import { Token } from '../lexer/token';

interface ASTNode {
  tokenLiteral(): string;
  astString(): string;
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

  astString(): string {
    let s = '';
    for (const stmt of this.statements) {
      s += stmt.astString();
    }
    return s;
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
  astString(): string {
    return `let ${this.name.astString()} = ${this.value.astString()};`;
  }
}

class ReturnStatement implements Statement {
  token: Token;
  returnValue: Expression;

  statementNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
  astString(): string {
    return `return ${this.returnValue.astString()};`;
  }
}

class ExpressionStatement implements Statement {
  token: Token;
  expression: Expression;

  statementNode() {}
  tokenLiteral(): string {
    return this.token.literal;
  }
  astString(): string {
    return this.expression.astString();
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
  astString(): string {
    return this.value;
  }
}

export { Statement, Program, LetStatement, ReturnStatement, Identifier };
