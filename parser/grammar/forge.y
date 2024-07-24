%{
/* Definitions and imports go here */
const yy = {};
%}

/* Associativity and precedence */
%left 'OR' 'AND' 'IFF' 'AMPERSAND' 'PLUS' 'MINUS' 'DOT'
%right 'IMPLIES' 

%lex
%ebnf
%start forge_specification

%% /* language grammar */

forge_specification
    : forge_module EOF
    | eval_module EOF
    ;

eval_module: /* Don't understand this yet */
       ;

forge_module
    : lang_declaration import* option* paragraphs*
	{ console.log("Valid forge module declaration with imports:", $1, $2, $3); return { module: $1, imports: $2, options: $3 }; }
    ;

lang_declaration
    : LANG module
        { $$ = $2; }
    ;

module
    : FORGE
        { $$ = 'forge'; }
    | FORGE_FROGLET
        { $$ = 'forge/bsl'; }
    | FORGE_TEMPORAL
        { $$ = 'forge/temporal'; }
    ;

import 
    : OPEN qual_name ('[' qual_namelist ']' )? (AS IDEN)?
    | OPEN FILE_PATH (AS IDEN)?
      //  { $$ = { type: 'import', path: $2, alias: $4 }; }
    ;

option
    : OPTION qual_name (qual_name | FILE_PATH | '-'? INT)
      { $$ = { type: 'option', key: $2, value: $3 }; }
    ;

paragraphs
    : sig_decl
    ;
    
dummy
    : pred_decl
    | fun_decl
    | assert_decl
    | cmd_decl
    | test_expect_decl
    | sexpr_decl
    | query_decl
    | eval_rel_decl
    | option_decl
    | inst_decl
    | example_decl
    | property_decl
    | quantified_property_decl
    | test_suite_decl
    ;

/* ******* SIG GRAMMAR ******* */
sig_decl
    : VAR? ABSTRACT? mult? SIG name_list sig_ext? '{' field_list? '}' 
        { $$ = { type: 'sig', name: $4, ext: $5, fields: $7, constraints: $9 }; }
    ;

sig_ext
    : EXTENDS qual_name
    | IN qual_name ('+' qual_name)*
    ;


field_list
    : field
    | field ',' field_list
    ;

field
    : VAR? name_list ':' relation_mult relation_expr
    ;

mult
    : LONE
    | SOME
    | ONE
    | TWO
    ;

relation_mult
    : LONE
    | SET
    | ONE
    | TWO
    | PFUNC
    | FUNC
    ;

relation_expr
    : qual_name
    | qual_name '->' relation_expr
    ;

name_list
    : IDEN
    | IDEN ',' name_list
    ;

qual_name
    : IDEN ('.' IDEN)*
      { $$ = $1 + ($2 ? $2.join('') : ''); }
    ;

qual_namelist
    : qual_name (',' qual_name)*
      { $$ = [$1].concat($2); }
    ;

/* ******* DECLARATION GRAMMAR ******* */
pred_decl
    : PRED qual_name para_decls? block
        { $$ = { type: 'predicate', name: $2, parameters: $3, body: $4 }; }
    ;

fun_decl
    : FUN qual_name para_decls? ':' helper_mult? expr block
        { $$ = { type: 'function', name: $2, parameters: $3, return_type: $5, body: $6 }; }
    ;

para_decls
    : '(' para_decl_list? ')'
    | '[' para_decl_list? ']'
    ;

para_decl_list
    : para_decl
    | para_decl ',' para_decl_list
    ;

para_decl
    : DISJ? name_list ':' helper_mult? expr
    ;

helper_mult
    : LONE
    | SET
    | ONE
    | FUNC
    | PFUNC
    ;

/* ******* TESTING GRAMMAR ******* */
assert_decl
    : ASSERT qual_name? block
        { $$ = { type: 'assertion', name: $2, body: $3 }; }
    ;

cmd_decl
    : (qual_name ':' )? (RUN | CHECK) (qual_name | block)? scope? (FOR bounds)?
        { $$ = { type: 'command', name: $1, action: $3, scope: $5, bounds: $7 }; }
    ;

test_decl
    : (qual_name ':' )? (qual_name | block) scope? (FOR bounds)? IS (SAT | UNSAT | UNKNOWN | THEOREM | FORGE_ERROR)
        { $$ = { type: 'test', name: $1, body: $3, scope: $4, bounds: $6, result: $8 }; }
    ;

test_expect_decl
    : TEST? EXPECT qual_name? test_block
        { $$ = { type: 'test_expect', name: $3, body: $4 }; }
    ;

test_block
    : '{' test_decl* '}'
        { $$ = $2; }
    ;

scope
    : FOR NUMBER (BUT typescope_list)?
    | FOR typescope_list
    ;

typescope
    : EXACTLY? NUMBER qual_name
    ;

property_decl
    : ASSERT qual_name IS (SUFFICIENT | NECESSARY) FOR qual_name scope? (FOR bounds)?
        { $$ = { type: 'property', name: $2, condition: $4, subject: $6, scope: $7, bounds: $9 }; }
    ;

test_suite_decl
    : TEST SUITE FOR qual_name '{' test_construct* '}'
        { $$ = { type: 'test_suite', name: $4, body: $6 }; }
    ;

test_construct
    : example_decl
    | test_expect_decl
    | property_decl
    | quantified_property_decl
    ;

example_decl
    : 
    ;

quantified_property_decl
    : 
    ;


/* ******* EXPRESSOIN GRAMMAR ******* */
expr_list
    : expr
    | expr ',' expr_list
    ;

expr
    : prefix_expr
    | infix_expr
    | postfix_expr
    | basic_expr
    ;

prefix_expr
    : prefix_operator expr
    ;

infix_expr
    : expr infix_operator Expr
    ;

postfix_expr
    : expr postfix_operator
    ;

prefix_operator
    : NOT
    | ALWAYS
    | EVENTUALLY
    | AFTER
    | BEFORE
    | ONCE
    | HISTORICALLY
    | BACKTICK
    | PRIME
    | TILDE
    | CARET
    | STAR
    ;

infix_operator
    : OR
    | AND
    | IFF
    | IMPLIES
    | XOR
    | UNTIL
    | RELEASE
    | SINCE
    | TRIGGERED
    | PLUS
    | MINUS
    | AMPERSAND /* PPLUS, SUBT, SUPT */
    | '.'
    | '->'
    ;

postfix_operator
    : '[' expr_list ']'
    ;

basic_expr
    : const
    | block
    | qual_name
    | '(' expr ')'
    ;

block
    : '{' expr* '}'
    ;


const
    : NONE
    | UNIV
    | IDEN
    | '-'? NUMBER
    ;

%%
