import { Program, LetStatement, Identifier } from './ast';
import { expect } from 'chai';

import * as token from '../lexer/token';
describe('ast', () => {
  it('astString', () => {
    const program = new Program();
    const letStmt = new LetStatement();
    letStmt.token = { type: token.LET, literal: 'let' };
    letStmt.name = new Identifier({ type: token.IDENT, literal: 'myVar' }, 'myVar');
    letStmt.value = new Identifier({ type: token.IDENT, literal: 'anotherVar' }, 'anotherVar');
    program.statements = [letStmt];

    expect(program.astString()).to.equal('let myVar = anotherVar;');
  });
});
