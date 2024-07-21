/* Forge grammar in Jison */

%lex

%%

\s+                    { /* skip whitespace */ console.log('WHITESPACE'); }
[\n]+                  { /* skip newlines */ console.log('NEWLINE'); }
\/\*([^*]|\*+[^/])*\*\/ { console.log('MULTILINE COMMENT'); /* skip multiline comments */ }
\/\/[^\n]*             { console.log('SINGLE-LINE COMMENT'); /* skip single-line comments starting with // */ }
--[^\n]*               { console.log('SINGLE-LINE COMMENT'); /* skip single-line comments starting with -- */ }

"#lang"                { console.log('LANG'); return 'LANG'; }
"forge"                { console.log('FORGE'); return 'FORGE'; }
"forge\\\\bsl"         { console.log('FROGLET'); return 'FROGLET'; }
"forge\\\\temporal"    { console.log('TEMPORAL'); return 'TEMPORAL'; }

.                      { console.log('INVALID'); return 'INVALID'; }

/lex


%start forgeSpec

%%

forgeSpec
    : forgeModule EOF
    ;

forgeModule
    : moduleDecl
    ;

moduleDecl
    : LANG langname
    ;

langname
    : FORGE
    | FROGLET
    | TEMPORAL
    ;

invalidToken
    : INVALID { throw new Error("Invalid token: " + yytext); }
    ;

