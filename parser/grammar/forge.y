/* Forge parser in jison */

%{
/* Definitions and imports go here */

const yy = {};

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

/* Operator associations and precedence */
// TODO

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
    : FILEPATH | qualified_name
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
    : OPTION qualified_name option_value
        { $$ = parserActions.createOptionStatement($2, $3); }
    ;

option_value
    : qualified_name
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

    
/* ******* SIG GRAMMAR ******* */
sig_decl
    : sig_modifiers? sig_multiplicity? SIG IDEN sig_ext? '{' field_decls? '}'
        { $$ = parserActions.createSigDecl($1 || [], $2 || [], parserActions.createIdentifier($4, @4), $5, $7); }
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
    : EXTENDS qualified_name
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
        { $$ = [parserActions.createIdentifier($1, this._$)]; }
    | name_list ',' IDEN
        { $$ = $1.concat([parserActions.createIdentifier($3, this._$)]); }
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

qualified_name
    : IDEN
        { $$ = parserActions.createQualifiedName([parserActions.createIdentifier($1, this._$)], this._$); }
    | qualified_name '.' IDEN
        { $$ = parserActions.createQualifiedName($1.parts.concat([parserActions.createIdentifier($3, this._$)]), this._$); }
    ;

/* ******* PRED DECLARATIONS ******* */
pred_decl
    : PRED IDEN param_decls? block
        { $$ = parserActions.createPredDecl(parserActions.createIdentifier($2, @2), $3 || [], $4, @$); }
    ;

param_decls
    : '[' param_decl ']'
        { $$ = [$2]; }
    | '[' param_decl (',' param_decl)+ ']'
        { $$ = [$2].concat($3.map(p => p[1])); }
    ;

param_decl
    : IDEN ':' expr
        { $$ = parserActions.createParamDecl($1, $3, @$); }
    ;

expr
    : quantified_expr
    | atom
    ;

quantified_expr
    : quantifier var_decls quantified_expr_body?
    ;

quantified_expr_body
    : '|' expr
    ;

quantifier
    : ALL
    | SOME
    | NO
    | LONE
    | ONE
    ;

var_decls
    : IDEN
        { $$ = [parserActions.createIdentifier($1, this._$)]; }
    | IDEN ':' expr
        { $$ = [{ name: parserActions.createIdentifier($1, this._$), type: $3 }]; }
    | var_decls ',' IDEN ':' expr
        { $$ = $1.concat([{ name: parserActions.createIdentifier($3, this._$), type: $5 }]); }
    ;

binary_expr
    : expr AND expr
    | expr OR expr
    | expr IMPLIES expr
    | expr IFF expr
    | expr '+' expr
    | expr '-' expr
    | expr '*' expr
    | expr '/' expr
    | expr '=' expr
    | expr '!=' expr
    | expr IN expr
    | expr NOT IN expr
    | expr '<' expr
    | expr '>' expr
    | expr '<=' expr
    | expr '>=' expr
    ;

unary_expr
    : NOT expr
    | NO expr
    | SOME expr
    | ONE expr
    | LONE expr
    | '~' expr
    | '^' expr
    | '*' expr
    ;

atom
    : IDEN
    | NUMBER
    | qualified_name
    | function_call
    ;

function_call
    : qualified_name '[' expr_list ']'
    ;

expr_list
    : expr (',' expr)*
    ;


assert_decl
    : ASSERT IDEN? block
    ;

cmd_decl
    : (RUN | CHECK) (IDEN | block) scope?
    ;

test_decl
    : TEST EXPECT IDEN? '{' test_case* '}'
    ;

test_case
    : IDEN ':' (qualified_name | block) scope? IS (SAT | UNSAT | UNKNOWN | THEOREM | FORGE_ERROR)
    ;

example_decl
    : EXAMPLE IDEN IS expr FOR bounds
    ;

property_decl
    : ASSERT IDEN IS (SUFFICIENT | NECESSARY) FOR IDEN scope? (FOR bounds)?
    ;

scope
    : FOR NUMBER (BUT typescope_list)?
    | FOR typescope_list
    ;

typescope_list
    : typescope (',' typescope)*
    ;

typescope
    : NUMBER qualified_name
    ;

bounds
    : '{' bound_statement* '}'
        { $$ = $2; }
    ;

bound_statement
    : qualified_name '=' expr
        { $$ = { type: $1, value: $3 }; }
    ;

block
    : '{' expr '}'
    ;

%%
