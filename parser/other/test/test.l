%{
#include "test.tab.h"
%}

%option noyywrap

%%

[ \t]+                  /* skip whitespace */
[\n]+                   /* skip newlines */
"/*"([^*]*\*+([^/*][^*]*\*+)*)"*/" /* skip comments */
"//".*                  /* skip comments */
"--".*                  /* skip comments */

"#lang"                 { return LANG; }
"option"                { return OPTION; }
"run"                   { return RUN; }
"check"                 { return CHECK; }
"example"               { return EXAMPLE; }
"test"                  { return TEST; }
"assert"                { return ASSERT; }
"for"                   { return FOR; }
"in"                    { return IN; }
"else"                  { return ELSE; }
"let"                   { return LET; }
"sig"                   { return SIG; }
"abstract"              { return ABSTRACT; }
"extends"               { return EXTENDS; }
"lone"                  { return LONE; }
"one"                   { return ONE; }
"set"                   { return SET; }
"pfunc"                 { return PFUNC; }
"func"                  { return FUNC; }
"pred"                  { return PRED; }
"fun"                   { return FUN; }
"not"                   { return NOT; }
"and"                   { return AND; }
"or"                    { return OR; }
"implies"               { return IMPLIES; }
"iff"                   { return IFF; }
"true"                  { yylval.str = strdup(yytext); return VALUE; }
"false"                 { yylval.str = strdup(yytext); return VALUE; }
"off"                   { yylval.str = strdup(yytext); return VALUE; }
"on"                    { yylval.str = strdup(yytext); return VALUE; }
[0-9]+                  { yylval.str = strdup(yytext); return INT; }

[a-zA-Z_][a-zA-Z0-9_]*  { yylval.str = strdup(yytext); return IDEN; }

"+"                     { return PLUS; }
"-"                     { return MINUS; }
"&"                     { return AND; }
"|"                     { return OR; }
"!"                     { return NOT; }
"="                     { return EQ; }
"!="                    { return NEQ; }
"->"                    { return ARROW; }
"."                     { return DOT; }
","                     { return COMMA; }
":"                     { return COLON; }
";"                     { return SEMICOLON; }
"{"                     { return LBRACE; }
"}"                     { return RBRACE; }
"("                     { return LPAREN; }
")"                     { return RPAREN; }
"~"                     { return TILDE; }
"^"                     { return CARET; }
"*"                     { return STAR; }

.                       { fprintf(stderr, "Unknown character: %s\n", yytext); }

%%

