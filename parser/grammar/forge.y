/* Forge parser in jison */

%{
/* Definitions and imports go here */

const yy = {

};

const parserActions = {
    createIdentifier: function(name, location) {
        return {
            type: 'identifier',
            name: name,
            location: location
        };
    },

    createReference: function(identifier, location) {
        return {
            type: 'reference',
            name: identifier.name,
            location: location
        };
    },

    createSigDecl: function(modifiers, multiplicity, name, ext, fields, location) {
        return {
            type: 'sig_decl',
            name: name, 
            modifiers: modifiers,
            multiplicity: multiplicity,
            extends: ext,
            fields: fields,
            location: location
        };
    },

    createPredDecl: function(name, params, body, location) {
        return {
            type: 'pred_decl',
            name: name, 
            params: params,
            body: body,
            location: location
        };
    },

    createQualifiedName: function(parts, location) {
        return {
            type: 'qualified_name',
            name: parts.map(p => p.name).join('.'),
            parts: parts,
            location: location
        };
    },

    createFieldDecl: function(isVar, names, multiplicity, expr, location) {
        return {
            type: 'field_decl',
            isVar: isVar,
            names: names.map(n => n.name),
            multiplicity: multiplicity,
            expr: expr,
            location: location
        };
    },

    createFunDecl: function(qualifier, name, params, returnMult, returnExpr, body, location) {
        return {
            type: 'fun_decl',
            qualifier: qualifier,
            name: name,
            params: params,
            returnMultiplicity: returnMult,
            returnExpr: returnExpr,
            body: body,
            location: location
        };
    },

    createForgeModule: function(langDecl, imports, options, paragraphs, location) {
        return {
            type: 'forge_module',
            langDeclaration: langDecl,
            imports: imports,
            options: options,
            paragraphs: paragraphs,
            location: location
        };
    },

    createImportStatement: function(file, alias, location) {
        return {
            type: 'import_statement',
            file: file,
            alias: alias,
            location: location
        };
    },

    createOptionStatement: function(name, value, location) {
        return {
            type: 'option_statement',
            name: name,
            value: value,
            location: location
        };
    },

    createBlock: function(exprs, location) {
        return {
            type: 'block',
            expressions: exprs,
            location: location
        }
    },

    createExpr: function(type, args, location) {
        return {
            type: type,
            ...args,
            location: location
        };
    },

    createParamDecl: function(name, type, location) {
        return {
            type: 'param_decl',
            name: name,
            paramType: type,
            location: location
        };
    }
};
%}

%lex
%ebnf

/* Operator precedence declarations */

%right unary_op
%left binary_op

%left '|'
%right 'LET'
%left 'OR'
%left 'XOR'
%left 'AND'
%left 'IFF'
%right 'IMPLIES'
%right 'ELSE'
%nonassoc 'UNTIL' 'RELEASE' 'SINCE' 'TRIGGERED'
/* %right 'NOT' */
%right 'ALWAYS' 'EVENTUALLY' 'AFTER' 'BEFORE' 'ONCE' 'HISTORICALLY'
%left '=' '!=' 
%left'IN' 
%left 'NOT'
%left '<' '>' '<=' '>='
%left 'NO' 'SOME' 'LONE' 'ONE' 'TWO' 'SET'
%left '+' '-'
%left '&'
%right '->'
%left '['
%left '.'
%left 'PRIME'
%right '~' '^' '*'

%start forge_specification

%% /* language grammar */

forge_specification
    : forge_module EOF
        { return $1; }
    | EOF
    /* | eval_module EOF */
    ;

eval_module: /* Don't understand this yet */
       ;

forge_module
    : lang_declaration imports options paragraphs
        { $$ = parserActions.createForgeModule($1, $2, $3, $4, @$); }
    ;

lang_declaration
    : LANG forge_lang 
        { $$ = $2; }
    ;

forge_lang
    : FORGE | FORGE_FROGLET | FORGE_TEMPORAL
    ;

imports
    : import_statement*
        { $$ = $1; }
    ;

import_statement
    : OPEN import_file import_as?
        { $$ = parserActions.createImportStatement($2, $3, @$); }
    ;

import_file
    : FILEPATH 
    ;

import_as
    : AS IDEN
        { $$ = $2; }
    ;

