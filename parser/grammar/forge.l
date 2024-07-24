%{
/* Definitions and imports go here */
%}

%%
\s+                         /* Ignore whitespace */
[\n]+                       /* Ignore newlines */

"#lang"               return 'LANG';
"forge/temporal"      return 'FORGE_TEMPORAL';
"forge/bsl"           return 'FORGE_FROGLET';
"forge"               return 'FORGE';

"--".*           /* Ignore comment */
"//".*           /* Ignore comment */
"/\\*".*"\\*/"   /* Ignore comment */
"/\\*[^*]*\\*+(?:[^/*][^*]*\\*+)*/"  { /* Ignore multiline comments */ }

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

"and"               return 'AND';
"or"                return 'OR';
"xor"               return 'XOR';
"implies"           return 'IMPLIES';
"=>"                return 'IMPLIES';
"iff"               return 'IFF';
"<=>"               return 'IFF';
"until"             return 'UNTIL';
"release"           return 'RELEASE';
"since"             return 'SINCE';
"triggered"           return 'TRIGGERED'; /* WHAT IS THIS? */
"&"                 return 'AMPERSAND';
"`"                 return 'BACKTICK';

"+"		 return 'PLUS';
"-"		 return 'MINUS';
"*"		 return 'STAR';
"'"		 return 'PRIME';
"~"		 return 'TILDE';
"^"		 return 'CARET';

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

"="                    return 'EQUALS';
"!="                   return 'NOT_EQUALS';
"<"                    return 'LESS_THAN';
"<="                   return 'LEQ';
">"                    return 'GREATER_THAN';
">="                   return 'GEQ';

/* No need to parser these? */
"["                    return '[';
"]"                    return ']';
"{"                    return '{';
"}"                    return '}';
"("                    return '(';
")"                    return ')';
"."                    return '.';
","                    return ',';
":"                    return ':';
"->"                   return '->';



[a-zA-Z_][a-zA-Z0-9_]* return 'IDEN';
/* [0-9]+("."[0-9]+)?\b  return 'DECIMAL'; */
[0-9]+                 return 'INT';
\"[^\"]*\"             return 'FILE_PATH';

.                      { console.log('Unmatched text: ' + yytext); }
<<EOF>>                return 'EOF';
