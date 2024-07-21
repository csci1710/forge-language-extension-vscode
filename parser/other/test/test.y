%{

#include <stdio.h>
#include <stdlib.h>

void yyerror(const char *s);
int yylex(void);

%}

%union {
    char *str;
}

%token <str> IDEN
%token <str> OPTION
%token <str> VALUE
%token <str> LANG
%token <str> SIG
%token <str> ABSTRACT
%token <str> EXTENDS
%token <str> LONE
%token <str> ONE
%token <str> SET
%token <str> PFUNC
%token <str> FUNC
%token <str> PRED
%token <str> FUN
%token <str> RUN
%token <str> CHECK
%token <str> EXAMPLE
%token <str> TEST
%token <str> ASSERT
%token <str> FOR
%token <str> IN
%token <str> ELSE
%token <str> LET
%token <str> INT
%token <str> ARROW
%token <str> DOT
%token <str> COMMA
%token <str> COLON
%token <str> SEMICOLON
%token <str> LBRACE
%token <str> RBRACE
%token <str> LPAREN
%token <str> RPAREN
%token <str> NOT
%token <str> AND
%token <str> OR
%token <str> IMPLIES
%token <str> IFF
%token <str> PLUS
%token <str> MINUS
%token <str> STAR
%token <str> CARET
%token <str> TILDE
%token <str> EQ
%token <str> NEQ

%type <str> iden option value sig field_expr fmla expr pred fun constraint

%left EQ
%left OR
%left AND
%left IFF
%left PLUS MINUS
%left DOT
%left ARROW
%left NOT
%left TILDE CARET STAR
%right IMPLIES

%%

program:
    module_declaration options sigs constraints
    {
        printf("Parsed program successfully.\n");
    }
    ;

module_declaration:
    LANG iden
    {
        printf("Module: %s\n", $2);
    }
    ;

options:
    option_list
    | /* empty */
    ;

option_list:
    option_list option
    | option
    ;

option:
    OPTION iden value
    {
        printf("Option: %s %s\n", $2, $3);
    }
    ;

value:
    IDEN
    | INT
    ;

sigs:
    sigs sig
    | /* empty */
    ;

sig:
    sig_declaration LBRACE fields RBRACE
    {
    }
    ;

sig_declaration:
    SIG iden
    {
    }
    | ABSTRACT SIG iden
    {
    }
    | ONE SIG iden
    {
    }
    | LONE SIG iden
    {
    }
    | SIG iden EXTENDS iden
    {
    }
    | ABSTRACT SIG iden EXTENDS iden
    {
    }
    | ONE SIG iden EXTENDS iden
    {
    }
    | LONE SIG iden EXTENDS iden
    {
    }
    ;

fields:
    fields field_expr SEMICOLON
    | /* empty */
    ;

field_expr:
    iden COLON field_type
    {
    }
    ;

field_type:
    ONE iden
    | LONE iden
    | SET iden
    | arrow_type
    ;

arrow_type:
    iden ARROW arrow_type
    | PFUNC iden ARROW arrow_type
    | FUNC iden ARROW arrow_type
    | iden
    ;

constraints:
    constraint_list
    | /* empty */
    ;

constraint_list:
    constraint_list constraint
    | constraint
    ;

constraint:
    pred
    | fun
    ;

pred:
    PRED iden LBRACE body RBRACE
    {
        printf("Predicate: %s\n", $2);
    }
    | PRED iden LPAREN param_list RPAREN LBRACE body RBRACE
    {
        printf("Predicate with params: %s\n", $2);
    }
    ;

fun:
    FUN iden LPAREN param_list RPAREN LBRACE expr RBRACE
    {
        printf("Function: %s\n", $2);
    }
    ;

param_list:
    param_list COMMA iden COLON iden
    | iden COLON iden 
    | /* empty */
    ;

body:
    body_stmt_list
    ;

body_stmt_list:
    body_stmt_list body_stmt
    | body_stmt
    ;

body_stmt:
    fmla
    | expr
    ;

fmla:
    NOT fmla
    | fmla AND fmla
    | fmla OR fmla
    | fmla IMPLIES fmla
    | fmla IFF fmla
    | LPAREN fmla RPAREN
    | fmla EQ fmla
    | iden
    ;

expr:
    expr DOT expr
    | expr ARROW expr
    | expr PLUS expr
    | expr MINUS expr
    | expr AND expr
    | expr OR expr
    | TILDE expr
    | CARET expr
    | STAR expr
    | LET iden EQ expr IN expr
    | LPAREN expr RPAREN
    | iden
    ;

iden:
    IDEN
    ;

%%

void yyerror(const char *s) {
    fprintf(stderr, "Syntax error: %s\n", s);
}

int main(void) {
    return yyparse();
}