options
    : option_statement*
        { $$ = $1; }
    ;

option_statement
    : OPTION IDEN option_value
        { $$ = parserActions.createOptionStatement($2, $3); }
    ;

option_value
    : IDEN
    | FILEPATH
    | NUMBER 
    | '-' NUMBER
        { $$ = -$2; }
    ;

paragraphs
    : paragraph*
        { $$ = $1; }
    ;

paragraph
    : sig_decl
    | pred_decl
    ;

dummy
    :
    | assert_decl
    | cmd_decl
    | test_decl
    | expect_decl
    | inst_decl
    ;

    
/* ******* SIG GRAMMAR ******* */
sig_decl
    : sig_modifiers? sig_multiplicity? SIG IDEN sig_ext? '{' field_decls? '}'
        { $$ = parserActions.createSigDecl($1 || [], $2 || [], parserActions.createIdentifier($4, @4), $5, $7, @$); }
    ;

sig_multiplicity
    : TWO | ONE | LONE | SOME
        { $$ = $1; }
    ;

sig_modifiers
    : VAR
        { $$ = ['var']; }
    | ABSTRACT
        { $$ = ['abstract']; }
    | VAR ABSTRACT
        { $$ = ['var', 'abstract']; }
    | ABSTRACT VAR
        { $$ = ['abstract', 'var']; }
    ;

sig_ext
    : EXTENDS IDEN /* does this need to have . support */
        { $$ = $2; }
    ;

field_decls
    : field_decl (',' field_decl)*
        { $$ = [$1].concat($2.map(d => d[1])); }
    ;

field_decl
    : VAR name_list ':' relation_mult relation_expr
        { $$ = parserActions.createFieldDecl(true, $2, $4, $5, @$); }
    | name_list ':' relation_mult relation_expr
        { $$ = parserActions.createFieldDecl(false, $1, $3, $4, @$); }
    /* | name_list ':' relation_mult relation_expr */
    ;

name_list
    : IDEN
        { $$ = [parserActions.createIdentifier($1, @1)]; }
    | name_list ',' IDEN
        { $$ = $1.concat([parserActions.createIdentifier($3, @3)]); }
    ;

relation_mult
    : LONE | SET | ONE | TWO | FUNC | PFUNC
        { $$ = $1; }
    ;

relation_expr
    : qualified_name
    | qualified_name '->' relation_expr
        { $$ = parserActions.createExpr('->', {left: $1, right: $3}, @$); }
    ;

/* ******* PREDICATE GRAMMAR ******* */
pred_decl
    : PRED IDEN param_decls? block
        { $$ = parserActions.createPredDecl(parserActions.createIdentifier($2, @2), $3 || [], $4, @$); }
    ;

param_decls
    : '[' param_decl (',' param_decl)* ']'
        { $$ = [$2].concat($3.map(p => p[1])); }
    ;

param_decl
    : IDEN ':' expr
        { $$ = parserActions.createParamDecl($1, $3, @$); }
    ;

block
    : '{' expr* '}'
        { $$ = parserActions.createBlock($2, @$); }
    ;

fun_decl
    : (FUNC | PFUNC) qualifier? IDEN param_decls? ':' helper_mult? expr '{' expr '}'
        { $$ = parserActions.createFunDecl($2, $3, $4, $6, $7, $9, @$); }
    ;

helper_mult
    : LONE | SET | ONE | TWO
    ;
    
/* ******* EXPRESSION GRAMMAR ******* */
expr
    : atom
    | qualified_expr
    | quantified_expr
    | logical_expr
    /* | binary_expr */
    | unary_expr
    | let_expr
    | '(' expr ')'
        { $$ = $2; }
    | block
    ;

logical_expr
    : expr OR expr
        { $$ = parserActions.createExpr('binary', {op: 'OR', left: $1, right: $3}, @$); }
    | expr XOR expr
    | expr AND expr
    | expr IFF expr
    | expr IMPLIES expr
    | expr IMPLIES expr ELSE expr
    ;

unary_expr
    : unary_op expr
        { $$ = parserActions.createExpr($1, {operand: $2}, @$); }
    ;

binary_expr
    : expr binary_op expr
    ;

implies_else_expr
    : expr IMPLIES expr ELSE expr
        { $$ = parserActions.createExpr('implies_else', {condition: $1, consequent: $3, alternative: $5}, @$); }
    ;

