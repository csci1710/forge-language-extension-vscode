grammar ForgeParser;

options { tokenVocab=ForgeLexer; }


alloyModule:  importDecl* paragraph* 
            | evalDecl*;

importDecl: OPEN_TOK qualName (LEFT_SQUARE_TOK qualNameList RIGHT_SQUARE_TOK)? (AS_TOK name)?
      | OPEN_TOK FILE_PATH_TOK (AS_TOK name)?;

paragraph: sigDecl | predDecl | funDecl | assertDecl | cmdDecl | testExpectDecl | sexprDecl
         | queryDecl | evalRelDecl | optionDecl | instDecl | exampleDecl | propertyDecl
         | quantifiedPropertyDecl | satisfiabilityDecl | testSuiteDecl;

sigDecl: VAR_TOK? ABSTRACT_TOK? mult? SIG_TOK nameList sigExt? LEFT_CURLY_TOK arrowDeclList? RIGHT_CURLY_TOK block?;
sigExt: EXTENDS_TOK qualName | IN_TOK qualName (PLUS_TOK qualName)*;

mult: LONE_TOK | SOME_TOK | ONE_TOK | TWO_TOK;
arrowMult: LONE_TOK | SET_TOK | ONE_TOK | TWO_TOK | FUNC_TOK | PFUNC_TOK;
helperMult: LONE_TOK | SET_TOK | ONE_TOK | FUNC_TOK | PFUNC_TOK;
paraDecl: DISJ_TOK? nameList COLON_TOK helperMult? expr;
quantDecl: DISJ_TOK? nameList COLON_TOK SET_TOK? expr;

arrowDecl: VAR_TOK? nameList COLON_TOK arrowMult arrowExpr;

predType: WHEAT_TOK;

predDecl: PRED_TOK predType? (qualName DOT_TOK)? name paraDecls? block;
funDecl: FUN_TOK (qualName DOT_TOK)? name paraDecls? COLON_TOK helperMult? expr LEFT_CURLY_TOK expr RIGHT_CURLY_TOK;
paraDecls: LEFT_PAREN_TOK paraDeclList? RIGHT_PAREN_TOK | LEFT_SQUARE_TOK paraDeclList? RIGHT_SQUARE_TOK;

assertDecl: ASSERT_TOK name? block;
cmdDecl: (name COLON_TOK)? (RUN_TOK | CHECK_TOK) (qualName | block)? scope? (FOR_TOK bounds)?;

testDecl: (name COLON_TOK)? (qualName | block) scope? (FOR_TOK bounds)? IS_TOK (SAT_TOK | UNSAT_TOK | THEOREM_TOK | FORGE_ERROR_TOK);
testExpectDecl: TEST_TOK? EXPECT_TOK name? testBlock;
testBlock: LEFT_CURLY_TOK testDecl* RIGHT_CURLY_TOK;
scope: FOR_TOK number (BUT_TOK typescopeList)? | FOR_TOK typescopeList;
typescope: EXACTLY_TOK? number qualName;
const: NONE_TOK | UNIV_TOK | IDEN_TOK | MINUS_TOK? number;

satisfiabilityDecl: ASSERT_TOK name IS_TOK (SAT_TOK | UNSAT_TOK | FORGE_ERROR_TOK) scope? (FOR_TOK bounds)?;
propertyDecl: ASSERT_TOK name IS_TOK (SUFFICIENT_TOK | NECESSARY_TOK) FOR_TOK name scope? (FOR_TOK bounds)?;
quantifiedPropertyDecl: ASSERT_TOK ALL_TOK DISJ_TOK? quantDeclList BAR_TOK name (LEFT_SQUARE_TOK exprList RIGHT_SQUARE_TOK)? IS_TOK (SUFFICIENT_TOK | NECESSARY_TOK) FOR_TOK name (LEFT_SQUARE_TOK exprList RIGHT_SQUARE_TOK)? scope? (FOR_TOK bounds)?;

testSuiteDecl: TEST_TOK SUITE_TOK FOR_TOK name LEFT_CURLY_TOK testConstruct* RIGHT_CURLY_TOK;

testConstruct: exampleDecl | testExpectDecl | propertyDecl | quantifiedPropertyDecl | satisfiabilityDecl;

arrowOp: (mult | SET_TOK)? ARROW_TOK (mult | SET_TOK)?;
compareOp: IN_TOK | EQ_TOK | LT_TOK | GT_TOK | LEQ_TOK | GEQ_TOK | IS_TOK | NI_TOK;
letDecl: name EQ_TOK expr;
block: LEFT_CURLY_TOK expr* RIGHT_CURLY_TOK;
blockOrBar: block | BAR_TOK expr;
quant: ALL_TOK | NO_TOK | SUM_TOK | mult;
qualName: (THIS_TOK SLASH_TOK)? (name SLASH_TOK)* name | INT_TOK | SUM_TOK;
optionDecl: OPTION_TOK qualName (qualName | FILE_PATH_TOK | MINUS_TOK? number);

