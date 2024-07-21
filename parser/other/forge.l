%{

#include "forge.tab.h"
#include <stdlib.h>
#include <string.h>

%}

%%

[ \t]+                  /* skip whitespace */
[\n]+                   /* skip newlines */
\/\*([^*]|\*+[^/])*\*\/ /* skip multiline comments */
\/\/.*                  /* skip single-line comments starting with // */
--.*                    /* skip single-line comments starting with -- */

[0-9]+ {
    printf("Matched INT: %s\n", yytext);
    yylval.num = atoi(yytext);
    return INT;
}
[a-zA-Z_][a-zA-Z0-9_]* {
    printf("Matched IDEN: %s\n", yytext);
    yylval.str = strdup(yytext);
    return IDEN;
}
\"([^\"]*)\" {
    printf("Matched FILEPATH: %s\n", yytext);
    yylval.str = strdup(yytext + 1);
    yytext[yyleng - 1] = '\0';
    return FILEPATH;
}

"#"                     { return HASH; }
"lang"                  { return LANG; }
"forge"                 { return FORGE; }
"forge/bsl"             { return FROGLET; }
"forge/temporal"        { return TEMPORAL; }
"eval"                  { return EVAL; }
"open"                  { return OPEN; }
"as"                    { return AS; }

%%

int yywrap() {
    return 1;
}

