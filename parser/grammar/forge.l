%{
/* Definitions and imports go here */
%}

%%
\s+                         /* Ignore whitespace */
[\n]+                       /* Ignore newlines */

"--".*           /* Ignore comment */
"//".*           /* Ignore comment */
"/\\*".*"\\*/"   /* Ignore comment */
"/\\*[^*]*\\*+(?:[^/*][^*]*\\*+)*/"  { /* Ignore multiline comments  DOESNT WORK*/ }

"#lang"               return 'LANG';
"forge/temporal"      return 'FORGE_TEMPORAL';
"forge/bsl"           return 'FORGE_FROGLET';
"forge"               return 'FORGE';


"="                    return '=';
"!="                   return '!=';
"<"                    return '<';
"<="                   return '<=';
">"                    return '>';
">="                   return '>=';

"open"                 return 'OPEN';
"as"                   return 'AS';
"option"               return 'OPTION';

"sig"               return 'SIG';
"abstract"          return 'ABSTRACT';
"extends"           return 'EXTENDS';
"var"               return 'VAR';
"in"                return 'IN';
"lone"              return 'LONE';
"one"               return 'ONE';
"set"               return 'SET';
"pfunc"             return 'PFUNC';
"func"              return 'FUNC';
"disj"              return 'DISJ';
"pred" return 'PRED';
"let" return 'LET';

"and"               return 'AND';
"or"                return 'OR';
"xor"               return 'XOR';
"implies"           return 'IMPLIES';
"else" return 'ELSE';
"=>"                return 'IMPLIES';
"iff"               return 'IFF';
"<=>"               return 'IFF';
"until"             return 'UNTIL';
"release"           return 'RELEASE';
"since"             return 'SINCE';
"triggered"           return 'TRIGGERED';
"&"                 return '&';
"`"                 return '`';
"->"                   return '->';
"|" return '|';

"+"		 return '+';
"-"		 return '-';
"*"		 return '*';
"'"		 return 'PRIME';
"~"		 return '~';
"^"		 return '^';

"all"               return 'ALL';
"some"              return 'SOME';
"no"                return 'NO';
"none"              return 'NONE';

"not"               return 'NOT';
"always"            return 'ALWAYS';
"eventually"        return 'EVENTUALLY';
"after"             return 'AFTER';
"before"            return 'BEFORE';
"once"              return 'ONCE';
"historically"      return 'HISTORICALLY';

"assert"            return 'ASSERT';
"check"             return 'CHECK';
"run"               return 'RUN';
"expect"            return 'EXPECT';
"inst" 				return 'INST';
"test"              return 'TEST';
"is"                return 'IS';
"sat"               return 'SAT';
"unsat"             return 'UNSAT';
"unknown"           return 'UNKNOWN';
"theorem"           return 'THEOREM';
"forge_error"       return 'FORGE_ERROR';
"sufficient"        return 'SUFFICIENT';
"necessary"         return 'NECESSARY';
"suite"             return 'SUITE';
"for"               return 'FOR';
"but"               return 'BUT';
"exactly"           return 'EXACTLY';


"["                    return '[';
"]"                    return ']';
"{"                    return '{';
"}"                    return '}';
"("                    return '(';
")"                    return ')';
"."                    return '.';
","                    return ',';
":"                    return ':';


[0-9]+                 return 'NUMBER';
[a-zA-Z0-9_]+ return 'IDEN';
/* [0-9]+("."[0-9]+)?\b  return 'DECIMAL'; */
\"[^\"]*\"             return 'FILEPATH';

.                      { console.log('Unmatched text: ' + yytext); }
<<EOF>>                return 'EOF';