quantified_expr
    : quantifer DISJ? var_decls block_or_bar 
        { $$ = parserActions.createExpr('quantified', {quantifier: $1, disj: $2, declarations: $3, body: $4}, @$); }
    ;

let_expr
    : LET let_decl_list block_or_bar
        { $$ = parserActions.createExpr('let', {declarations: $2, body: $3}, @$); }
    ;

function_call
    : qualified_expr '[' expr_list ']'
        { $$ = parserActions.createExpr('function_call', {base: $1, args: $3}, @$); }
    ;

qualified_expr
    : IDEN '.' IDEN
        { $$ = parserActions.createExpr('qualified_expr', {base: $1, name: $3}, @$); }
    | qualified_expr '.' IDEN
        { $$ = parserActions.createExpr('qualified_expr', {base: $1, name: $3}, @$); }
    ;

atom
    : NUMBER
        { $$ = parserActions.createExpr('number', {value: $1}, @$); }
    | '-' NUMBER
        { $$ = parserActions.createExpr('number', {value: -$2}, @$); }
    | IDEN
    | '@' IDEN
        { $$ = parserActions.createExpr('at', {name: $2}, @$); }
    | '`' IDEN
        { $$ = parserActions.createExpr('backquote', {name: $2}, @$); }
    ;

let_decl_list
    : let_decl (',' let_decl)*
        { $$ = [$1].concat($2.map(d => d[1])); }
    ;

let_decl
    : IDEN '=' expr
        { $$ = {name: $1, value: $3}; }
    ;

block_or_bar
    : block | bar
    ;

bar
    : '|' expr
        { $$ = $2; }
    ;

quantifier
    : ALL | SOME | NO | LONE | ONE
    ;

var_decls
    : var_decl_item (',' var_decl_item)*
        { $$ = [$1].concat($2.map(d => d[1])); }
    ;

var_decl_item
    : IDEN_list ':' expr
        { $$ = {names: $1, type: $3}; }
    ;

IDEN_list
    : IDEN
        { $$ = [$1]; }
    | IDEN_list ',' IDEN
        { $$ = $1.concat([$3]); }
    ;


binary_op
    : UNTIL | RELEASE | SINCE | TRIGGERED
    | '=' | '!=' | IN | NOT IN 
    | '<' | '>' | '<=' | '>='
    | '+' | '-' | '&' 
    | '->' 
    | '.' /* do i need to include this */
    ;


unary_op
    : NOT | ALWAYS | EVENTUALLY | AFTER | BEFORE | ONCE | HISTORICALLY
    | '~' | '^' | '*' 
    | NO | SOME | LONE | ONE | TWO | SET
    ;


expr_list
    : expr (',' expr)*
        { $$ = [$1].concat($2.map(e => e[1])); }
    ;

qualified_name
    : IDEN
    /* HERE CHECK AGAIN */
    ;

/* ******* TESTING GRAMMAR ******* */
assert_decl
    : ASSERT IDEN? block
    ;

cmd_decl
    : (RUN | CHECK) (IDEN | block) scope? 
    ;

expect_decl
    : EXPECT IDEN? test_block
    ;

test_decl
    : TEST EXPECT IDEN? test_block
    ;

test_block
    : '{' test_case* '}'
    ;

test_case
    : test_case_label? test_case_body
    ;

test_case_label
    : IDEN ':'
    ;

test_case_body
    : (qualified_name | block) scope? IS (SAT | UNSAT | UNKNOWN | THEOREM | FORGE_ERROR)
    ;

example_decl
    : EXAMPLE IDEN IS expr FOR bounds
    ;

property_decl
    : ASSERT IDEN IS (SUFFICIENT | NECESSARY) FOR IDEN scope? (FOR bounds)?
    ;

inst_decl
    : INST IDEN bounds scope?
    ;

scope
    : FOR NUMBER (BUT typescope_list)?
    | FOR typescope_list
    ;

typescope_list
    : typescope (',' typescope)*
    ;

typescope
    : EXACTLY? NUMBER qualified_name
    ;

bounds
    : '{' bound_statement* '}'
        { $$ = $2; }
    ;

bound_statement
    : qualified_name '=' expr
        { $$ = { type: $1, value: $3 }; }
    ;

%%