import { expect } from 'chai';
import { Lexer } from '../lexer/lexer';
import { Parser } from './parser';
import {
  LetStatement,
  ReturnStatement,
  ExpressionStatement,
  Identifier,
  IntegerLiteral,
  PrefixExpression,
  Expression,
} from './ast';

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
      expect(stmt).to.be.an.instanceOf(LetStatement);

      expect(stmt.tokenLiteral()).to.equal('let');
      expect((stmt as LetStatement).name.value).to.equal(ident);
      expect((stmt as LetStatement).name.tokenLiteral()).to.equal(ident);
    }
  });

  it('return statement', () => {
    const input = `
    return  5;
    return 10 + 1;
    return x;
    `;

    const lexer = new Lexer(input);
    const parser = new Parser(lexer);
    const program = parser.parseProgram();
    checkParserErrors(parser);

    expect(program.statements.length).to.equal(3);

    for (const stmt of program.statements) {
      expect(stmt).to.be.an.instanceOf(ReturnStatement);
      expect(stmt.tokenLiteral()).to.equal('return');
    }
  });

  it('identifier expression', () => {
    const input = `foobar;`;

    const lexer = new Lexer(input);
    const parser = new Parser(lexer);
    const program = parser.parseProgram();
    checkParserErrors(parser);

    expect(program.statements.length).to.equal(1);

    const stmt = program.statements[0];
    expect(stmt).to.be.an.instanceOf(ExpressionStatement);

    const exp = stmt as ExpressionStatement;
    expect(exp.expression).to.be.an.instanceOf(Identifier);
    expect((exp.expression as Identifier).tokenLiteral()).to.equal('foobar');
  });

  it('integer literal', () => {
    const input = `5;`;

    const lexer = new Lexer(input);
    const parser = new Parser(lexer);
    const program = parser.parseProgram();
    checkParserErrors(parser);

    expect(program.statements.length).to.equal(1);

    const stmt = program.statements[0];
    expect(stmt).to.be.an.instanceOf(ExpressionStatement);

    const exp = stmt as ExpressionStatement;
    expect(exp.expression).to.be.an.instanceOf(IntegerLiteral);
    expect((exp.expression as IntegerLiteral).value).to.equal(5);
    expect((exp.expression as IntegerLiteral).tokenLiteral()).to.equal('5');
  });

  it('prefix expression', () => {
    const tests: Array<[string, string, number]> = [['!5;', '!', 5], ['-5;', '-', 5]];

    for (const [input, operator, value] of tests) {
      const lexer = new Lexer(input);
      const parser = new Parser(lexer);
      const program = parser.parseProgram();
      checkParserErrors(parser);

      expect(program.statements.length, 'program.statements wrong!').to.equal(1);

      const stmt = program.statements[0];
      expect(stmt).to.be.an.instanceOf(ExpressionStatement);

      const exp = stmt as ExpressionStatement;
      expect(exp.expression).to.be.an.instanceOf(PrefixExpression);

      const prefixExp = exp.expression as PrefixExpression;
      expect(prefixExp.operator).to.equal(operator);
      testIntegerLiteral(prefixExp.right, value);
    }
  });
});

function testIntegerLiteral(il: Expression, value: number) {
  expect(il).to.be.an.instanceOf(IntegerLiteral);
  const integ = il as IntegerLiteral;
  expect(integ.value).to.equal(value);
  expect(integ.tokenLiteral()).to.equal(`${value}`);
}

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
