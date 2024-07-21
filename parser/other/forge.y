%{

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void yyerror(const char *s);
int yyparse(void);
int yylex(void);

%}

%union {
    int num;
    char *str;
}

%token <str> IDEN 
%token <int> INT
%token LANG 
%token FORGE FROGLET TEMPORAL
%token EVAL
%token HASH
%token OPEN FILEPATH AS 


%start forgespec

%%
/* Rules */
forgespec:
	 forgemodule
	 | evalmodule
	 ;

evalmodule:
	  evaldecllist
	  ;

evaldecllist:
	  evaldecl
	  | evaldecllist evaldecl
	  | /* empty */
	  ;

evaldecl:
	EVAL /* TODO: add more stuff here */
	;

forgemodule:
	   langdecl importlist 
	   ;

langdecl:
	HASH LANG langname
	 ;

langname:
	FORGE
	| FROGLET 
	| TEMPORAL
	;

importlist:
	  importdecl
	  | importlist importdecl
	  | /* empty */
	  ;

importdecl:
	  OPEN FILEPATH asoptional
	  ;

asoptional:
	  AS
	  | /* empty */
	  ;

constraintlist:
	  | /* empty */
	  ;

%%

void yyerror(const char *s)
{
	fprintf(stderr, "%s\n", s);
}

int main(int argc, char **argv)
{
	yyparse();
	return 0;
}
