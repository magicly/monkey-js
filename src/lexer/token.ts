interface Token {
  type: string;
  literal: string;
}

const ILLEGAL = 'ILLEGAL';
const EOF = 'EOF';
const IDENT = 'IDENT';
const INT = 'INT';
const ASSIGN = '=';
const PLUS = '+';
const MINUS = '-';
const ASTERISK = '*';
const SLASH = '/';
const BANG = '!';
const LT = '<';
const GT = '>';
const COMMA = ',';
const SEMICOLON = ';';
const COLON = ':';
const LPAREN = '(';
const RPAREN = ')';
const LBRACE = '{';
const RBRACE = '}';
const LBRACKET = '[';
const RBRACKET = ']';
const FUNCTION = 'FUNCTION';
const LET = 'LET';
const IF = 'IF';
const ELSE = 'ELSE';
const RETURN = 'RETURN';
const TRUE = 'TRUE';
const FALSE = 'FALSE';
const EQ = '==';
const NOT_EQ = '!=';
const STRING = 'STRING';

const keywords = {
  fn: FUNCTION,
  let: LET,
  true: TRUE,
  false: FALSE,
  if: IF,
  else: ELSE,
  return: RETURN,
};

export function lookupIdent(ident: string): string {
  const tok = keywords[ident];
  if (tok) {
    return tok;
  }
  return IDENT;
}

export { Token };
export {
  ILLEGAL,
  EOF,
  IDENT,
  INT,
  ASSIGN,
  PLUS,
  MINUS,
  ASTERISK,
  SLASH,
  BANG,
  LT,
  GT,
  COMMA,
  SEMICOLON,
  COLON,
  LPAREN,
  RPAREN,
  LBRACE,
  RBRACE,
  LBRACKET,
  RBRACKET,
  FUNCTION,
  LET,
  IF,
  ELSE,
  RETURN,
  TRUE,
  FALSE,
  EQ,
  NOT_EQ,
  STRING,
};
