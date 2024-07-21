/* A Bison parser, made by GNU Bison 2.3.  */

/* Skeleton interface for Bison's Yacc-like parsers in C

   Copyright (C) 1984, 1989, 1990, 2000, 2001, 2002, 2003, 2004, 2005, 2006
   Free Software Foundation, Inc.

   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2, or (at your option)
   any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor,
   Boston, MA 02110-1301, USA.  */

/* As a special exception, you may create a larger work that contains
   part or all of the Bison parser skeleton and distribute that work
   under terms of your choice, so long as that work isn't itself a
   parser generator using the skeleton or a modified version thereof
   as a parser skeleton.  Alternatively, if you modify or redistribute
   the parser skeleton itself, you may (at your option) remove this
   special exception, which will cause the skeleton and the resulting
   Bison output files to be licensed under the GNU General Public
   License without this special exception.

   This special exception was added by the Free Software Foundation in
   version 2.2 of Bison.  */

/* Tokens.  */
#ifndef YYTOKENTYPE
# define YYTOKENTYPE
   /* Put the tokens into the symbol table, so that GDB and other debuggers
      know about them.  */
   enum yytokentype {
     IDEN = 258,
     OPTION = 259,
     VALUE = 260,
     LANG = 261,
     SIG = 262,
     ABSTRACT = 263,
     EXTENDS = 264,
     LONE = 265,
     ONE = 266,
     SET = 267,
     PFUNC = 268,
     FUNC = 269,
     PRED = 270,
     FUN = 271,
     RUN = 272,
     CHECK = 273,
     EXAMPLE = 274,
     TEST = 275,
     ASSERT = 276,
     FOR = 277,
     IN = 278,
     ELSE = 279,
     LET = 280,
     INT = 281,
     ARROW = 282,
     DOT = 283,
     COMMA = 284,
     COLON = 285,
     SEMICOLON = 286,
     LBRACE = 287,
     RBRACE = 288,
     LPAREN = 289,
     RPAREN = 290,
     NOT = 291,
     AND = 292,
     OR = 293,
     IMPLIES = 294,
     IFF = 295,
     PLUS = 296,
     MINUS = 297,
     STAR = 298,
     CARET = 299,
     TILDE = 300,
     EQ = 301,
     NEQ = 302
   };
#endif
/* Tokens.  */
#define IDEN 258
#define OPTION 259
#define VALUE 260
#define LANG 261
#define SIG 262
#define ABSTRACT 263
#define EXTENDS 264
#define LONE 265
#define ONE 266
#define SET 267
#define PFUNC 268
#define FUNC 269
#define PRED 270
#define FUN 271
#define RUN 272
#define CHECK 273
#define EXAMPLE 274
#define TEST 275
#define ASSERT 276
#define FOR 277
#define IN 278
#define ELSE 279
#define LET 280
#define INT 281
#define ARROW 282
#define DOT 283
#define COMMA 284
#define COLON 285
#define SEMICOLON 286
#define LBRACE 287
#define RBRACE 288
#define LPAREN 289
#define RPAREN 290
#define NOT 291
#define AND 292
#define OR 293
#define IMPLIES 294
#define IFF 295
#define PLUS 296
#define MINUS 297
#define STAR 298
#define CARET 299
#define TILDE 300
#define EQ 301
#define NEQ 302




#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
typedef union YYSTYPE
#line 10 "test.y"
{
    char *str;
}
/* Line 1529 of yacc.c.  */
#line 147 "test.tab.h"
	YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif

extern YYSTYPE yylval;