name: IDENTIFIER_TOK;
nameList: name | name COMMA_TOK nameList;
qualNameList: qualName | qualName COMMA_TOK qualNameList;

paraDeclList: paraDecl | paraDecl COMMA_TOK paraDeclList;
quantDeclList: quantDecl | quantDecl COMMA_TOK quantDeclList;
arrowDeclList: arrowDecl | arrowDecl COMMA_TOK arrowDeclList;

letDeclList: letDecl | letDecl COMMA_TOK letDeclList;
typescopeList: typescope | typescope COMMA_TOK typescopeList;
exprList: expr | expr COMMA_TOK exprList;

expr: expr1 | LET_TOK letDeclList blockOrBar | BIND_TOK letDeclList blockOrBar | quant DISJ_TOK? quantDeclList blockOrBar;
expr1: expr1_5 | expr1 OR_TOK expr1_5;
expr1_5: expr2 | expr1_5 XOR_TOK expr2;
expr2: expr3 | expr2 IFF_TOK expr3;
expr3: expr4 | expr4 IMP_TOK expr3 (ELSE_TOK expr3)?;
expr4: expr4_5 | expr4 AND_TOK expr4_5;
expr4_5: expr5 | expr5 UNTIL_TOK expr5 | expr5 RELEASE_TOK expr5 | expr5 SINCE_TOK expr5 | expr5 TRIGGERED_TOK expr5;
expr5: expr6 | NEG_TOK expr5 | ALWAYS_TOK expr5 | EVENTUALLY_TOK expr5 | AFTER_TOK expr5 | BEFORE_TOK expr5 | ONCE_TOK expr5 | HISTORICALLY_TOK expr5;
expr6: expr7 | expr6 NEG_TOK? compareOp expr7;
expr7: expr8 | (NO_TOK | SOME_TOK | LONE_TOK | ONE_TOK | TWO_TOK | SET_TOK) expr8;
expr8: expr9 | expr8 (PLUS_TOK | MINUS_TOK) expr10;
expr9: expr10 | CARD_TOK expr9;
expr10: expr11 | expr10 PPLUS_TOK expr11;
expr11: expr12 | expr11 AMP_TOK expr12;
expr12: expr13 | expr12 arrowOp expr13;
expr13: expr14 | expr13 (SUBT_TOK | SUPT_TOK) expr14;
expr14: expr15 | expr14 LEFT_SQUARE_TOK exprList RIGHT_SQUARE_TOK;
expr15: expr16 | expr15 DOT_TOK expr16 | name LEFT_SQUARE_TOK exprList RIGHT_SQUARE_TOK;
expr16: expr17 | expr16 PRIME_TOK;
expr17: expr18 | (TILDE_TOK | EXP_TOK | STAR_TOK) expr17;
expr18: const | qualName | AT_TOK name | BACKQUOTE_TOK name | THIS_TOK | LEFT_CURLY_TOK quantDeclList blockOrBar RIGHT_CURLY_TOK | LEFT_PAREN_TOK expr RIGHT_PAREN_TOK | block | sexpr;

arrowExpr: qualName | qualName ARROW_TOK arrowExpr;

sexprDecl: sexpr;
sexpr: SEXPR_TOK;

instDecl: INST_TOK name bounds scope?;

evalRelDecl: arrowDecl;
evalDecl: EVAL_TOK expr;

exampleDecl: EXAMPLE_TOK name IS_TOK expr FOR_TOK bounds;

queryDecl: name COLON_TOK arrowExpr EQ_TOK expr;

numberList: number | number COMMA_TOK numberList;
number: NUM_CONST_TOK;

bounds: LEFT_CURLY_TOK bound* RIGHT_CURLY_TOK | EXACTLY_TOK? qualName;

atomNameOrNumber: BACKQUOTE_TOK name | number | MINUS_TOK number;
bound: boundLHS compareOp bindRHSUnion | NO_TOK boundLHS | qualName;

boundLHS: CARD_TOK qualName | qualName | atomNameOrNumber (DOT_TOK qualName)+;

bindRHSUnion: bindRHSProduct | bindRHSUnion PLUS_TOK bindRHSProduct | LEFT_PAREN_TOK bindRHSUnion RIGHT_PAREN_TOK;
bindRHSProduct: LEFT_PAREN_TOK bindRHSProduct RIGHT_PAREN_TOK | bindRHSProduct (COMMA_TOK | ARROW_TOK) bindRHSProductBase | bindRHSProductBase;
bindRHSProductBase: atomNameOrNumber | qualName | LEFT_PAREN_TOK bindRHSUnion RIGHT_PAREN_TOK;

