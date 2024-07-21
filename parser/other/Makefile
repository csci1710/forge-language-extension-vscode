# Makefile for building the Forge parser

# Compiler and tools
CC = gcc
LEX = flex
YACC = bison

# File base name
FILE_BASE = forge

# Files
LEX_FILE = $(FILE_BASE).l
YACC_FILE = $(FILE_BASE).y
LEX_C_FILE = lex.yy.c
YACC_C_FILE = $(FILE_BASE).tab.c
YACC_H_FILE = $(FILE_BASE).tab.h
OUTPUT = $(FILE_BASE)_parser

# Compile and link flags
CFLAGS = 
#-Wall -Wextra

# Targets and rules
all: $(OUTPUT)

$(OUTPUT): $(YACC_C_FILE) $(LEX_C_FILE) 
	$(CC) $(CFLAGS) -o $@ $^ -ll

$(LEX_C_FILE): $(LEX_FILE)
	$(LEX) $<

$(YACC_C_FILE) $(YACC_H_FILE): $(YACC_FILE)
	$(YACC) -d $<

clean:
	rm -f $(LEX_C_FILE) $(YACC_C_FILE) $(YACC_H_FILE) $(OUTPUT)

.PHONY: all clean

