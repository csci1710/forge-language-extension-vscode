// Generated from grammar/ForgeParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ForgeParserListener } from "./ForgeParserListener";
import { ForgeParserVisitor } from "./ForgeParserVisitor";


export class ForgeParserParser extends Parser {
	public static readonly OPEN_TOK = 1;
	public static readonly LEFT_SQUARE_TOK = 2;
	public static readonly RIGHT_SQUARE_TOK = 3;
	public static readonly AS_TOK = 4;
	public static readonly FILE_PATH_TOK = 5;
	public static readonly VAR_TOK = 6;
	public static readonly ABSTRACT_TOK = 7;
	public static readonly SIG_TOK = 8;
	public static readonly LEFT_CURLY_TOK = 9;
	public static readonly RIGHT_CURLY_TOK = 10;
	public static readonly EXTENDS_TOK = 11;
	public static readonly IN_TOK = 12;
	public static readonly PLUS_TOK = 13;
	public static readonly LONE_TOK = 14;
	public static readonly SOME_TOK = 15;
	public static readonly ONE_TOK = 16;
	public static readonly TWO_TOK = 17;
	public static readonly SET_TOK = 18;
	public static readonly FUNC_TOK = 19;
	public static readonly PFUNC_TOK = 20;
	public static readonly DISJ_TOK = 21;
	public static readonly COLON_TOK = 22;
	public static readonly WHEAT_TOK = 23;
	public static readonly PRED_TOK = 24;
	public static readonly DOT_TOK = 25;
	public static readonly FUN_TOK = 26;
	public static readonly LEFT_PAREN_TOK = 27;
	public static readonly RIGHT_PAREN_TOK = 28;
	public static readonly ASSERT_TOK = 29;
	public static readonly RUN_TOK = 30;
	public static readonly CHECK_TOK = 31;
	public static readonly FOR_TOK = 32;
	public static readonly BUT_TOK = 33;
	public static readonly EXACTLY_TOK = 34;
	public static readonly NONE_TOK = 35;
	public static readonly UNIV_TOK = 36;
	public static readonly IDEN_TOK = 37;
	public static readonly MINUS_TOK = 38;
	public static readonly IS_TOK = 39;
	public static readonly SAT_TOK = 40;
	public static readonly UNSAT_TOK = 41;
	public static readonly THEOREM_TOK = 42;
	public static readonly FORGE_ERROR_TOK = 43;
	public static readonly TEST_TOK = 44;
	public static readonly EXPECT_TOK = 45;
	public static readonly SUITE_TOK = 46;
	public static readonly BAR_TOK = 47;
	public static readonly ALL_TOK = 48;
	public static readonly SUFFICIENT_TOK = 49;
	public static readonly NECESSARY_TOK = 50;
	public static readonly LET_TOK = 51;
	public static readonly BIND_TOK = 52;
	public static readonly OR_TOK = 53;
	public static readonly XOR_TOK = 54;
	public static readonly IFF_TOK = 55;
	public static readonly IMP_TOK = 56;
	public static readonly ELSE_TOK = 57;
	public static readonly AND_TOK = 58;
	public static readonly UNTIL_TOK = 59;
	public static readonly RELEASE_TOK = 60;
	public static readonly SINCE_TOK = 61;
	public static readonly TRIGGERED_TOK = 62;
	public static readonly NEG_TOK = 63;
	public static readonly ALWAYS_TOK = 64;
	public static readonly EVENTUALLY_TOK = 65;
	public static readonly AFTER_TOK = 66;
	public static readonly BEFORE_TOK = 67;
	public static readonly ONCE_TOK = 68;
	public static readonly HISTORICALLY_TOK = 69;
	public static readonly CARD_TOK = 70;
	public static readonly PPLUS_TOK = 71;
	public static readonly AMP_TOK = 72;
	public static readonly SUBT_TOK = 73;
	public static readonly SUPT_TOK = 74;
	public static readonly PRIME_TOK = 75;
	public static readonly TILDE_TOK = 76;
	public static readonly EXP_TOK = 77;
	public static readonly STAR_TOK = 78;
	public static readonly AT_TOK = 79;
	public static readonly BACKQUOTE_TOK = 80;
	public static readonly THIS_TOK = 81;
	public static readonly SEXPR_TOK = 82;
	public static readonly INST_TOK = 83;
	public static readonly EVAL_TOK = 84;
	public static readonly EXAMPLE_TOK = 85;
	public static readonly ARROW_TOK = 86;
	public static readonly EQ_TOK = 87;
	public static readonly LT_TOK = 88;
	public static readonly GT_TOK = 89;
	public static readonly LEQ_TOK = 90;
	public static readonly GEQ_TOK = 91;
	public static readonly NI_TOK = 92;
	public static readonly NO_TOK = 93;
	public static readonly SUM_TOK = 94;
	public static readonly INT_TOK = 95;
	public static readonly OPTION_TOK = 96;
	public static readonly COMMA_TOK = 97;
	public static readonly SLASH_TOK = 98;
	public static readonly NUM_CONST_TOK = 99;
	public static readonly IDENTIFIER_TOK = 100;
	public static readonly WS = 101;
	public static readonly CCOMMENT = 102;
	public static readonly COMMENT = 103;
	public static readonly MULTCOMMENT = 104;
	public static readonly RULE_alloyModule = 0;
	public static readonly RULE_importDecl = 1;
	public static readonly RULE_paragraph = 2;
	public static readonly RULE_sigDecl = 3;
	public static readonly RULE_sigExt = 4;
	public static readonly RULE_mult = 5;
	public static readonly RULE_arrowMult = 6;
	public static readonly RULE_helperMult = 7;
	public static readonly RULE_paraDecl = 8;
	public static readonly RULE_quantDecl = 9;
	public static readonly RULE_arrowDecl = 10;
	public static readonly RULE_predType = 11;
	public static readonly RULE_predDecl = 12;
	public static readonly RULE_funDecl = 13;
	public static readonly RULE_paraDecls = 14;
	public static readonly RULE_assertDecl = 15;
	public static readonly RULE_cmdDecl = 16;
	public static readonly RULE_testDecl = 17;
	public static readonly RULE_testExpectDecl = 18;
	public static readonly RULE_testBlock = 19;
	public static readonly RULE_scope = 20;
	public static readonly RULE_typescope = 21;
	public static readonly RULE_const = 22;
	public static readonly RULE_satisfiabilityDecl = 23;
	public static readonly RULE_propertyDecl = 24;
	public static readonly RULE_quantifiedPropertyDecl = 25;
	public static readonly RULE_testSuiteDecl = 26;
	public static readonly RULE_testConstruct = 27;
	public static readonly RULE_arrowOp = 28;
	public static readonly RULE_compareOp = 29;
	public static readonly RULE_letDecl = 30;
	public static readonly RULE_block = 31;
	public static readonly RULE_blockOrBar = 32;
	public static readonly RULE_quant = 33;
	public static readonly RULE_qualName = 34;
	public static readonly RULE_optionDecl = 35;
	public static readonly RULE_name = 36;
	public static readonly RULE_nameList = 37;
	public static readonly RULE_qualNameList = 38;
	public static readonly RULE_paraDeclList = 39;
	public static readonly RULE_quantDeclList = 40;
	public static readonly RULE_arrowDeclList = 41;
	public static readonly RULE_letDeclList = 42;
	public static readonly RULE_typescopeList = 43;
	public static readonly RULE_exprList = 44;
	public static readonly RULE_expr = 45;
	public static readonly RULE_expr1 = 46;
	public static readonly RULE_expr1_5 = 47;
	public static readonly RULE_expr2 = 48;
	public static readonly RULE_expr3 = 49;
	public static readonly RULE_expr4 = 50;
	public static readonly RULE_expr4_5 = 51;
	public static readonly RULE_expr5 = 52;
	public static readonly RULE_expr6 = 53;
	public static readonly RULE_expr7 = 54;
	public static readonly RULE_expr8 = 55;
	public static readonly RULE_expr9 = 56;
	public static readonly RULE_expr10 = 57;
	public static readonly RULE_expr11 = 58;
	public static readonly RULE_expr12 = 59;
	public static readonly RULE_expr13 = 60;
	public static readonly RULE_expr14 = 61;
	public static readonly RULE_expr15 = 62;
	public static readonly RULE_expr16 = 63;
	public static readonly RULE_expr17 = 64;
	public static readonly RULE_expr18 = 65;
	public static readonly RULE_arrowExpr = 66;
	public static readonly RULE_sexprDecl = 67;
	public static readonly RULE_sexpr = 68;
	public static readonly RULE_instDecl = 69;
	public static readonly RULE_evalRelDecl = 70;
	public static readonly RULE_evalDecl = 71;
	public static readonly RULE_exampleDecl = 72;
	public static readonly RULE_queryDecl = 73;
	public static readonly RULE_numberList = 74;
	public static readonly RULE_number = 75;
	public static readonly RULE_bounds = 76;
	public static readonly RULE_atomNameOrNumber = 77;
	public static readonly RULE_bound = 78;
	public static readonly RULE_boundLHS = 79;
	public static readonly RULE_bindRHSUnion = 80;
	public static readonly RULE_bindRHSProduct = 81;
	public static readonly RULE_bindRHSProductBase = 82;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"alloyModule", "importDecl", "paragraph", "sigDecl", "sigExt", "mult", 
		"arrowMult", "helperMult", "paraDecl", "quantDecl", "arrowDecl", "predType", 
		"predDecl", "funDecl", "paraDecls", "assertDecl", "cmdDecl", "testDecl", 
		"testExpectDecl", "testBlock", "scope", "typescope", "const", "satisfiabilityDecl", 
		"propertyDecl", "quantifiedPropertyDecl", "testSuiteDecl", "testConstruct", 
		"arrowOp", "compareOp", "letDecl", "block", "blockOrBar", "quant", "qualName", 
		"optionDecl", "name", "nameList", "qualNameList", "paraDeclList", "quantDeclList", 
		"arrowDeclList", "letDeclList", "typescopeList", "exprList", "expr", "expr1", 
		"expr1_5", "expr2", "expr3", "expr4", "expr4_5", "expr5", "expr6", "expr7", 
		"expr8", "expr9", "expr10", "expr11", "expr12", "expr13", "expr14", "expr15", 
		"expr16", "expr17", "expr18", "arrowExpr", "sexprDecl", "sexpr", "instDecl", 
		"evalRelDecl", "evalDecl", "exampleDecl", "queryDecl", "numberList", "number", 
		"bounds", "atomNameOrNumber", "bound", "boundLHS", "bindRHSUnion", "bindRHSProduct", 
		"bindRHSProductBase",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'open'", "'['", "']'", "'as'", "'filepath'", "'var'", "'abstract'", 
		"'sig'", "'{'", "'}'", "'extends'", "'in'", "'+'", "'lone'", "'some'", 
		"'one'", "'two'", "'set'", "'func'", "'pfunc'", "'disj'", "':'", "'wheat'", 
		"'pred'", "'.'", "'fun'", "'('", "')'", "'assert'", "'run'", "'check'", 
		"'for'", "'but'", "'exactly'", "'none'", "'univ'", "'iden'", "'-'", "'is'", 
		"'sat'", "'unsat'", "'theorem'", "'forge_error'", "'test'", "'expect'", 
		"'suite'", "'|'", "'all'", "'sufficient'", "'necessary'", "'let'", "'bind'", 
		"'or'", "'xor'", "'iff'", "'imp'", "'else'", "'and'", "'until'", "'release'", 
		"'since'", "'triggered'", "'neg'", "'always'", "'eventually'", "'after'", 
		"'before'", "'once'", "'historically'", "'#'", "'pplus'", "'amp'", "'subt'", 
		"'supt'", "'''", "'~'", "'exp'", "'*'", "'@'", "'`'", "'this'", "'sexpr'", 
		"'inst'", "'eval'", "'example'", "'->'", "'='", "'<'", "'>'", "'<='", 
		"'>='", "'ni'", "'no'", "'sum'", "'Int'", "'option'", "','", "'/'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "OPEN_TOK", "LEFT_SQUARE_TOK", "RIGHT_SQUARE_TOK", "AS_TOK", 
		"FILE_PATH_TOK", "VAR_TOK", "ABSTRACT_TOK", "SIG_TOK", "LEFT_CURLY_TOK", 
		"RIGHT_CURLY_TOK", "EXTENDS_TOK", "IN_TOK", "PLUS_TOK", "LONE_TOK", "SOME_TOK", 
		"ONE_TOK", "TWO_TOK", "SET_TOK", "FUNC_TOK", "PFUNC_TOK", "DISJ_TOK", 
		"COLON_TOK", "WHEAT_TOK", "PRED_TOK", "DOT_TOK", "FUN_TOK", "LEFT_PAREN_TOK", 
		"RIGHT_PAREN_TOK", "ASSERT_TOK", "RUN_TOK", "CHECK_TOK", "FOR_TOK", "BUT_TOK", 
		"EXACTLY_TOK", "NONE_TOK", "UNIV_TOK", "IDEN_TOK", "MINUS_TOK", "IS_TOK", 
		"SAT_TOK", "UNSAT_TOK", "THEOREM_TOK", "FORGE_ERROR_TOK", "TEST_TOK", 
		"EXPECT_TOK", "SUITE_TOK", "BAR_TOK", "ALL_TOK", "SUFFICIENT_TOK", "NECESSARY_TOK", 
		"LET_TOK", "BIND_TOK", "OR_TOK", "XOR_TOK", "IFF_TOK", "IMP_TOK", "ELSE_TOK", 
		"AND_TOK", "UNTIL_TOK", "RELEASE_TOK", "SINCE_TOK", "TRIGGERED_TOK", "NEG_TOK", 
		"ALWAYS_TOK", "EVENTUALLY_TOK", "AFTER_TOK", "BEFORE_TOK", "ONCE_TOK", 
		"HISTORICALLY_TOK", "CARD_TOK", "PPLUS_TOK", "AMP_TOK", "SUBT_TOK", "SUPT_TOK", 
		"PRIME_TOK", "TILDE_TOK", "EXP_TOK", "STAR_TOK", "AT_TOK", "BACKQUOTE_TOK", 
		"THIS_TOK", "SEXPR_TOK", "INST_TOK", "EVAL_TOK", "EXAMPLE_TOK", "ARROW_TOK", 
		"EQ_TOK", "LT_TOK", "GT_TOK", "LEQ_TOK", "GEQ_TOK", "NI_TOK", "NO_TOK", 
		"SUM_TOK", "INT_TOK", "OPTION_TOK", "COMMA_TOK", "SLASH_TOK", "NUM_CONST_TOK", 
		"IDENTIFIER_TOK", "WS", "CCOMMENT", "COMMENT", "MULTCOMMENT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ForgeParserParser._LITERAL_NAMES, ForgeParserParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ForgeParserParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "ForgeParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return ForgeParserParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ForgeParserParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ForgeParserParser._ATN, this);
	}
	// @RuleVersion(0)
	public alloyModule(): AlloyModuleContext {
		let _localctx: AlloyModuleContext = new AlloyModuleContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ForgeParserParser.RULE_alloyModule);
		let _la: number;
		try {
			this.state = 184;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 169;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ForgeParserParser.OPEN_TOK) {
					{
					{
					this.state = 166;
					this.importDecl();
					}
					}
					this.state = 171;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 175;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ForgeParserParser.VAR_TOK) | (1 << ForgeParserParser.ABSTRACT_TOK) | (1 << ForgeParserParser.SIG_TOK) | (1 << ForgeParserParser.LONE_TOK) | (1 << ForgeParserParser.SOME_TOK) | (1 << ForgeParserParser.ONE_TOK) | (1 << ForgeParserParser.TWO_TOK) | (1 << ForgeParserParser.PRED_TOK) | (1 << ForgeParserParser.FUN_TOK) | (1 << ForgeParserParser.ASSERT_TOK) | (1 << ForgeParserParser.RUN_TOK) | (1 << ForgeParserParser.CHECK_TOK))) !== 0) || _la === ForgeParserParser.TEST_TOK || _la === ForgeParserParser.EXPECT_TOK || ((((_la - 82)) & ~0x1F) === 0 && ((1 << (_la - 82)) & ((1 << (ForgeParserParser.SEXPR_TOK - 82)) | (1 << (ForgeParserParser.INST_TOK - 82)) | (1 << (ForgeParserParser.EXAMPLE_TOK - 82)) | (1 << (ForgeParserParser.OPTION_TOK - 82)) | (1 << (ForgeParserParser.IDENTIFIER_TOK - 82)))) !== 0)) {
					{
					{
					this.state = 172;
					this.paragraph();
					}
					}
					this.state = 177;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 181;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ForgeParserParser.EVAL_TOK) {
					{
					{
					this.state = 178;
					this.evalDecl();
					}
					}
					this.state = 183;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public importDecl(): ImportDeclContext {
		let _localctx: ImportDeclContext = new ImportDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ForgeParserParser.RULE_importDecl);
		let _la: number;
		try {
			this.state = 204;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 186;
				this.match(ForgeParserParser.OPEN_TOK);
				this.state = 187;
				this.qualName();
				this.state = 192;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ForgeParserParser.LEFT_SQUARE_TOK) {
					{
					this.state = 188;
					this.match(ForgeParserParser.LEFT_SQUARE_TOK);
					this.state = 189;
					this.qualNameList();
					this.state = 190;
					this.match(ForgeParserParser.RIGHT_SQUARE_TOK);
					}
				}

				this.state = 196;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ForgeParserParser.AS_TOK) {
					{
					this.state = 194;
					this.match(ForgeParserParser.AS_TOK);
					this.state = 195;
					this.name();
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 198;
				this.match(ForgeParserParser.OPEN_TOK);
				this.state = 199;
				this.match(ForgeParserParser.FILE_PATH_TOK);
				this.state = 202;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ForgeParserParser.AS_TOK) {
					{
					this.state = 200;
					this.match(ForgeParserParser.AS_TOK);
					this.state = 201;
					this.name();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paragraph(): ParagraphContext {
		let _localctx: ParagraphContext = new ParagraphContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ForgeParserParser.RULE_paragraph);
		try {
			this.state = 222;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 206;
				this.sigDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 207;
				this.predDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 208;
				this.funDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 209;
				this.assertDecl();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 210;
				this.cmdDecl();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 211;
				this.testExpectDecl();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 212;
				this.sexprDecl();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 213;
				this.queryDecl();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 214;
				this.evalRelDecl();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 215;
				this.optionDecl();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 216;
				this.instDecl();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 217;
				this.exampleDecl();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 218;
				this.propertyDecl();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 219;
				this.quantifiedPropertyDecl();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 220;
				this.satisfiabilityDecl();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 221;
				this.testSuiteDecl();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sigDecl(): SigDeclContext {
		let _localctx: SigDeclContext = new SigDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ForgeParserParser.RULE_sigDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 225;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.VAR_TOK) {
				{
				this.state = 224;
				this.match(ForgeParserParser.VAR_TOK);
				}
			}

			this.state = 228;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.ABSTRACT_TOK) {
				{
				this.state = 227;
				this.match(ForgeParserParser.ABSTRACT_TOK);
				}
			}

			this.state = 231;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ForgeParserParser.LONE_TOK) | (1 << ForgeParserParser.SOME_TOK) | (1 << ForgeParserParser.ONE_TOK) | (1 << ForgeParserParser.TWO_TOK))) !== 0)) {
				{
				this.state = 230;
				this.mult();
				}
			}

			this.state = 233;
			this.match(ForgeParserParser.SIG_TOK);
			this.state = 234;
			this.nameList();
			this.state = 236;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.EXTENDS_TOK || _la === ForgeParserParser.IN_TOK) {
				{
				this.state = 235;
				this.sigExt();
				}
			}

			this.state = 238;
			this.match(ForgeParserParser.LEFT_CURLY_TOK);
			this.state = 240;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.VAR_TOK || _la === ForgeParserParser.IDENTIFIER_TOK) {
				{
				this.state = 239;
				this.arrowDeclList();
				}
			}

			this.state = 242;
			this.match(ForgeParserParser.RIGHT_CURLY_TOK);
			this.state = 244;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.LEFT_CURLY_TOK) {
				{
				this.state = 243;
				this.block();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sigExt(): SigExtContext {
		let _localctx: SigExtContext = new SigExtContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ForgeParserParser.RULE_sigExt);
		let _la: number;
		try {
			this.state = 257;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.EXTENDS_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 246;
				this.match(ForgeParserParser.EXTENDS_TOK);
				this.state = 247;
				this.qualName();
				}
				break;
			case ForgeParserParser.IN_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 248;
				this.match(ForgeParserParser.IN_TOK);
				this.state = 249;
				this.qualName();
				this.state = 254;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ForgeParserParser.PLUS_TOK) {
					{
					{
					this.state = 250;
					this.match(ForgeParserParser.PLUS_TOK);
					this.state = 251;
					this.qualName();
					}
					}
					this.state = 256;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mult(): MultContext {
		let _localctx: MultContext = new MultContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ForgeParserParser.RULE_mult);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 259;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ForgeParserParser.LONE_TOK) | (1 << ForgeParserParser.SOME_TOK) | (1 << ForgeParserParser.ONE_TOK) | (1 << ForgeParserParser.TWO_TOK))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrowMult(): ArrowMultContext {
		let _localctx: ArrowMultContext = new ArrowMultContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ForgeParserParser.RULE_arrowMult);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 261;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ForgeParserParser.LONE_TOK) | (1 << ForgeParserParser.ONE_TOK) | (1 << ForgeParserParser.TWO_TOK) | (1 << ForgeParserParser.SET_TOK) | (1 << ForgeParserParser.FUNC_TOK) | (1 << ForgeParserParser.PFUNC_TOK))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public helperMult(): HelperMultContext {
		let _localctx: HelperMultContext = new HelperMultContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ForgeParserParser.RULE_helperMult);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 263;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ForgeParserParser.LONE_TOK) | (1 << ForgeParserParser.ONE_TOK) | (1 << ForgeParserParser.SET_TOK) | (1 << ForgeParserParser.FUNC_TOK) | (1 << ForgeParserParser.PFUNC_TOK))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paraDecl(): ParaDeclContext {
		let _localctx: ParaDeclContext = new ParaDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, ForgeParserParser.RULE_paraDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 266;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.DISJ_TOK) {
				{
				this.state = 265;
				this.match(ForgeParserParser.DISJ_TOK);
				}
			}

			this.state = 268;
			this.nameList();
			this.state = 269;
			this.match(ForgeParserParser.COLON_TOK);
			this.state = 271;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				{
				this.state = 270;
				this.helperMult();
				}
				break;
			}
			this.state = 273;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public quantDecl(): QuantDeclContext {
		let _localctx: QuantDeclContext = new QuantDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ForgeParserParser.RULE_quantDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 276;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.DISJ_TOK) {
				{
				this.state = 275;
				this.match(ForgeParserParser.DISJ_TOK);
				}
			}

			this.state = 278;
			this.nameList();
			this.state = 279;
			this.match(ForgeParserParser.COLON_TOK);
			this.state = 281;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				{
				this.state = 280;
				this.match(ForgeParserParser.SET_TOK);
				}
				break;
			}
			this.state = 283;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrowDecl(): ArrowDeclContext {
		let _localctx: ArrowDeclContext = new ArrowDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ForgeParserParser.RULE_arrowDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 286;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.VAR_TOK) {
				{
				this.state = 285;
				this.match(ForgeParserParser.VAR_TOK);
				}
			}

			this.state = 288;
			this.nameList();
			this.state = 289;
			this.match(ForgeParserParser.COLON_TOK);
			this.state = 290;
			this.arrowMult();
			this.state = 291;
			this.arrowExpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public predType(): PredTypeContext {
		let _localctx: PredTypeContext = new PredTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ForgeParserParser.RULE_predType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 293;
			this.match(ForgeParserParser.WHEAT_TOK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public predDecl(): PredDeclContext {
		let _localctx: PredDeclContext = new PredDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ForgeParserParser.RULE_predDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 295;
			this.match(ForgeParserParser.PRED_TOK);
			this.state = 297;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.WHEAT_TOK) {
				{
				this.state = 296;
				this.predType();
				}
			}

			this.state = 302;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 299;
				this.qualName();
				this.state = 300;
				this.match(ForgeParserParser.DOT_TOK);
				}
				break;
			}
			this.state = 304;
			this.name();
			this.state = 306;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.LEFT_SQUARE_TOK || _la === ForgeParserParser.LEFT_PAREN_TOK) {
				{
				this.state = 305;
				this.paraDecls();
				}
			}

			this.state = 308;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public funDecl(): FunDeclContext {
		let _localctx: FunDeclContext = new FunDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ForgeParserParser.RULE_funDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 310;
			this.match(ForgeParserParser.FUN_TOK);
			this.state = 314;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				{
				this.state = 311;
				this.qualName();
				this.state = 312;
				this.match(ForgeParserParser.DOT_TOK);
				}
				break;
			}
			this.state = 316;
			this.name();
			this.state = 318;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.LEFT_SQUARE_TOK || _la === ForgeParserParser.LEFT_PAREN_TOK) {
				{
				this.state = 317;
				this.paraDecls();
				}
			}

			this.state = 320;
			this.match(ForgeParserParser.COLON_TOK);
			this.state = 322;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				{
				this.state = 321;
				this.helperMult();
				}
				break;
			}
			this.state = 324;
			this.expr();
			this.state = 325;
			this.match(ForgeParserParser.LEFT_CURLY_TOK);
			this.state = 326;
			this.expr();
			this.state = 327;
			this.match(ForgeParserParser.RIGHT_CURLY_TOK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paraDecls(): ParaDeclsContext {
		let _localctx: ParaDeclsContext = new ParaDeclsContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, ForgeParserParser.RULE_paraDecls);
		let _la: number;
		try {
			this.state = 339;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.LEFT_PAREN_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 329;
				this.match(ForgeParserParser.LEFT_PAREN_TOK);
				this.state = 331;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ForgeParserParser.DISJ_TOK || _la === ForgeParserParser.IDENTIFIER_TOK) {
					{
					this.state = 330;
					this.paraDeclList();
					}
				}

				this.state = 333;
				this.match(ForgeParserParser.RIGHT_PAREN_TOK);
				}
				break;
			case ForgeParserParser.LEFT_SQUARE_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 334;
				this.match(ForgeParserParser.LEFT_SQUARE_TOK);
				this.state = 336;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ForgeParserParser.DISJ_TOK || _la === ForgeParserParser.IDENTIFIER_TOK) {
					{
					this.state = 335;
					this.paraDeclList();
					}
				}

				this.state = 338;
				this.match(ForgeParserParser.RIGHT_SQUARE_TOK);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assertDecl(): AssertDeclContext {
		let _localctx: AssertDeclContext = new AssertDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, ForgeParserParser.RULE_assertDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 341;
			this.match(ForgeParserParser.ASSERT_TOK);
			this.state = 343;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.IDENTIFIER_TOK) {
				{
				this.state = 342;
				this.name();
				}
			}

			this.state = 345;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public cmdDecl(): CmdDeclContext {
		let _localctx: CmdDeclContext = new CmdDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, ForgeParserParser.RULE_cmdDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 350;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.IDENTIFIER_TOK) {
				{
				this.state = 347;
				this.name();
				this.state = 348;
				this.match(ForgeParserParser.COLON_TOK);
				}
			}

			this.state = 352;
			_la = this._input.LA(1);
			if (!(_la === ForgeParserParser.RUN_TOK || _la === ForgeParserParser.CHECK_TOK)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 355;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				{
				this.state = 353;
				this.qualName();
				}
				break;

			case 2:
				{
				this.state = 354;
				this.block();
				}
				break;
			}
			this.state = 358;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				{
				this.state = 357;
				this.scope();
				}
				break;
			}
			this.state = 362;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.FOR_TOK) {
				{
				this.state = 360;
				this.match(ForgeParserParser.FOR_TOK);
				this.state = 361;
				this.bounds();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public testDecl(): TestDeclContext {
		let _localctx: TestDeclContext = new TestDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, ForgeParserParser.RULE_testDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 367;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				{
				this.state = 364;
				this.name();
				this.state = 365;
				this.match(ForgeParserParser.COLON_TOK);
				}
				break;
			}
			this.state = 371;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.THIS_TOK:
			case ForgeParserParser.SUM_TOK:
			case ForgeParserParser.INT_TOK:
			case ForgeParserParser.IDENTIFIER_TOK:
				{
				this.state = 369;
				this.qualName();
				}
				break;
			case ForgeParserParser.LEFT_CURLY_TOK:
				{
				this.state = 370;
				this.block();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 374;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 38, this._ctx) ) {
			case 1:
				{
				this.state = 373;
				this.scope();
				}
				break;
			}
			this.state = 378;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.FOR_TOK) {
				{
				this.state = 376;
				this.match(ForgeParserParser.FOR_TOK);
				this.state = 377;
				this.bounds();
				}
			}

			this.state = 380;
			this.match(ForgeParserParser.IS_TOK);
			this.state = 381;
			_la = this._input.LA(1);
			if (!(((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (ForgeParserParser.SAT_TOK - 40)) | (1 << (ForgeParserParser.UNSAT_TOK - 40)) | (1 << (ForgeParserParser.THEOREM_TOK - 40)) | (1 << (ForgeParserParser.FORGE_ERROR_TOK - 40)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public testExpectDecl(): TestExpectDeclContext {
		let _localctx: TestExpectDeclContext = new TestExpectDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, ForgeParserParser.RULE_testExpectDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 384;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.TEST_TOK) {
				{
				this.state = 383;
				this.match(ForgeParserParser.TEST_TOK);
				}
			}

			this.state = 386;
			this.match(ForgeParserParser.EXPECT_TOK);
			this.state = 388;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.IDENTIFIER_TOK) {
				{
				this.state = 387;
				this.name();
				}
			}

			this.state = 390;
			this.testBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public testBlock(): TestBlockContext {
		let _localctx: TestBlockContext = new TestBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, ForgeParserParser.RULE_testBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 392;
			this.match(ForgeParserParser.LEFT_CURLY_TOK);
			this.state = 396;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ForgeParserParser.LEFT_CURLY_TOK || ((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & ((1 << (ForgeParserParser.THIS_TOK - 81)) | (1 << (ForgeParserParser.SUM_TOK - 81)) | (1 << (ForgeParserParser.INT_TOK - 81)) | (1 << (ForgeParserParser.IDENTIFIER_TOK - 81)))) !== 0)) {
				{
				{
				this.state = 393;
				this.testDecl();
				}
				}
				this.state = 398;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 399;
			this.match(ForgeParserParser.RIGHT_CURLY_TOK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scope(): ScopeContext {
		let _localctx: ScopeContext = new ScopeContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, ForgeParserParser.RULE_scope);
		let _la: number;
		try {
			this.state = 409;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 401;
				this.match(ForgeParserParser.FOR_TOK);
				this.state = 402;
				this.number();
				this.state = 405;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ForgeParserParser.BUT_TOK) {
					{
					this.state = 403;
					this.match(ForgeParserParser.BUT_TOK);
					this.state = 404;
					this.typescopeList();
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 407;
				this.match(ForgeParserParser.FOR_TOK);
				this.state = 408;
				this.typescopeList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typescope(): TypescopeContext {
		let _localctx: TypescopeContext = new TypescopeContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, ForgeParserParser.RULE_typescope);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 412;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.EXACTLY_TOK) {
				{
				this.state = 411;
				this.match(ForgeParserParser.EXACTLY_TOK);
				}
			}

			this.state = 414;
			this.number();
			this.state = 415;
			this.qualName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public const(): ConstContext {
		let _localctx: ConstContext = new ConstContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, ForgeParserParser.RULE_const);
		let _la: number;
		try {
			this.state = 424;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.NONE_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 417;
				this.match(ForgeParserParser.NONE_TOK);
				}
				break;
			case ForgeParserParser.UNIV_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 418;
				this.match(ForgeParserParser.UNIV_TOK);
				}
				break;
			case ForgeParserParser.IDEN_TOK:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 419;
				this.match(ForgeParserParser.IDEN_TOK);
				}
				break;
			case ForgeParserParser.MINUS_TOK:
			case ForgeParserParser.NUM_CONST_TOK:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 421;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ForgeParserParser.MINUS_TOK) {
					{
					this.state = 420;
					this.match(ForgeParserParser.MINUS_TOK);
					}
				}

				this.state = 423;
				this.number();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public satisfiabilityDecl(): SatisfiabilityDeclContext {
		let _localctx: SatisfiabilityDeclContext = new SatisfiabilityDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, ForgeParserParser.RULE_satisfiabilityDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 426;
			this.match(ForgeParserParser.ASSERT_TOK);
			this.state = 427;
			this.name();
			this.state = 428;
			this.match(ForgeParserParser.IS_TOK);
			this.state = 429;
			_la = this._input.LA(1);
			if (!(((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (ForgeParserParser.SAT_TOK - 40)) | (1 << (ForgeParserParser.UNSAT_TOK - 40)) | (1 << (ForgeParserParser.FORGE_ERROR_TOK - 40)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 431;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 48, this._ctx) ) {
			case 1:
				{
				this.state = 430;
				this.scope();
				}
				break;
			}
			this.state = 435;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.FOR_TOK) {
				{
				this.state = 433;
				this.match(ForgeParserParser.FOR_TOK);
				this.state = 434;
				this.bounds();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public propertyDecl(): PropertyDeclContext {
		let _localctx: PropertyDeclContext = new PropertyDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, ForgeParserParser.RULE_propertyDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 437;
			this.match(ForgeParserParser.ASSERT_TOK);
			this.state = 438;
			this.name();
			this.state = 439;
			this.match(ForgeParserParser.IS_TOK);
			this.state = 440;
			_la = this._input.LA(1);
			if (!(_la === ForgeParserParser.SUFFICIENT_TOK || _la === ForgeParserParser.NECESSARY_TOK)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 441;
			this.match(ForgeParserParser.FOR_TOK);
			this.state = 442;
			this.name();
			this.state = 444;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 50, this._ctx) ) {
			case 1:
				{
				this.state = 443;
				this.scope();
				}
				break;
			}
			this.state = 448;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.FOR_TOK) {
				{
				this.state = 446;
				this.match(ForgeParserParser.FOR_TOK);
				this.state = 447;
				this.bounds();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public quantifiedPropertyDecl(): QuantifiedPropertyDeclContext {
		let _localctx: QuantifiedPropertyDeclContext = new QuantifiedPropertyDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, ForgeParserParser.RULE_quantifiedPropertyDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 450;
			this.match(ForgeParserParser.ASSERT_TOK);
			this.state = 451;
			this.match(ForgeParserParser.ALL_TOK);
			this.state = 453;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 52, this._ctx) ) {
			case 1:
				{
				this.state = 452;
				this.match(ForgeParserParser.DISJ_TOK);
				}
				break;
			}
			this.state = 455;
			this.quantDeclList();
			this.state = 456;
			this.match(ForgeParserParser.BAR_TOK);
			this.state = 457;
			this.name();
			this.state = 462;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.LEFT_SQUARE_TOK) {
				{
				this.state = 458;
				this.match(ForgeParserParser.LEFT_SQUARE_TOK);
				this.state = 459;
				this.exprList();
				this.state = 460;
				this.match(ForgeParserParser.RIGHT_SQUARE_TOK);
				}
			}

			this.state = 464;
			this.match(ForgeParserParser.IS_TOK);
			this.state = 465;
			_la = this._input.LA(1);
			if (!(_la === ForgeParserParser.SUFFICIENT_TOK || _la === ForgeParserParser.NECESSARY_TOK)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 466;
			this.match(ForgeParserParser.FOR_TOK);
			this.state = 467;
			this.name();
			this.state = 472;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.LEFT_SQUARE_TOK) {
				{
				this.state = 468;
				this.match(ForgeParserParser.LEFT_SQUARE_TOK);
				this.state = 469;
				this.exprList();
				this.state = 470;
				this.match(ForgeParserParser.RIGHT_SQUARE_TOK);
				}
			}

			this.state = 475;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 55, this._ctx) ) {
			case 1:
				{
				this.state = 474;
				this.scope();
				}
				break;
			}
			this.state = 479;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.FOR_TOK) {
				{
				this.state = 477;
				this.match(ForgeParserParser.FOR_TOK);
				this.state = 478;
				this.bounds();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public testSuiteDecl(): TestSuiteDeclContext {
		let _localctx: TestSuiteDeclContext = new TestSuiteDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, ForgeParserParser.RULE_testSuiteDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 481;
			this.match(ForgeParserParser.TEST_TOK);
			this.state = 482;
			this.match(ForgeParserParser.SUITE_TOK);
			this.state = 483;
			this.match(ForgeParserParser.FOR_TOK);
			this.state = 484;
			this.name();
			this.state = 485;
			this.match(ForgeParserParser.LEFT_CURLY_TOK);
			this.state = 489;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 29)) & ~0x1F) === 0 && ((1 << (_la - 29)) & ((1 << (ForgeParserParser.ASSERT_TOK - 29)) | (1 << (ForgeParserParser.TEST_TOK - 29)) | (1 << (ForgeParserParser.EXPECT_TOK - 29)))) !== 0) || _la === ForgeParserParser.EXAMPLE_TOK) {
				{
				{
				this.state = 486;
				this.testConstruct();
				}
				}
				this.state = 491;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 492;
			this.match(ForgeParserParser.RIGHT_CURLY_TOK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public testConstruct(): TestConstructContext {
		let _localctx: TestConstructContext = new TestConstructContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, ForgeParserParser.RULE_testConstruct);
		try {
			this.state = 499;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 58, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 494;
				this.exampleDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 495;
				this.testExpectDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 496;
				this.propertyDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 497;
				this.quantifiedPropertyDecl();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 498;
				this.satisfiabilityDecl();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrowOp(): ArrowOpContext {
		let _localctx: ArrowOpContext = new ArrowOpContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, ForgeParserParser.RULE_arrowOp);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 503;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.LONE_TOK:
			case ForgeParserParser.SOME_TOK:
			case ForgeParserParser.ONE_TOK:
			case ForgeParserParser.TWO_TOK:
				{
				this.state = 501;
				this.mult();
				}
				break;
			case ForgeParserParser.SET_TOK:
				{
				this.state = 502;
				this.match(ForgeParserParser.SET_TOK);
				}
				break;
			case ForgeParserParser.ARROW_TOK:
				break;
			default:
				break;
			}
			this.state = 505;
			this.match(ForgeParserParser.ARROW_TOK);
			this.state = 508;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.LONE_TOK:
			case ForgeParserParser.SOME_TOK:
			case ForgeParserParser.ONE_TOK:
			case ForgeParserParser.TWO_TOK:
				{
				this.state = 506;
				this.mult();
				}
				break;
			case ForgeParserParser.SET_TOK:
				{
				this.state = 507;
				this.match(ForgeParserParser.SET_TOK);
				}
				break;
			case ForgeParserParser.LEFT_CURLY_TOK:
			case ForgeParserParser.LEFT_PAREN_TOK:
			case ForgeParserParser.NONE_TOK:
			case ForgeParserParser.UNIV_TOK:
			case ForgeParserParser.IDEN_TOK:
			case ForgeParserParser.MINUS_TOK:
			case ForgeParserParser.TILDE_TOK:
			case ForgeParserParser.EXP_TOK:
			case ForgeParserParser.STAR_TOK:
			case ForgeParserParser.AT_TOK:
			case ForgeParserParser.BACKQUOTE_TOK:
			case ForgeParserParser.THIS_TOK:
			case ForgeParserParser.SEXPR_TOK:
			case ForgeParserParser.SUM_TOK:
			case ForgeParserParser.INT_TOK:
			case ForgeParserParser.NUM_CONST_TOK:
			case ForgeParserParser.IDENTIFIER_TOK:
				break;
			default:
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public compareOp(): CompareOpContext {
		let _localctx: CompareOpContext = new CompareOpContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, ForgeParserParser.RULE_compareOp);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 510;
			_la = this._input.LA(1);
			if (!(_la === ForgeParserParser.IN_TOK || _la === ForgeParserParser.IS_TOK || ((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & ((1 << (ForgeParserParser.EQ_TOK - 87)) | (1 << (ForgeParserParser.LT_TOK - 87)) | (1 << (ForgeParserParser.GT_TOK - 87)) | (1 << (ForgeParserParser.LEQ_TOK - 87)) | (1 << (ForgeParserParser.GEQ_TOK - 87)) | (1 << (ForgeParserParser.NI_TOK - 87)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public letDecl(): LetDeclContext {
		let _localctx: LetDeclContext = new LetDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, ForgeParserParser.RULE_letDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 512;
			this.name();
			this.state = 513;
			this.match(ForgeParserParser.EQ_TOK);
			this.state = 514;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let _localctx: BlockContext = new BlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, ForgeParserParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 516;
			this.match(ForgeParserParser.LEFT_CURLY_TOK);
			this.state = 520;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & ((1 << (ForgeParserParser.LEFT_CURLY_TOK - 9)) | (1 << (ForgeParserParser.LONE_TOK - 9)) | (1 << (ForgeParserParser.SOME_TOK - 9)) | (1 << (ForgeParserParser.ONE_TOK - 9)) | (1 << (ForgeParserParser.TWO_TOK - 9)) | (1 << (ForgeParserParser.SET_TOK - 9)) | (1 << (ForgeParserParser.LEFT_PAREN_TOK - 9)) | (1 << (ForgeParserParser.NONE_TOK - 9)) | (1 << (ForgeParserParser.UNIV_TOK - 9)) | (1 << (ForgeParserParser.IDEN_TOK - 9)) | (1 << (ForgeParserParser.MINUS_TOK - 9)))) !== 0) || ((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & ((1 << (ForgeParserParser.ALL_TOK - 48)) | (1 << (ForgeParserParser.LET_TOK - 48)) | (1 << (ForgeParserParser.BIND_TOK - 48)) | (1 << (ForgeParserParser.NEG_TOK - 48)) | (1 << (ForgeParserParser.ALWAYS_TOK - 48)) | (1 << (ForgeParserParser.EVENTUALLY_TOK - 48)) | (1 << (ForgeParserParser.AFTER_TOK - 48)) | (1 << (ForgeParserParser.BEFORE_TOK - 48)) | (1 << (ForgeParserParser.ONCE_TOK - 48)) | (1 << (ForgeParserParser.HISTORICALLY_TOK - 48)) | (1 << (ForgeParserParser.CARD_TOK - 48)) | (1 << (ForgeParserParser.TILDE_TOK - 48)) | (1 << (ForgeParserParser.EXP_TOK - 48)) | (1 << (ForgeParserParser.STAR_TOK - 48)) | (1 << (ForgeParserParser.AT_TOK - 48)))) !== 0) || ((((_la - 80)) & ~0x1F) === 0 && ((1 << (_la - 80)) & ((1 << (ForgeParserParser.BACKQUOTE_TOK - 80)) | (1 << (ForgeParserParser.THIS_TOK - 80)) | (1 << (ForgeParserParser.SEXPR_TOK - 80)) | (1 << (ForgeParserParser.NO_TOK - 80)) | (1 << (ForgeParserParser.SUM_TOK - 80)) | (1 << (ForgeParserParser.INT_TOK - 80)) | (1 << (ForgeParserParser.NUM_CONST_TOK - 80)) | (1 << (ForgeParserParser.IDENTIFIER_TOK - 80)))) !== 0)) {
				{
				{
				this.state = 517;
				this.expr();
				}
				}
				this.state = 522;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 523;
			this.match(ForgeParserParser.RIGHT_CURLY_TOK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public blockOrBar(): BlockOrBarContext {
		let _localctx: BlockOrBarContext = new BlockOrBarContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, ForgeParserParser.RULE_blockOrBar);
		try {
			this.state = 528;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.LEFT_CURLY_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 525;
				this.block();
				}
				break;
			case ForgeParserParser.BAR_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 526;
				this.match(ForgeParserParser.BAR_TOK);
				this.state = 527;
				this.expr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public quant(): QuantContext {
		let _localctx: QuantContext = new QuantContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, ForgeParserParser.RULE_quant);
		try {
			this.state = 534;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.ALL_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 530;
				this.match(ForgeParserParser.ALL_TOK);
				}
				break;
			case ForgeParserParser.NO_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 531;
				this.match(ForgeParserParser.NO_TOK);
				}
				break;
			case ForgeParserParser.SUM_TOK:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 532;
				this.match(ForgeParserParser.SUM_TOK);
				}
				break;
			case ForgeParserParser.LONE_TOK:
			case ForgeParserParser.SOME_TOK:
			case ForgeParserParser.ONE_TOK:
			case ForgeParserParser.TWO_TOK:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 533;
				this.mult();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualName(): QualNameContext {
		let _localctx: QualNameContext = new QualNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, ForgeParserParser.RULE_qualName);
		let _la: number;
		try {
			let _alt: number;
			this.state = 551;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.THIS_TOK:
			case ForgeParserParser.IDENTIFIER_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 538;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ForgeParserParser.THIS_TOK) {
					{
					this.state = 536;
					this.match(ForgeParserParser.THIS_TOK);
					this.state = 537;
					this.match(ForgeParserParser.SLASH_TOK);
					}
				}

				this.state = 545;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 65, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 540;
						this.name();
						this.state = 541;
						this.match(ForgeParserParser.SLASH_TOK);
						}
						}
					}
					this.state = 547;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 65, this._ctx);
				}
				this.state = 548;
				this.name();
				}
				break;
			case ForgeParserParser.INT_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 549;
				this.match(ForgeParserParser.INT_TOK);
				}
				break;
			case ForgeParserParser.SUM_TOK:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 550;
				this.match(ForgeParserParser.SUM_TOK);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public optionDecl(): OptionDeclContext {
		let _localctx: OptionDeclContext = new OptionDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, ForgeParserParser.RULE_optionDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 553;
			this.match(ForgeParserParser.OPTION_TOK);
			this.state = 554;
			this.qualName();
			this.state = 561;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.THIS_TOK:
			case ForgeParserParser.SUM_TOK:
			case ForgeParserParser.INT_TOK:
			case ForgeParserParser.IDENTIFIER_TOK:
				{
				this.state = 555;
				this.qualName();
				}
				break;
			case ForgeParserParser.FILE_PATH_TOK:
				{
				this.state = 556;
				this.match(ForgeParserParser.FILE_PATH_TOK);
				}
				break;
			case ForgeParserParser.MINUS_TOK:
			case ForgeParserParser.NUM_CONST_TOK:
				{
				this.state = 558;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ForgeParserParser.MINUS_TOK) {
					{
					this.state = 557;
					this.match(ForgeParserParser.MINUS_TOK);
					}
				}

				this.state = 560;
				this.number();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public name(): NameContext {
		let _localctx: NameContext = new NameContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, ForgeParserParser.RULE_name);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 563;
			this.match(ForgeParserParser.IDENTIFIER_TOK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nameList(): NameListContext {
		let _localctx: NameListContext = new NameListContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, ForgeParserParser.RULE_nameList);
		try {
			this.state = 570;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 69, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 565;
				this.name();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 566;
				this.name();
				this.state = 567;
				this.match(ForgeParserParser.COMMA_TOK);
				this.state = 568;
				this.nameList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualNameList(): QualNameListContext {
		let _localctx: QualNameListContext = new QualNameListContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, ForgeParserParser.RULE_qualNameList);
		try {
			this.state = 577;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 70, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 572;
				this.qualName();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 573;
				this.qualName();
				this.state = 574;
				this.match(ForgeParserParser.COMMA_TOK);
				this.state = 575;
				this.qualNameList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paraDeclList(): ParaDeclListContext {
		let _localctx: ParaDeclListContext = new ParaDeclListContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, ForgeParserParser.RULE_paraDeclList);
		try {
			this.state = 584;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 71, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 579;
				this.paraDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 580;
				this.paraDecl();
				this.state = 581;
				this.match(ForgeParserParser.COMMA_TOK);
				this.state = 582;
				this.paraDeclList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public quantDeclList(): QuantDeclListContext {
		let _localctx: QuantDeclListContext = new QuantDeclListContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, ForgeParserParser.RULE_quantDeclList);
		try {
			this.state = 591;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 72, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 586;
				this.quantDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 587;
				this.quantDecl();
				this.state = 588;
				this.match(ForgeParserParser.COMMA_TOK);
				this.state = 589;
				this.quantDeclList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrowDeclList(): ArrowDeclListContext {
		let _localctx: ArrowDeclListContext = new ArrowDeclListContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, ForgeParserParser.RULE_arrowDeclList);
		try {
			this.state = 598;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 73, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 593;
				this.arrowDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 594;
				this.arrowDecl();
				this.state = 595;
				this.match(ForgeParserParser.COMMA_TOK);
				this.state = 596;
				this.arrowDeclList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public letDeclList(): LetDeclListContext {
		let _localctx: LetDeclListContext = new LetDeclListContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, ForgeParserParser.RULE_letDeclList);
		try {
			this.state = 605;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 74, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 600;
				this.letDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 601;
				this.letDecl();
				this.state = 602;
				this.match(ForgeParserParser.COMMA_TOK);
				this.state = 603;
				this.letDeclList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typescopeList(): TypescopeListContext {
		let _localctx: TypescopeListContext = new TypescopeListContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, ForgeParserParser.RULE_typescopeList);
		try {
			this.state = 612;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 75, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 607;
				this.typescope();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 608;
				this.typescope();
				this.state = 609;
				this.match(ForgeParserParser.COMMA_TOK);
				this.state = 610;
				this.typescopeList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exprList(): ExprListContext {
		let _localctx: ExprListContext = new ExprListContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, ForgeParserParser.RULE_exprList);
		try {
			this.state = 619;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 76, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 614;
				this.expr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 615;
				this.expr();
				this.state = 616;
				this.match(ForgeParserParser.COMMA_TOK);
				this.state = 617;
				this.exprList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr(): ExprContext {
		let _localctx: ExprContext = new ExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, ForgeParserParser.RULE_expr);
		try {
			this.state = 637;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 78, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 621;
				this.expr1(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 622;
				this.match(ForgeParserParser.LET_TOK);
				this.state = 623;
				this.letDeclList();
				this.state = 624;
				this.blockOrBar();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 626;
				this.match(ForgeParserParser.BIND_TOK);
				this.state = 627;
				this.letDeclList();
				this.state = 628;
				this.blockOrBar();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 630;
				this.quant();
				this.state = 632;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 77, this._ctx) ) {
				case 1:
					{
					this.state = 631;
					this.match(ForgeParserParser.DISJ_TOK);
					}
					break;
				}
				this.state = 634;
				this.quantDeclList();
				this.state = 635;
				this.blockOrBar();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr1(): Expr1Context;
	public expr1(_p: number): Expr1Context;
	// @RuleVersion(0)
	public expr1(_p?: number): Expr1Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr1Context = new Expr1Context(this._ctx, _parentState);
		let _prevctx: Expr1Context = _localctx;
		let _startState: number = 92;
		this.enterRecursionRule(_localctx, 92, ForgeParserParser.RULE_expr1, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 640;
			this.expr1_5(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 647;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 79, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr1Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr1);
					this.state = 642;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 643;
					this.match(ForgeParserParser.OR_TOK);
					this.state = 644;
					this.expr1_5(0);
					}
					}
				}
				this.state = 649;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 79, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public expr1_5(): Expr1_5Context;
	public expr1_5(_p: number): Expr1_5Context;
	// @RuleVersion(0)
	public expr1_5(_p?: number): Expr1_5Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr1_5Context = new Expr1_5Context(this._ctx, _parentState);
		let _prevctx: Expr1_5Context = _localctx;
		let _startState: number = 94;
		this.enterRecursionRule(_localctx, 94, ForgeParserParser.RULE_expr1_5, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 651;
			this.expr2(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 658;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 80, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr1_5Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr1_5);
					this.state = 653;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 654;
					this.match(ForgeParserParser.XOR_TOK);
					this.state = 655;
					this.expr2(0);
					}
					}
				}
				this.state = 660;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 80, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public expr2(): Expr2Context;
	public expr2(_p: number): Expr2Context;
	// @RuleVersion(0)
	public expr2(_p?: number): Expr2Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr2Context = new Expr2Context(this._ctx, _parentState);
		let _prevctx: Expr2Context = _localctx;
		let _startState: number = 96;
		this.enterRecursionRule(_localctx, 96, ForgeParserParser.RULE_expr2, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 662;
			this.expr3();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 669;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 81, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr2Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr2);
					this.state = 664;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 665;
					this.match(ForgeParserParser.IFF_TOK);
					this.state = 666;
					this.expr3();
					}
					}
				}
				this.state = 671;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 81, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr3(): Expr3Context {
		let _localctx: Expr3Context = new Expr3Context(this._ctx, this.state);
		this.enterRule(_localctx, 98, ForgeParserParser.RULE_expr3);
		try {
			this.state = 680;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 83, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 672;
				this.expr4(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 673;
				this.expr4(0);
				this.state = 674;
				this.match(ForgeParserParser.IMP_TOK);
				this.state = 675;
				this.expr3();
				this.state = 678;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 82, this._ctx) ) {
				case 1:
					{
					this.state = 676;
					this.match(ForgeParserParser.ELSE_TOK);
					this.state = 677;
					this.expr3();
					}
					break;
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr4(): Expr4Context;
	public expr4(_p: number): Expr4Context;
	// @RuleVersion(0)
	public expr4(_p?: number): Expr4Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr4Context = new Expr4Context(this._ctx, _parentState);
		let _prevctx: Expr4Context = _localctx;
		let _startState: number = 100;
		this.enterRecursionRule(_localctx, 100, ForgeParserParser.RULE_expr4, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 683;
			this.expr4_5();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 690;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 84, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr4Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr4);
					this.state = 685;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 686;
					this.match(ForgeParserParser.AND_TOK);
					this.state = 687;
					this.expr4_5();
					}
					}
				}
				this.state = 692;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 84, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr4_5(): Expr4_5Context {
		let _localctx: Expr4_5Context = new Expr4_5Context(this._ctx, this.state);
		this.enterRule(_localctx, 102, ForgeParserParser.RULE_expr4_5);
		try {
			this.state = 710;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 85, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 693;
				this.expr5();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 694;
				this.expr5();
				this.state = 695;
				this.match(ForgeParserParser.UNTIL_TOK);
				this.state = 696;
				this.expr5();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 698;
				this.expr5();
				this.state = 699;
				this.match(ForgeParserParser.RELEASE_TOK);
				this.state = 700;
				this.expr5();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 702;
				this.expr5();
				this.state = 703;
				this.match(ForgeParserParser.SINCE_TOK);
				this.state = 704;
				this.expr5();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 706;
				this.expr5();
				this.state = 707;
				this.match(ForgeParserParser.TRIGGERED_TOK);
				this.state = 708;
				this.expr5();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr5(): Expr5Context {
		let _localctx: Expr5Context = new Expr5Context(this._ctx, this.state);
		this.enterRule(_localctx, 104, ForgeParserParser.RULE_expr5);
		try {
			this.state = 727;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.LEFT_CURLY_TOK:
			case ForgeParserParser.LONE_TOK:
			case ForgeParserParser.SOME_TOK:
			case ForgeParserParser.ONE_TOK:
			case ForgeParserParser.TWO_TOK:
			case ForgeParserParser.SET_TOK:
			case ForgeParserParser.LEFT_PAREN_TOK:
			case ForgeParserParser.NONE_TOK:
			case ForgeParserParser.UNIV_TOK:
			case ForgeParserParser.IDEN_TOK:
			case ForgeParserParser.MINUS_TOK:
			case ForgeParserParser.CARD_TOK:
			case ForgeParserParser.TILDE_TOK:
			case ForgeParserParser.EXP_TOK:
			case ForgeParserParser.STAR_TOK:
			case ForgeParserParser.AT_TOK:
			case ForgeParserParser.BACKQUOTE_TOK:
			case ForgeParserParser.THIS_TOK:
			case ForgeParserParser.SEXPR_TOK:
			case ForgeParserParser.NO_TOK:
			case ForgeParserParser.SUM_TOK:
			case ForgeParserParser.INT_TOK:
			case ForgeParserParser.NUM_CONST_TOK:
			case ForgeParserParser.IDENTIFIER_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 712;
				this.expr6(0);
				}
				break;
			case ForgeParserParser.NEG_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 713;
				this.match(ForgeParserParser.NEG_TOK);
				this.state = 714;
				this.expr5();
				}
				break;
			case ForgeParserParser.ALWAYS_TOK:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 715;
				this.match(ForgeParserParser.ALWAYS_TOK);
				this.state = 716;
				this.expr5();
				}
				break;
			case ForgeParserParser.EVENTUALLY_TOK:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 717;
				this.match(ForgeParserParser.EVENTUALLY_TOK);
				this.state = 718;
				this.expr5();
				}
				break;
			case ForgeParserParser.AFTER_TOK:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 719;
				this.match(ForgeParserParser.AFTER_TOK);
				this.state = 720;
				this.expr5();
				}
				break;
			case ForgeParserParser.BEFORE_TOK:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 721;
				this.match(ForgeParserParser.BEFORE_TOK);
				this.state = 722;
				this.expr5();
				}
				break;
			case ForgeParserParser.ONCE_TOK:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 723;
				this.match(ForgeParserParser.ONCE_TOK);
				this.state = 724;
				this.expr5();
				}
				break;
			case ForgeParserParser.HISTORICALLY_TOK:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 725;
				this.match(ForgeParserParser.HISTORICALLY_TOK);
				this.state = 726;
				this.expr5();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr6(): Expr6Context;
	public expr6(_p: number): Expr6Context;
	// @RuleVersion(0)
	public expr6(_p?: number): Expr6Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr6Context = new Expr6Context(this._ctx, _parentState);
		let _prevctx: Expr6Context = _localctx;
		let _startState: number = 106;
		this.enterRecursionRule(_localctx, 106, ForgeParserParser.RULE_expr6, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 730;
			this.expr7();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 741;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 88, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr6Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr6);
					this.state = 732;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 734;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ForgeParserParser.NEG_TOK) {
						{
						this.state = 733;
						this.match(ForgeParserParser.NEG_TOK);
						}
					}

					this.state = 736;
					this.compareOp();
					this.state = 737;
					this.expr7();
					}
					}
				}
				this.state = 743;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 88, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr7(): Expr7Context {
		let _localctx: Expr7Context = new Expr7Context(this._ctx, this.state);
		this.enterRule(_localctx, 108, ForgeParserParser.RULE_expr7);
		let _la: number;
		try {
			this.state = 747;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.LEFT_CURLY_TOK:
			case ForgeParserParser.LEFT_PAREN_TOK:
			case ForgeParserParser.NONE_TOK:
			case ForgeParserParser.UNIV_TOK:
			case ForgeParserParser.IDEN_TOK:
			case ForgeParserParser.MINUS_TOK:
			case ForgeParserParser.CARD_TOK:
			case ForgeParserParser.TILDE_TOK:
			case ForgeParserParser.EXP_TOK:
			case ForgeParserParser.STAR_TOK:
			case ForgeParserParser.AT_TOK:
			case ForgeParserParser.BACKQUOTE_TOK:
			case ForgeParserParser.THIS_TOK:
			case ForgeParserParser.SEXPR_TOK:
			case ForgeParserParser.SUM_TOK:
			case ForgeParserParser.INT_TOK:
			case ForgeParserParser.NUM_CONST_TOK:
			case ForgeParserParser.IDENTIFIER_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 744;
				this.expr8(0);
				}
				break;
			case ForgeParserParser.LONE_TOK:
			case ForgeParserParser.SOME_TOK:
			case ForgeParserParser.ONE_TOK:
			case ForgeParserParser.TWO_TOK:
			case ForgeParserParser.SET_TOK:
			case ForgeParserParser.NO_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 745;
				_la = this._input.LA(1);
				if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ForgeParserParser.LONE_TOK) | (1 << ForgeParserParser.SOME_TOK) | (1 << ForgeParserParser.ONE_TOK) | (1 << ForgeParserParser.TWO_TOK) | (1 << ForgeParserParser.SET_TOK))) !== 0) || _la === ForgeParserParser.NO_TOK)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 746;
				this.expr8(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr8(): Expr8Context;
	public expr8(_p: number): Expr8Context;
	// @RuleVersion(0)
	public expr8(_p?: number): Expr8Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr8Context = new Expr8Context(this._ctx, _parentState);
		let _prevctx: Expr8Context = _localctx;
		let _startState: number = 110;
		this.enterRecursionRule(_localctx, 110, ForgeParserParser.RULE_expr8, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 750;
			this.expr9();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 757;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 90, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr8Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr8);
					this.state = 752;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 753;
					_la = this._input.LA(1);
					if (!(_la === ForgeParserParser.PLUS_TOK || _la === ForgeParserParser.MINUS_TOK)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 754;
					this.expr10(0);
					}
					}
				}
				this.state = 759;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 90, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr9(): Expr9Context {
		let _localctx: Expr9Context = new Expr9Context(this._ctx, this.state);
		this.enterRule(_localctx, 112, ForgeParserParser.RULE_expr9);
		try {
			this.state = 763;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.LEFT_CURLY_TOK:
			case ForgeParserParser.LEFT_PAREN_TOK:
			case ForgeParserParser.NONE_TOK:
			case ForgeParserParser.UNIV_TOK:
			case ForgeParserParser.IDEN_TOK:
			case ForgeParserParser.MINUS_TOK:
			case ForgeParserParser.TILDE_TOK:
			case ForgeParserParser.EXP_TOK:
			case ForgeParserParser.STAR_TOK:
			case ForgeParserParser.AT_TOK:
			case ForgeParserParser.BACKQUOTE_TOK:
			case ForgeParserParser.THIS_TOK:
			case ForgeParserParser.SEXPR_TOK:
			case ForgeParserParser.SUM_TOK:
			case ForgeParserParser.INT_TOK:
			case ForgeParserParser.NUM_CONST_TOK:
			case ForgeParserParser.IDENTIFIER_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 760;
				this.expr10(0);
				}
				break;
			case ForgeParserParser.CARD_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 761;
				this.match(ForgeParserParser.CARD_TOK);
				this.state = 762;
				this.expr9();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr10(): Expr10Context;
	public expr10(_p: number): Expr10Context;
	// @RuleVersion(0)
	public expr10(_p?: number): Expr10Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr10Context = new Expr10Context(this._ctx, _parentState);
		let _prevctx: Expr10Context = _localctx;
		let _startState: number = 114;
		this.enterRecursionRule(_localctx, 114, ForgeParserParser.RULE_expr10, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 766;
			this.expr11(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 773;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 92, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr10Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr10);
					this.state = 768;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 769;
					this.match(ForgeParserParser.PPLUS_TOK);
					this.state = 770;
					this.expr11(0);
					}
					}
				}
				this.state = 775;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 92, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public expr11(): Expr11Context;
	public expr11(_p: number): Expr11Context;
	// @RuleVersion(0)
	public expr11(_p?: number): Expr11Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr11Context = new Expr11Context(this._ctx, _parentState);
		let _prevctx: Expr11Context = _localctx;
		let _startState: number = 116;
		this.enterRecursionRule(_localctx, 116, ForgeParserParser.RULE_expr11, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 777;
			this.expr12(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 784;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 93, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr11Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr11);
					this.state = 779;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 780;
					this.match(ForgeParserParser.AMP_TOK);
					this.state = 781;
					this.expr12(0);
					}
					}
				}
				this.state = 786;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 93, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public expr12(): Expr12Context;
	public expr12(_p: number): Expr12Context;
	// @RuleVersion(0)
	public expr12(_p?: number): Expr12Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr12Context = new Expr12Context(this._ctx, _parentState);
		let _prevctx: Expr12Context = _localctx;
		let _startState: number = 118;
		this.enterRecursionRule(_localctx, 118, ForgeParserParser.RULE_expr12, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 788;
			this.expr13(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 796;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 94, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr12Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr12);
					this.state = 790;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 791;
					this.arrowOp();
					this.state = 792;
					this.expr13(0);
					}
					}
				}
				this.state = 798;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 94, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public expr13(): Expr13Context;
	public expr13(_p: number): Expr13Context;
	// @RuleVersion(0)
	public expr13(_p?: number): Expr13Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr13Context = new Expr13Context(this._ctx, _parentState);
		let _prevctx: Expr13Context = _localctx;
		let _startState: number = 120;
		this.enterRecursionRule(_localctx, 120, ForgeParserParser.RULE_expr13, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 800;
			this.expr14(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 807;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 95, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr13Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr13);
					this.state = 802;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 803;
					_la = this._input.LA(1);
					if (!(_la === ForgeParserParser.SUBT_TOK || _la === ForgeParserParser.SUPT_TOK)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 804;
					this.expr14(0);
					}
					}
				}
				this.state = 809;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 95, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public expr14(): Expr14Context;
	public expr14(_p: number): Expr14Context;
	// @RuleVersion(0)
	public expr14(_p?: number): Expr14Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr14Context = new Expr14Context(this._ctx, _parentState);
		let _prevctx: Expr14Context = _localctx;
		let _startState: number = 122;
		this.enterRecursionRule(_localctx, 122, ForgeParserParser.RULE_expr14, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 811;
			this.expr15(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 820;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 96, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr14Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr14);
					this.state = 813;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 814;
					this.match(ForgeParserParser.LEFT_SQUARE_TOK);
					this.state = 815;
					this.exprList();
					this.state = 816;
					this.match(ForgeParserParser.RIGHT_SQUARE_TOK);
					}
					}
				}
				this.state = 822;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 96, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public expr15(): Expr15Context;
	public expr15(_p: number): Expr15Context;
	// @RuleVersion(0)
	public expr15(_p?: number): Expr15Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr15Context = new Expr15Context(this._ctx, _parentState);
		let _prevctx: Expr15Context = _localctx;
		let _startState: number = 124;
		this.enterRecursionRule(_localctx, 124, ForgeParserParser.RULE_expr15, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 830;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 97, this._ctx) ) {
			case 1:
				{
				this.state = 824;
				this.expr16(0);
				}
				break;

			case 2:
				{
				this.state = 825;
				this.name();
				this.state = 826;
				this.match(ForgeParserParser.LEFT_SQUARE_TOK);
				this.state = 827;
				this.exprList();
				this.state = 828;
				this.match(ForgeParserParser.RIGHT_SQUARE_TOK);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 837;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 98, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr15Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr15);
					this.state = 832;
					if (!(this.precpred(this._ctx, 2))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
					}
					this.state = 833;
					this.match(ForgeParserParser.DOT_TOK);
					this.state = 834;
					this.expr16(0);
					}
					}
				}
				this.state = 839;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 98, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public expr16(): Expr16Context;
	public expr16(_p: number): Expr16Context;
	// @RuleVersion(0)
	public expr16(_p?: number): Expr16Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Expr16Context = new Expr16Context(this._ctx, _parentState);
		let _prevctx: Expr16Context = _localctx;
		let _startState: number = 126;
		this.enterRecursionRule(_localctx, 126, ForgeParserParser.RULE_expr16, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 841;
			this.expr17();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 847;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 99, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new Expr16Context(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_expr16);
					this.state = 843;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 844;
					this.match(ForgeParserParser.PRIME_TOK);
					}
					}
				}
				this.state = 849;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 99, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr17(): Expr17Context {
		let _localctx: Expr17Context = new Expr17Context(this._ctx, this.state);
		this.enterRule(_localctx, 128, ForgeParserParser.RULE_expr17);
		let _la: number;
		try {
			this.state = 853;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.LEFT_CURLY_TOK:
			case ForgeParserParser.LEFT_PAREN_TOK:
			case ForgeParserParser.NONE_TOK:
			case ForgeParserParser.UNIV_TOK:
			case ForgeParserParser.IDEN_TOK:
			case ForgeParserParser.MINUS_TOK:
			case ForgeParserParser.AT_TOK:
			case ForgeParserParser.BACKQUOTE_TOK:
			case ForgeParserParser.THIS_TOK:
			case ForgeParserParser.SEXPR_TOK:
			case ForgeParserParser.SUM_TOK:
			case ForgeParserParser.INT_TOK:
			case ForgeParserParser.NUM_CONST_TOK:
			case ForgeParserParser.IDENTIFIER_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 850;
				this.expr18();
				}
				break;
			case ForgeParserParser.TILDE_TOK:
			case ForgeParserParser.EXP_TOK:
			case ForgeParserParser.STAR_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 851;
				_la = this._input.LA(1);
				if (!(((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & ((1 << (ForgeParserParser.TILDE_TOK - 76)) | (1 << (ForgeParserParser.EXP_TOK - 76)) | (1 << (ForgeParserParser.STAR_TOK - 76)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 852;
				this.expr17();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr18(): Expr18Context {
		let _localctx: Expr18Context = new Expr18Context(this._ctx, this.state);
		this.enterRule(_localctx, 130, ForgeParserParser.RULE_expr18);
		try {
			this.state = 873;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 101, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 855;
				this.const();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 856;
				this.qualName();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 857;
				this.match(ForgeParserParser.AT_TOK);
				this.state = 858;
				this.name();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 859;
				this.match(ForgeParserParser.BACKQUOTE_TOK);
				this.state = 860;
				this.name();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 861;
				this.match(ForgeParserParser.THIS_TOK);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 862;
				this.match(ForgeParserParser.LEFT_CURLY_TOK);
				this.state = 863;
				this.quantDeclList();
				this.state = 864;
				this.blockOrBar();
				this.state = 865;
				this.match(ForgeParserParser.RIGHT_CURLY_TOK);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 867;
				this.match(ForgeParserParser.LEFT_PAREN_TOK);
				this.state = 868;
				this.expr();
				this.state = 869;
				this.match(ForgeParserParser.RIGHT_PAREN_TOK);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 871;
				this.block();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 872;
				this.sexpr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrowExpr(): ArrowExprContext {
		let _localctx: ArrowExprContext = new ArrowExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, ForgeParserParser.RULE_arrowExpr);
		try {
			this.state = 880;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 102, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 875;
				this.qualName();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 876;
				this.qualName();
				this.state = 877;
				this.match(ForgeParserParser.ARROW_TOK);
				this.state = 878;
				this.arrowExpr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sexprDecl(): SexprDeclContext {
		let _localctx: SexprDeclContext = new SexprDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, ForgeParserParser.RULE_sexprDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 882;
			this.sexpr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sexpr(): SexprContext {
		let _localctx: SexprContext = new SexprContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, ForgeParserParser.RULE_sexpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 884;
			this.match(ForgeParserParser.SEXPR_TOK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public instDecl(): InstDeclContext {
		let _localctx: InstDeclContext = new InstDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, ForgeParserParser.RULE_instDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 886;
			this.match(ForgeParserParser.INST_TOK);
			this.state = 887;
			this.name();
			this.state = 888;
			this.bounds();
			this.state = 890;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ForgeParserParser.FOR_TOK) {
				{
				this.state = 889;
				this.scope();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public evalRelDecl(): EvalRelDeclContext {
		let _localctx: EvalRelDeclContext = new EvalRelDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, ForgeParserParser.RULE_evalRelDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 892;
			this.arrowDecl();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public evalDecl(): EvalDeclContext {
		let _localctx: EvalDeclContext = new EvalDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, ForgeParserParser.RULE_evalDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 894;
			this.match(ForgeParserParser.EVAL_TOK);
			this.state = 895;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exampleDecl(): ExampleDeclContext {
		let _localctx: ExampleDeclContext = new ExampleDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, ForgeParserParser.RULE_exampleDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 897;
			this.match(ForgeParserParser.EXAMPLE_TOK);
			this.state = 898;
			this.name();
			this.state = 899;
			this.match(ForgeParserParser.IS_TOK);
			this.state = 900;
			this.expr();
			this.state = 901;
			this.match(ForgeParserParser.FOR_TOK);
			this.state = 902;
			this.bounds();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public queryDecl(): QueryDeclContext {
		let _localctx: QueryDeclContext = new QueryDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, ForgeParserParser.RULE_queryDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 904;
			this.name();
			this.state = 905;
			this.match(ForgeParserParser.COLON_TOK);
			this.state = 906;
			this.arrowExpr();
			this.state = 907;
			this.match(ForgeParserParser.EQ_TOK);
			this.state = 908;
			this.expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numberList(): NumberListContext {
		let _localctx: NumberListContext = new NumberListContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, ForgeParserParser.RULE_numberList);
		try {
			this.state = 915;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 104, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 910;
				this.number();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 911;
				this.number();
				this.state = 912;
				this.match(ForgeParserParser.COMMA_TOK);
				this.state = 913;
				this.numberList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public number(): NumberContext {
		let _localctx: NumberContext = new NumberContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, ForgeParserParser.RULE_number);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 917;
			this.match(ForgeParserParser.NUM_CONST_TOK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bounds(): BoundsContext {
		let _localctx: BoundsContext = new BoundsContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, ForgeParserParser.RULE_bounds);
		let _la: number;
		try {
			this.state = 931;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.LEFT_CURLY_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 919;
				this.match(ForgeParserParser.LEFT_CURLY_TOK);
				this.state = 923;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ForgeParserParser.MINUS_TOK || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (ForgeParserParser.CARD_TOK - 70)) | (1 << (ForgeParserParser.BACKQUOTE_TOK - 70)) | (1 << (ForgeParserParser.THIS_TOK - 70)) | (1 << (ForgeParserParser.NO_TOK - 70)) | (1 << (ForgeParserParser.SUM_TOK - 70)) | (1 << (ForgeParserParser.INT_TOK - 70)) | (1 << (ForgeParserParser.NUM_CONST_TOK - 70)) | (1 << (ForgeParserParser.IDENTIFIER_TOK - 70)))) !== 0)) {
					{
					{
					this.state = 920;
					this.bound();
					}
					}
					this.state = 925;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 926;
				this.match(ForgeParserParser.RIGHT_CURLY_TOK);
				}
				break;
			case ForgeParserParser.EXACTLY_TOK:
			case ForgeParserParser.THIS_TOK:
			case ForgeParserParser.SUM_TOK:
			case ForgeParserParser.INT_TOK:
			case ForgeParserParser.IDENTIFIER_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 928;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ForgeParserParser.EXACTLY_TOK) {
					{
					this.state = 927;
					this.match(ForgeParserParser.EXACTLY_TOK);
					}
				}

				this.state = 930;
				this.qualName();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public atomNameOrNumber(): AtomNameOrNumberContext {
		let _localctx: AtomNameOrNumberContext = new AtomNameOrNumberContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, ForgeParserParser.RULE_atomNameOrNumber);
		try {
			this.state = 938;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.BACKQUOTE_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 933;
				this.match(ForgeParserParser.BACKQUOTE_TOK);
				this.state = 934;
				this.name();
				}
				break;
			case ForgeParserParser.NUM_CONST_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 935;
				this.number();
				}
				break;
			case ForgeParserParser.MINUS_TOK:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 936;
				this.match(ForgeParserParser.MINUS_TOK);
				this.state = 937;
				this.number();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bound(): BoundContext {
		let _localctx: BoundContext = new BoundContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, ForgeParserParser.RULE_bound);
		try {
			this.state = 947;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 109, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 940;
				this.boundLHS();
				this.state = 941;
				this.compareOp();
				this.state = 942;
				this.bindRHSUnion(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 944;
				this.match(ForgeParserParser.NO_TOK);
				this.state = 945;
				this.boundLHS();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 946;
				this.qualName();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public boundLHS(): BoundLHSContext {
		let _localctx: BoundLHSContext = new BoundLHSContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, ForgeParserParser.RULE_boundLHS);
		let _la: number;
		try {
			this.state = 959;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.CARD_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 949;
				this.match(ForgeParserParser.CARD_TOK);
				this.state = 950;
				this.qualName();
				}
				break;
			case ForgeParserParser.THIS_TOK:
			case ForgeParserParser.SUM_TOK:
			case ForgeParserParser.INT_TOK:
			case ForgeParserParser.IDENTIFIER_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 951;
				this.qualName();
				}
				break;
			case ForgeParserParser.MINUS_TOK:
			case ForgeParserParser.BACKQUOTE_TOK:
			case ForgeParserParser.NUM_CONST_TOK:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 952;
				this.atomNameOrNumber();
				this.state = 955;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 953;
					this.match(ForgeParserParser.DOT_TOK);
					this.state = 954;
					this.qualName();
					}
					}
					this.state = 957;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === ForgeParserParser.DOT_TOK);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public bindRHSUnion(): BindRHSUnionContext;
	public bindRHSUnion(_p: number): BindRHSUnionContext;
	// @RuleVersion(0)
	public bindRHSUnion(_p?: number): BindRHSUnionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: BindRHSUnionContext = new BindRHSUnionContext(this._ctx, _parentState);
		let _prevctx: BindRHSUnionContext = _localctx;
		let _startState: number = 160;
		this.enterRecursionRule(_localctx, 160, ForgeParserParser.RULE_bindRHSUnion, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 967;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 112, this._ctx) ) {
			case 1:
				{
				this.state = 962;
				this.bindRHSProduct(0);
				}
				break;

			case 2:
				{
				this.state = 963;
				this.match(ForgeParserParser.LEFT_PAREN_TOK);
				this.state = 964;
				this.bindRHSUnion(0);
				this.state = 965;
				this.match(ForgeParserParser.RIGHT_PAREN_TOK);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 974;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 113, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new BindRHSUnionContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_bindRHSUnion);
					this.state = 969;
					if (!(this.precpred(this._ctx, 2))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
					}
					this.state = 970;
					this.match(ForgeParserParser.PLUS_TOK);
					this.state = 971;
					this.bindRHSProduct(0);
					}
					}
				}
				this.state = 976;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 113, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public bindRHSProduct(): BindRHSProductContext;
	public bindRHSProduct(_p: number): BindRHSProductContext;
	// @RuleVersion(0)
	public bindRHSProduct(_p?: number): BindRHSProductContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: BindRHSProductContext = new BindRHSProductContext(this._ctx, _parentState);
		let _prevctx: BindRHSProductContext = _localctx;
		let _startState: number = 162;
		this.enterRecursionRule(_localctx, 162, ForgeParserParser.RULE_bindRHSProduct, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 983;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 114, this._ctx) ) {
			case 1:
				{
				this.state = 978;
				this.match(ForgeParserParser.LEFT_PAREN_TOK);
				this.state = 979;
				this.bindRHSProduct(0);
				this.state = 980;
				this.match(ForgeParserParser.RIGHT_PAREN_TOK);
				}
				break;

			case 2:
				{
				this.state = 982;
				this.bindRHSProductBase();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 990;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 115, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new BindRHSProductContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, ForgeParserParser.RULE_bindRHSProduct);
					this.state = 985;
					if (!(this.precpred(this._ctx, 2))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
					}
					this.state = 986;
					_la = this._input.LA(1);
					if (!(_la === ForgeParserParser.ARROW_TOK || _la === ForgeParserParser.COMMA_TOK)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 987;
					this.bindRHSProductBase();
					}
					}
				}
				this.state = 992;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 115, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bindRHSProductBase(): BindRHSProductBaseContext {
		let _localctx: BindRHSProductBaseContext = new BindRHSProductBaseContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, ForgeParserParser.RULE_bindRHSProductBase);
		try {
			this.state = 999;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ForgeParserParser.MINUS_TOK:
			case ForgeParserParser.BACKQUOTE_TOK:
			case ForgeParserParser.NUM_CONST_TOK:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 993;
				this.atomNameOrNumber();
				}
				break;
			case ForgeParserParser.THIS_TOK:
			case ForgeParserParser.SUM_TOK:
			case ForgeParserParser.INT_TOK:
			case ForgeParserParser.IDENTIFIER_TOK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 994;
				this.qualName();
				}
				break;
			case ForgeParserParser.LEFT_PAREN_TOK:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 995;
				this.match(ForgeParserParser.LEFT_PAREN_TOK);
				this.state = 996;
				this.bindRHSUnion(0);
				this.state = 997;
				this.match(ForgeParserParser.RIGHT_PAREN_TOK);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 46:
			return this.expr1_sempred(_localctx as Expr1Context, predIndex);

		case 47:
			return this.expr1_5_sempred(_localctx as Expr1_5Context, predIndex);

		case 48:
			return this.expr2_sempred(_localctx as Expr2Context, predIndex);

		case 50:
			return this.expr4_sempred(_localctx as Expr4Context, predIndex);

		case 53:
			return this.expr6_sempred(_localctx as Expr6Context, predIndex);

		case 55:
			return this.expr8_sempred(_localctx as Expr8Context, predIndex);

		case 57:
			return this.expr10_sempred(_localctx as Expr10Context, predIndex);

		case 58:
			return this.expr11_sempred(_localctx as Expr11Context, predIndex);

		case 59:
			return this.expr12_sempred(_localctx as Expr12Context, predIndex);

		case 60:
			return this.expr13_sempred(_localctx as Expr13Context, predIndex);

		case 61:
			return this.expr14_sempred(_localctx as Expr14Context, predIndex);

		case 62:
			return this.expr15_sempred(_localctx as Expr15Context, predIndex);

		case 63:
			return this.expr16_sempred(_localctx as Expr16Context, predIndex);

		case 80:
			return this.bindRHSUnion_sempred(_localctx as BindRHSUnionContext, predIndex);

		case 81:
			return this.bindRHSProduct_sempred(_localctx as BindRHSProductContext, predIndex);
		}
		return true;
	}
	private expr1_sempred(_localctx: Expr1Context, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expr1_5_sempred(_localctx: Expr1_5Context, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expr2_sempred(_localctx: Expr2Context, predIndex: number): boolean {
		switch (predIndex) {
		case 2:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expr4_sempred(_localctx: Expr4Context, predIndex: number): boolean {
		switch (predIndex) {
		case 3:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expr6_sempred(_localctx: Expr6Context, predIndex: number): boolean {
		switch (predIndex) {
		case 4:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expr8_sempred(_localctx: Expr8Context, predIndex: number): boolean {
		switch (predIndex) {
		case 5:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expr10_sempred(_localctx: Expr10Context, predIndex: number): boolean {
		switch (predIndex) {
		case 6:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expr11_sempred(_localctx: Expr11Context, predIndex: number): boolean {
		switch (predIndex) {
		case 7:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expr12_sempred(_localctx: Expr12Context, predIndex: number): boolean {
		switch (predIndex) {
		case 8:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expr13_sempred(_localctx: Expr13Context, predIndex: number): boolean {
		switch (predIndex) {
		case 9:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expr14_sempred(_localctx: Expr14Context, predIndex: number): boolean {
		switch (predIndex) {
		case 10:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expr15_sempred(_localctx: Expr15Context, predIndex: number): boolean {
		switch (predIndex) {
		case 11:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}
	private expr16_sempred(_localctx: Expr16Context, predIndex: number): boolean {
		switch (predIndex) {
		case 12:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private bindRHSUnion_sempred(_localctx: BindRHSUnionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 13:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}
	private bindRHSProduct_sempred(_localctx: BindRHSProductContext, predIndex: number): boolean {
		switch (predIndex) {
		case 14:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03j\u03EC\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x03\x02\x07\x02\xAA\n\x02" +
		"\f\x02\x0E\x02\xAD\v\x02\x03\x02\x07\x02\xB0\n\x02\f\x02\x0E\x02\xB3\v" +
		"\x02\x03\x02\x07\x02\xB6\n\x02\f\x02\x0E\x02\xB9\v\x02\x05\x02\xBB\n\x02" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03\xC3\n\x03\x03" +
		"\x03\x03\x03\x05\x03\xC7\n\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03" +
		"\xCD\n\x03\x05\x03\xCF\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x05\x04\xE1\n\x04\x03\x05\x05\x05\xE4\n\x05\x03\x05\x05\x05" +
		"\xE7\n\x05\x03\x05\x05\x05\xEA\n\x05\x03\x05\x03\x05\x03\x05\x05\x05\xEF" +
		"\n\x05\x03\x05\x03\x05\x05\x05\xF3\n\x05\x03\x05\x03\x05\x05\x05\xF7\n" +
		"\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x07\x06\xFF\n\x06" +
		"\f\x06\x0E\x06\u0102\v\x06\x05\x06\u0104\n\x06\x03\x07\x03\x07\x03\b\x03" +
		"\b\x03\t\x03\t\x03\n\x05\n\u010D\n\n\x03\n\x03\n\x03\n\x05\n\u0112\n\n" +
		"\x03\n\x03\n\x03\v\x05\v\u0117\n\v\x03\v\x03\v\x03\v\x05\v\u011C\n\v\x03" +
		"\v\x03\v\x03\f\x05\f\u0121\n\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\r\x03" +
		"\r\x03\x0E\x03\x0E\x05\x0E\u012C\n\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E" +
		"\u0131\n\x0E\x03\x0E\x03\x0E\x05\x0E\u0135\n\x0E\x03\x0E\x03\x0E\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x05\x0F\u013D\n\x0F\x03\x0F\x03\x0F\x05\x0F\u0141" +
		"\n\x0F\x03\x0F\x03\x0F\x05\x0F\u0145\n\x0F\x03\x0F\x03\x0F\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x10\x03\x10\x05\x10\u014E\n\x10\x03\x10\x03\x10\x03\x10" +
		"\x05\x10\u0153\n\x10\x03\x10\x05\x10\u0156\n\x10\x03\x11\x03\x11\x05\x11" +
		"\u015A\n\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x05\x12\u0161\n\x12" +
		"\x03\x12\x03\x12\x03\x12\x05\x12\u0166\n\x12\x03\x12\x05\x12\u0169\n\x12" +
		"\x03\x12\x03\x12\x05\x12\u016D\n\x12\x03\x13\x03\x13\x03\x13\x05\x13\u0172" +
		"\n\x13\x03\x13\x03\x13\x05\x13\u0176\n\x13\x03\x13\x05\x13\u0179\n\x13" +
		"\x03\x13\x03\x13\x05\x13\u017D\n\x13\x03\x13\x03\x13\x03\x13\x03\x14\x05" +
		"\x14\u0183\n\x14\x03\x14\x03\x14\x05\x14\u0187\n\x14\x03\x14\x03\x14\x03" +
		"\x15\x03\x15\x07\x15\u018D\n\x15\f\x15\x0E\x15\u0190\v\x15\x03\x15\x03" +
		"\x15\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\u0198\n\x16\x03\x16\x03\x16" +
		"\x05\x16\u019C\n\x16\x03\x17\x05\x17\u019F\n\x17\x03\x17\x03\x17\x03\x17" +
		"\x03\x18\x03\x18\x03\x18\x03\x18\x05\x18\u01A8\n\x18\x03\x18\x05\x18\u01AB" +
		"\n\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x05\x19\u01B2\n\x19\x03" +
		"\x19\x03\x19\x05\x19\u01B6\n\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A" +
		"\x03\x1A\x03\x1A\x05\x1A\u01BF\n\x1A\x03\x1A\x03\x1A\x05\x1A\u01C3\n\x1A" +
		"\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u01C8\n\x1B\x03\x1B\x03\x1B\x03\x1B\x03" +
		"\x1B\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u01D1\n\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u01DB\n\x1B\x03\x1B\x05" +
		"\x1B\u01DE\n\x1B\x03\x1B\x03\x1B\x05\x1B\u01E2\n\x1B\x03\x1C\x03\x1C\x03" +
		"\x1C\x03\x1C\x03\x1C\x03\x1C\x07\x1C\u01EA\n\x1C\f\x1C\x0E\x1C\u01ED\v" +
		"\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\u01F6" +
		"\n\x1D\x03\x1E\x03\x1E\x05\x1E\u01FA\n\x1E\x03\x1E\x03\x1E\x03\x1E\x05" +
		"\x1E\u01FF\n\x1E\x03\x1F\x03\x1F\x03 \x03 \x03 \x03 \x03!\x03!\x07!\u0209" +
		"\n!\f!\x0E!\u020C\v!\x03!\x03!\x03\"\x03\"\x03\"\x05\"\u0213\n\"\x03#" +
		"\x03#\x03#\x03#\x05#\u0219\n#\x03$\x03$\x05$\u021D\n$\x03$\x03$\x03$\x07" +
		"$\u0222\n$\f$\x0E$\u0225\v$\x03$\x03$\x03$\x05$\u022A\n$\x03%\x03%\x03" +
		"%\x03%\x03%\x05%\u0231\n%\x03%\x05%\u0234\n%\x03&\x03&\x03\'\x03\'\x03" +
		"\'\x03\'\x03\'\x05\'\u023D\n\'\x03(\x03(\x03(\x03(\x03(\x05(\u0244\n(" +
		"\x03)\x03)\x03)\x03)\x03)\x05)\u024B\n)\x03*\x03*\x03*\x03*\x03*\x05*" +
		"\u0252\n*\x03+\x03+\x03+\x03+\x03+\x05+\u0259\n+\x03,\x03,\x03,\x03,\x03" +
		",\x05,\u0260\n,\x03-\x03-\x03-\x03-\x03-\x05-\u0267\n-\x03.\x03.\x03." +
		"\x03.\x03.\x05.\u026E\n.\x03/\x03/\x03/\x03/\x03/\x03/\x03/\x03/\x03/" +
		"\x03/\x03/\x05/\u027B\n/\x03/\x03/\x03/\x05/\u0280\n/\x030\x030\x030\x03" +
		"0\x030\x030\x070\u0288\n0\f0\x0E0\u028B\v0\x031\x031\x031\x031\x031\x03" +
		"1\x071\u0293\n1\f1\x0E1\u0296\v1\x032\x032\x032\x032\x032\x032\x072\u029E" +
		"\n2\f2\x0E2\u02A1\v2\x033\x033\x033\x033\x033\x033\x053\u02A9\n3\x053" +
		"\u02AB\n3\x034\x034\x034\x034\x034\x034\x074\u02B3\n4\f4\x0E4\u02B6\v" +
		"4\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x03" +
		"5\x035\x035\x035\x055\u02C9\n5\x036\x036\x036\x036\x036\x036\x036\x03" +
		"6\x036\x036\x036\x036\x036\x036\x036\x056\u02DA\n6\x037\x037\x037\x03" +
		"7\x037\x057\u02E1\n7\x037\x037\x037\x077\u02E6\n7\f7\x0E7\u02E9\v7\x03" +
		"8\x038\x038\x058\u02EE\n8\x039\x039\x039\x039\x039\x039\x079\u02F6\n9" +
		"\f9\x0E9\u02F9\v9\x03:\x03:\x03:\x05:\u02FE\n:\x03;\x03;\x03;\x03;\x03" +
		";\x03;\x07;\u0306\n;\f;\x0E;\u0309\v;\x03<\x03<\x03<\x03<\x03<\x03<\x07" +
		"<\u0311\n<\f<\x0E<\u0314\v<\x03=\x03=\x03=\x03=\x03=\x03=\x03=\x07=\u031D" +
		"\n=\f=\x0E=\u0320\v=\x03>\x03>\x03>\x03>\x03>\x03>\x07>\u0328\n>\f>\x0E" +
		">\u032B\v>\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x07?\u0335\n?\f?\x0E" +
		"?\u0338\v?\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x05@\u0341\n@\x03@\x03@" +
		"\x03@\x07@\u0346\n@\f@\x0E@\u0349\v@\x03A\x03A\x03A\x03A\x03A\x07A\u0350" +
		"\nA\fA\x0EA\u0353\vA\x03B\x03B\x03B\x05B\u0358\nB\x03C\x03C\x03C\x03C" +
		"\x03C\x03C\x03C\x03C\x03C\x03C\x03C\x03C\x03C\x03C\x03C\x03C\x03C\x03" +
		"C\x05C\u036C\nC\x03D\x03D\x03D\x03D\x03D\x05D\u0373\nD\x03E\x03E\x03F" +
		"\x03F\x03G\x03G\x03G\x03G\x05G\u037D\nG\x03H\x03H\x03I\x03I\x03I\x03J" +
		"\x03J\x03J\x03J\x03J\x03J\x03J\x03K\x03K\x03K\x03K\x03K\x03K\x03L\x03" +
		"L\x03L\x03L\x03L\x05L\u0396\nL\x03M\x03M\x03N\x03N\x07N\u039C\nN\fN\x0E" +
		"N\u039F\vN\x03N\x03N\x05N\u03A3\nN\x03N\x05N\u03A6\nN\x03O\x03O\x03O\x03" +
		"O\x03O\x05O\u03AD\nO\x03P\x03P\x03P\x03P\x03P\x03P\x03P\x05P\u03B6\nP" +
		"\x03Q\x03Q\x03Q\x03Q\x03Q\x03Q\x06Q\u03BE\nQ\rQ\x0EQ\u03BF\x05Q\u03C2" +
		"\nQ\x03R\x03R\x03R\x03R\x03R\x03R\x05R\u03CA\nR\x03R\x03R\x03R\x07R\u03CF" +
		"\nR\fR\x0ER\u03D2\vR\x03S\x03S\x03S\x03S\x03S\x03S\x05S\u03DA\nS\x03S" +
		"\x03S\x03S\x07S\u03DF\nS\fS\x0ES\u03E2\vS\x03T\x03T\x03T\x03T\x03T\x03" +
		"T\x05T\u03EA\nT\x03T\x02\x02\x11^`bflptvxz|~\x80\xA2\xA4U\x02\x02\x04" +
		"\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02" +
		"\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02." +
		"\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02" +
		"J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02" +
		"f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80" +
		"\x02\x82\x02\x84\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92" +
		"\x02\x94\x02\x96\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4" +
		"\x02\xA6\x02\x02\x0F\x03\x02\x10\x13\x04\x02\x10\x10\x12\x16\x05\x02\x10" +
		"\x10\x12\x12\x14\x16\x03\x02 !\x03\x02*-\x04\x02*+--\x03\x0234\x05\x02" +
		"\x0E\x0E))Y^\x04\x02\x10\x14__\x04\x02\x0F\x0F((\x03\x02KL\x03\x02NP\x04" +
		"\x02XXcc\x02\u043D\x02\xBA\x03\x02\x02\x02\x04\xCE\x03\x02\x02\x02\x06" +
		"\xE0\x03\x02\x02\x02\b\xE3\x03\x02\x02\x02\n\u0103\x03\x02\x02\x02\f\u0105" +
		"\x03\x02\x02\x02\x0E\u0107\x03\x02\x02\x02\x10\u0109\x03\x02\x02\x02\x12" +
		"\u010C\x03\x02\x02\x02\x14\u0116\x03\x02\x02\x02\x16\u0120\x03\x02\x02" +
		"\x02\x18\u0127\x03\x02\x02\x02\x1A\u0129\x03\x02\x02\x02\x1C\u0138\x03" +
		"\x02\x02\x02\x1E\u0155\x03\x02\x02\x02 \u0157\x03\x02\x02\x02\"\u0160" +
		"\x03\x02\x02\x02$\u0171\x03\x02\x02\x02&\u0182\x03\x02\x02\x02(\u018A" +
		"\x03\x02\x02\x02*\u019B\x03\x02\x02\x02,\u019E\x03\x02\x02\x02.\u01AA" +
		"\x03\x02\x02\x020\u01AC\x03\x02\x02\x022\u01B7\x03\x02\x02\x024\u01C4" +
		"\x03\x02\x02\x026\u01E3\x03\x02\x02\x028\u01F5\x03\x02\x02\x02:\u01F9" +
		"\x03\x02\x02\x02<\u0200\x03\x02\x02\x02>\u0202\x03\x02\x02\x02@\u0206" +
		"\x03\x02\x02\x02B\u0212\x03\x02\x02\x02D\u0218\x03\x02\x02\x02F\u0229" +
		"\x03\x02\x02\x02H\u022B\x03\x02\x02\x02J\u0235\x03\x02\x02\x02L\u023C" +
		"\x03\x02\x02\x02N\u0243\x03\x02\x02\x02P\u024A\x03\x02\x02\x02R\u0251" +
		"\x03\x02\x02\x02T\u0258\x03\x02\x02\x02V\u025F\x03\x02\x02\x02X\u0266" +
		"\x03\x02\x02\x02Z\u026D\x03\x02\x02\x02\\\u027F\x03\x02\x02\x02^\u0281" +
		"\x03\x02\x02\x02`\u028C\x03\x02\x02\x02b\u0297\x03\x02\x02\x02d\u02AA" +
		"\x03\x02\x02\x02f\u02AC\x03\x02\x02\x02h\u02C8\x03\x02\x02\x02j\u02D9" +
		"\x03\x02\x02\x02l\u02DB\x03\x02\x02\x02n\u02ED\x03\x02\x02\x02p\u02EF" +
		"\x03\x02\x02\x02r\u02FD\x03\x02\x02\x02t\u02FF\x03\x02\x02\x02v\u030A" +
		"\x03\x02\x02\x02x\u0315\x03\x02\x02\x02z\u0321\x03\x02\x02\x02|\u032C" +
		"\x03\x02\x02\x02~\u0340\x03\x02\x02\x02\x80\u034A\x03\x02\x02\x02\x82" +
		"\u0357\x03\x02\x02\x02\x84\u036B\x03\x02\x02\x02\x86\u0372\x03\x02\x02" +
		"\x02\x88\u0374\x03\x02\x02\x02\x8A\u0376\x03\x02\x02\x02\x8C\u0378\x03" +
		"\x02\x02\x02\x8E\u037E\x03\x02\x02\x02\x90\u0380\x03\x02\x02\x02\x92\u0383" +
		"\x03\x02\x02\x02\x94\u038A\x03\x02\x02\x02\x96\u0395\x03\x02\x02\x02\x98" +
		"\u0397\x03\x02\x02\x02\x9A\u03A5\x03\x02\x02\x02\x9C\u03AC\x03\x02\x02" +
		"\x02\x9E\u03B5\x03\x02\x02\x02\xA0\u03C1\x03\x02\x02\x02\xA2\u03C9\x03" +
		"\x02\x02\x02\xA4\u03D9\x03\x02\x02\x02\xA6\u03E9\x03\x02\x02\x02\xA8\xAA" +
		"\x05\x04\x03\x02\xA9\xA8\x03\x02\x02\x02\xAA\xAD\x03\x02\x02\x02\xAB\xA9" +
		"\x03\x02\x02\x02\xAB\xAC\x03\x02\x02\x02\xAC\xB1\x03\x02\x02\x02\xAD\xAB" +
		"\x03\x02\x02\x02\xAE\xB0\x05\x06\x04\x02\xAF\xAE\x03\x02\x02\x02\xB0\xB3" +
		"\x03\x02\x02\x02\xB1\xAF\x03\x02\x02\x02\xB1\xB2\x03\x02\x02\x02\xB2\xBB" +
		"\x03\x02\x02\x02\xB3\xB1\x03\x02\x02\x02\xB4\xB6\x05\x90I\x02\xB5\xB4" +
		"\x03\x02\x02\x02\xB6\xB9\x03\x02\x02\x02\xB7\xB5\x03\x02\x02\x02\xB7\xB8" +
		"\x03\x02\x02\x02\xB8\xBB\x03\x02\x02\x02\xB9\xB7\x03\x02\x02\x02\xBA\xAB" +
		"\x03\x02\x02\x02\xBA\xB7\x03\x02\x02\x02\xBB\x03\x03\x02\x02\x02\xBC\xBD" +
		"\x07\x03\x02\x02\xBD\xC2\x05F$\x02\xBE\xBF\x07\x04\x02\x02\xBF\xC0\x05" +
		"N(\x02\xC0\xC1\x07\x05\x02\x02\xC1\xC3\x03\x02\x02\x02\xC2\xBE\x03\x02" +
		"\x02\x02\xC2\xC3\x03\x02\x02\x02\xC3\xC6\x03\x02\x02\x02\xC4\xC5\x07\x06" +
		"\x02\x02\xC5\xC7\x05J&\x02\xC6\xC4\x03\x02\x02\x02\xC6\xC7\x03\x02\x02" +
		"\x02\xC7\xCF\x03\x02\x02\x02\xC8\xC9\x07\x03\x02\x02\xC9\xCC\x07\x07\x02" +
		"\x02\xCA\xCB\x07\x06\x02\x02\xCB\xCD\x05J&\x02\xCC\xCA\x03\x02\x02\x02" +
		"\xCC\xCD\x03\x02\x02\x02\xCD\xCF\x03\x02\x02\x02\xCE\xBC\x03\x02\x02\x02" +
		"\xCE\xC8\x03\x02\x02\x02\xCF\x05\x03\x02\x02\x02\xD0\xE1\x05\b\x05\x02" +
		"\xD1\xE1\x05\x1A\x0E\x02\xD2\xE1\x05\x1C\x0F\x02\xD3\xE1\x05 \x11\x02" +
		"\xD4\xE1\x05\"\x12\x02\xD5\xE1\x05&\x14\x02\xD6\xE1\x05\x88E\x02\xD7\xE1" +
		"\x05\x94K\x02\xD8\xE1\x05\x8EH\x02\xD9\xE1\x05H%\x02\xDA\xE1\x05\x8CG" +
		"\x02\xDB\xE1\x05\x92J\x02\xDC\xE1\x052\x1A\x02\xDD\xE1\x054\x1B\x02\xDE" +
		"\xE1\x050\x19\x02\xDF\xE1\x056\x1C\x02\xE0\xD0\x03\x02\x02\x02\xE0\xD1" +
		"\x03\x02\x02\x02\xE0\xD2\x03\x02\x02\x02\xE0\xD3\x03\x02\x02\x02\xE0\xD4" +
		"\x03\x02\x02\x02\xE0\xD5\x03\x02\x02\x02\xE0\xD6\x03\x02\x02\x02\xE0\xD7" +
		"\x03\x02\x02\x02\xE0\xD8\x03\x02\x02\x02\xE0\xD9\x03\x02\x02\x02\xE0\xDA" +
		"\x03\x02\x02\x02\xE0\xDB\x03\x02\x02\x02\xE0\xDC\x03\x02\x02\x02\xE0\xDD" +
		"\x03\x02\x02\x02\xE0\xDE\x03\x02\x02\x02\xE0\xDF\x03\x02\x02\x02\xE1\x07" +
		"\x03\x02\x02\x02\xE2\xE4\x07\b\x02\x02\xE3\xE2\x03\x02\x02\x02\xE3\xE4" +
		"\x03\x02\x02\x02\xE4\xE6\x03\x02\x02\x02\xE5\xE7\x07\t\x02\x02\xE6\xE5" +
		"\x03\x02\x02\x02\xE6\xE7\x03\x02\x02\x02\xE7\xE9\x03\x02\x02\x02\xE8\xEA" +
		"\x05\f\x07\x02\xE9\xE8\x03\x02\x02\x02\xE9\xEA\x03\x02\x02\x02\xEA\xEB" +
		"\x03\x02\x02\x02\xEB\xEC\x07\n\x02\x02\xEC\xEE\x05L\'\x02\xED\xEF\x05" +
		"\n\x06\x02\xEE\xED\x03\x02\x02\x02\xEE\xEF\x03\x02\x02\x02\xEF\xF0\x03" +
		"\x02\x02\x02\xF0\xF2\x07\v\x02\x02\xF1\xF3\x05T+\x02\xF2\xF1\x03\x02\x02" +
		"\x02\xF2\xF3\x03\x02\x02\x02\xF3\xF4\x03\x02\x02\x02\xF4\xF6\x07\f\x02" +
		"\x02\xF5\xF7\x05@!\x02\xF6\xF5\x03\x02\x02\x02\xF6\xF7\x03\x02\x02\x02" +
		"\xF7\t\x03\x02\x02\x02\xF8\xF9\x07\r\x02\x02\xF9\u0104\x05F$\x02\xFA\xFB" +
		"\x07\x0E\x02\x02\xFB\u0100\x05F$\x02\xFC\xFD\x07\x0F\x02\x02\xFD\xFF\x05" +
		"F$\x02\xFE\xFC\x03\x02\x02\x02\xFF\u0102\x03\x02\x02\x02\u0100\xFE\x03" +
		"\x02\x02\x02\u0100\u0101\x03\x02\x02\x02\u0101\u0104\x03\x02\x02\x02\u0102" +
		"\u0100\x03\x02\x02\x02\u0103\xF8\x03\x02\x02\x02\u0103\xFA\x03\x02\x02" +
		"\x02\u0104\v\x03\x02\x02\x02\u0105\u0106\t\x02\x02\x02\u0106\r\x03\x02" +
		"\x02\x02\u0107\u0108\t\x03\x02\x02\u0108\x0F\x03\x02\x02\x02\u0109\u010A" +
		"\t\x04\x02\x02\u010A\x11\x03\x02\x02\x02\u010B\u010D\x07\x17\x02\x02\u010C" +
		"\u010B\x03\x02\x02\x02\u010C\u010D\x03\x02\x02\x02\u010D\u010E\x03\x02" +
		"\x02\x02\u010E\u010F\x05L\'\x02\u010F\u0111\x07\x18\x02\x02\u0110\u0112" +
		"\x05\x10\t\x02\u0111\u0110\x03\x02\x02\x02\u0111\u0112\x03\x02\x02\x02" +
		"\u0112\u0113\x03\x02\x02\x02\u0113\u0114\x05\\/\x02\u0114\x13\x03\x02" +
		"\x02\x02\u0115\u0117\x07\x17\x02\x02\u0116\u0115\x03\x02\x02\x02\u0116" +
		"\u0117\x03\x02\x02\x02\u0117\u0118\x03\x02\x02\x02\u0118\u0119\x05L\'" +
		"\x02\u0119\u011B\x07\x18\x02\x02\u011A\u011C\x07\x14\x02\x02\u011B\u011A" +
		"\x03\x02\x02\x02\u011B\u011C\x03\x02\x02\x02\u011C\u011D\x03\x02\x02\x02" +
		"\u011D\u011E\x05\\/\x02\u011E\x15\x03\x02\x02\x02\u011F\u0121\x07\b\x02" +
		"\x02\u0120\u011F\x03\x02\x02\x02\u0120\u0121\x03\x02\x02\x02\u0121\u0122" +
		"\x03\x02\x02\x02\u0122\u0123\x05L\'\x02\u0123\u0124\x07\x18\x02\x02\u0124" +
		"\u0125\x05\x0E\b\x02\u0125\u0126\x05\x86D\x02\u0126\x17\x03\x02\x02\x02" +
		"\u0127\u0128\x07\x19\x02\x02\u0128\x19\x03\x02\x02\x02\u0129\u012B\x07" +
		"\x1A\x02\x02\u012A\u012C\x05\x18\r\x02\u012B\u012A\x03\x02\x02\x02\u012B" +
		"\u012C\x03\x02\x02\x02\u012C\u0130\x03\x02\x02\x02\u012D\u012E\x05F$\x02" +
		"\u012E\u012F\x07\x1B\x02\x02\u012F\u0131\x03\x02\x02\x02\u0130\u012D\x03" +
		"\x02\x02\x02\u0130\u0131\x03\x02\x02\x02\u0131\u0132\x03\x02\x02\x02\u0132" +
		"\u0134\x05J&\x02\u0133\u0135\x05\x1E\x10\x02\u0134\u0133\x03\x02\x02\x02" +
		"\u0134\u0135\x03\x02\x02\x02\u0135\u0136\x03\x02\x02\x02\u0136\u0137\x05" +
		"@!\x02\u0137\x1B\x03\x02\x02\x02\u0138\u013C\x07\x1C\x02\x02\u0139\u013A" +
		"\x05F$\x02\u013A\u013B\x07\x1B\x02\x02\u013B\u013D\x03\x02\x02\x02\u013C" +
		"\u0139\x03\x02\x02\x02\u013C\u013D\x03\x02\x02\x02\u013D\u013E\x03\x02" +
		"\x02\x02\u013E\u0140\x05J&\x02\u013F\u0141\x05\x1E\x10\x02\u0140\u013F" +
		"\x03\x02\x02\x02\u0140\u0141\x03\x02\x02\x02\u0141\u0142\x03\x02\x02\x02" +
		"\u0142\u0144\x07\x18\x02\x02\u0143\u0145\x05\x10\t\x02\u0144\u0143\x03" +
		"\x02\x02\x02\u0144\u0145\x03\x02\x02\x02\u0145\u0146\x03\x02\x02\x02\u0146" +
		"\u0147\x05\\/\x02\u0147\u0148\x07\v\x02\x02\u0148\u0149\x05\\/\x02\u0149" +
		"\u014A\x07\f\x02\x02\u014A\x1D\x03\x02\x02\x02\u014B\u014D\x07\x1D\x02" +
		"\x02\u014C\u014E\x05P)\x02\u014D\u014C\x03\x02\x02\x02\u014D\u014E\x03" +
		"\x02\x02\x02\u014E\u014F\x03\x02\x02\x02\u014F\u0156\x07\x1E\x02\x02\u0150" +
		"\u0152\x07\x04\x02\x02\u0151\u0153\x05P)\x02\u0152\u0151\x03\x02\x02\x02" +
		"\u0152\u0153\x03\x02\x02\x02\u0153\u0154\x03\x02\x02\x02\u0154\u0156\x07" +
		"\x05\x02\x02\u0155\u014B\x03\x02\x02\x02\u0155\u0150\x03\x02\x02\x02\u0156" +
		"\x1F\x03\x02\x02\x02\u0157\u0159\x07\x1F\x02\x02\u0158\u015A\x05J&\x02" +
		"\u0159\u0158\x03\x02\x02\x02\u0159\u015A\x03\x02\x02\x02\u015A\u015B\x03" +
		"\x02\x02\x02\u015B\u015C\x05@!\x02\u015C!\x03\x02\x02\x02\u015D\u015E" +
		"\x05J&\x02\u015E\u015F\x07\x18\x02\x02\u015F\u0161\x03\x02\x02\x02\u0160" +
		"\u015D\x03\x02\x02\x02\u0160\u0161\x03\x02\x02\x02\u0161\u0162\x03\x02" +
		"\x02\x02\u0162\u0165\t\x05\x02\x02\u0163\u0166\x05F$\x02\u0164\u0166\x05" +
		"@!\x02\u0165\u0163\x03\x02\x02\x02\u0165\u0164\x03\x02\x02\x02\u0165\u0166" +
		"\x03\x02\x02\x02\u0166\u0168\x03\x02\x02\x02\u0167\u0169\x05*\x16\x02" +
		"\u0168\u0167\x03\x02\x02\x02\u0168\u0169\x03\x02\x02\x02\u0169\u016C\x03" +
		"\x02\x02\x02\u016A\u016B\x07\"\x02\x02\u016B\u016D\x05\x9AN\x02\u016C" +
		"\u016A\x03\x02\x02\x02\u016C\u016D\x03\x02\x02\x02\u016D#\x03\x02\x02" +
		"\x02\u016E\u016F\x05J&\x02\u016F\u0170\x07\x18\x02\x02\u0170\u0172\x03" +
		"\x02\x02\x02\u0171\u016E\x03\x02\x02\x02\u0171\u0172\x03\x02\x02\x02\u0172" +
		"\u0175\x03\x02\x02\x02\u0173\u0176\x05F$\x02\u0174\u0176\x05@!\x02\u0175" +
		"\u0173\x03\x02\x02\x02\u0175\u0174\x03\x02\x02\x02\u0176\u0178\x03\x02" +
		"\x02\x02\u0177\u0179\x05*\x16\x02\u0178\u0177\x03\x02\x02\x02\u0178\u0179" +
		"\x03\x02\x02\x02\u0179\u017C\x03\x02\x02\x02\u017A\u017B\x07\"\x02\x02" +
		"\u017B\u017D\x05\x9AN\x02\u017C\u017A\x03\x02\x02\x02\u017C\u017D\x03" +
		"\x02\x02\x02\u017D\u017E\x03\x02\x02\x02\u017E\u017F\x07)\x02\x02\u017F" +
		"\u0180\t\x06\x02\x02\u0180%\x03\x02\x02\x02\u0181\u0183\x07.\x02\x02\u0182" +
		"\u0181\x03\x02\x02\x02\u0182\u0183\x03\x02\x02\x02\u0183\u0184\x03\x02" +
		"\x02\x02\u0184\u0186\x07/\x02\x02\u0185\u0187\x05J&\x02\u0186\u0185\x03" +
		"\x02\x02\x02\u0186\u0187\x03\x02\x02\x02\u0187\u0188\x03\x02\x02\x02\u0188" +
		"\u0189\x05(\x15\x02\u0189\'\x03\x02\x02\x02\u018A\u018E\x07\v\x02\x02" +
		"\u018B\u018D\x05$\x13\x02\u018C\u018B\x03\x02\x02\x02\u018D\u0190\x03" +
		"\x02\x02\x02\u018E\u018C\x03\x02\x02\x02\u018E\u018F\x03\x02\x02\x02\u018F" +
		"\u0191\x03\x02\x02\x02\u0190\u018E\x03\x02\x02\x02\u0191\u0192\x07\f\x02" +
		"\x02\u0192)\x03\x02\x02\x02\u0193\u0194\x07\"\x02\x02\u0194\u0197\x05" +
		"\x98M\x02\u0195\u0196\x07#\x02\x02\u0196\u0198\x05X-\x02\u0197\u0195\x03" +
		"\x02\x02\x02\u0197\u0198\x03\x02\x02\x02\u0198\u019C\x03\x02\x02\x02\u0199" +
		"\u019A\x07\"\x02\x02\u019A\u019C\x05X-\x02\u019B\u0193\x03\x02\x02\x02" +
		"\u019B\u0199\x03\x02\x02\x02\u019C+\x03\x02\x02\x02\u019D\u019F\x07$\x02" +
		"\x02\u019E\u019D\x03\x02\x02\x02\u019E\u019F\x03\x02\x02\x02\u019F\u01A0" +
		"\x03\x02\x02\x02\u01A0\u01A1\x05\x98M\x02\u01A1\u01A2\x05F$\x02\u01A2" +
		"-\x03\x02\x02\x02\u01A3\u01AB\x07%\x02\x02\u01A4\u01AB\x07&\x02\x02\u01A5" +
		"\u01AB\x07\'\x02\x02\u01A6\u01A8\x07(\x02\x02\u01A7\u01A6\x03\x02\x02" +
		"\x02\u01A7\u01A8\x03\x02\x02\x02\u01A8\u01A9\x03\x02\x02\x02\u01A9\u01AB" +
		"\x05\x98M\x02\u01AA\u01A3\x03\x02\x02\x02\u01AA\u01A4\x03\x02\x02\x02" +
		"\u01AA\u01A5\x03\x02\x02\x02\u01AA\u01A7\x03\x02\x02\x02\u01AB/\x03\x02" +
		"\x02\x02\u01AC\u01AD\x07\x1F\x02\x02\u01AD\u01AE\x05J&\x02\u01AE\u01AF" +
		"\x07)\x02\x02\u01AF\u01B1\t\x07\x02\x02\u01B0\u01B2\x05*\x16\x02\u01B1" +
		"\u01B0\x03\x02\x02\x02\u01B1\u01B2\x03\x02\x02\x02\u01B2\u01B5\x03\x02" +
		"\x02\x02\u01B3\u01B4\x07\"\x02\x02\u01B4\u01B6\x05\x9AN\x02\u01B5\u01B3" +
		"\x03\x02\x02\x02\u01B5\u01B6\x03\x02\x02\x02\u01B61\x03\x02\x02\x02\u01B7" +
		"\u01B8\x07\x1F\x02\x02\u01B8\u01B9\x05J&\x02\u01B9\u01BA\x07)\x02\x02" +
		"\u01BA\u01BB\t\b\x02\x02\u01BB\u01BC\x07\"\x02\x02\u01BC\u01BE\x05J&\x02" +
		"\u01BD\u01BF\x05*\x16\x02\u01BE\u01BD\x03\x02\x02\x02\u01BE\u01BF\x03" +
		"\x02\x02\x02\u01BF\u01C2\x03";
	private static readonly _serializedATNSegment1: string =
		"\x02\x02\x02\u01C0\u01C1\x07\"\x02\x02\u01C1\u01C3\x05\x9AN\x02\u01C2" +
		"\u01C0\x03\x02\x02\x02\u01C2\u01C3\x03\x02\x02\x02\u01C33\x03\x02\x02" +
		"\x02\u01C4\u01C5\x07\x1F\x02\x02\u01C5\u01C7\x072\x02\x02\u01C6\u01C8" +
		"\x07\x17\x02\x02\u01C7\u01C6\x03\x02\x02\x02\u01C7\u01C8\x03\x02\x02\x02" +
		"\u01C8\u01C9\x03\x02\x02\x02\u01C9\u01CA\x05R*\x02\u01CA\u01CB\x071\x02" +
		"\x02\u01CB\u01D0\x05J&\x02\u01CC\u01CD\x07\x04\x02\x02\u01CD\u01CE\x05" +
		"Z.\x02\u01CE\u01CF\x07\x05\x02\x02\u01CF\u01D1\x03\x02\x02\x02\u01D0\u01CC" +
		"\x03\x02\x02\x02\u01D0\u01D1\x03\x02\x02\x02\u01D1\u01D2\x03\x02\x02\x02" +
		"\u01D2\u01D3\x07)\x02\x02\u01D3\u01D4\t\b\x02\x02\u01D4\u01D5\x07\"\x02" +
		"\x02\u01D5\u01DA\x05J&\x02\u01D6\u01D7\x07\x04\x02\x02\u01D7\u01D8\x05" +
		"Z.\x02\u01D8\u01D9\x07\x05\x02\x02\u01D9\u01DB\x03\x02\x02\x02\u01DA\u01D6" +
		"\x03\x02\x02\x02\u01DA\u01DB\x03\x02\x02\x02\u01DB\u01DD\x03\x02\x02\x02" +
		"\u01DC\u01DE\x05*\x16\x02\u01DD\u01DC\x03\x02\x02\x02\u01DD\u01DE\x03" +
		"\x02\x02\x02\u01DE\u01E1\x03\x02\x02\x02\u01DF\u01E0\x07\"\x02\x02\u01E0" +
		"\u01E2\x05\x9AN\x02\u01E1\u01DF\x03\x02\x02\x02\u01E1\u01E2\x03\x02\x02" +
		"\x02\u01E25\x03\x02\x02\x02\u01E3\u01E4\x07.\x02\x02\u01E4\u01E5\x070" +
		"\x02\x02\u01E5\u01E6\x07\"\x02\x02\u01E6\u01E7\x05J&\x02\u01E7\u01EB\x07" +
		"\v\x02\x02\u01E8\u01EA\x058\x1D\x02\u01E9\u01E8\x03\x02\x02\x02\u01EA" +
		"\u01ED\x03\x02\x02\x02\u01EB\u01E9\x03\x02\x02\x02\u01EB\u01EC\x03\x02" +
		"\x02\x02\u01EC\u01EE\x03\x02\x02\x02\u01ED\u01EB\x03\x02\x02\x02\u01EE" +
		"\u01EF\x07\f\x02\x02\u01EF7\x03\x02\x02\x02\u01F0\u01F6\x05\x92J\x02\u01F1" +
		"\u01F6\x05&\x14\x02\u01F2\u01F6\x052\x1A\x02\u01F3\u01F6\x054\x1B\x02" +
		"\u01F4\u01F6\x050\x19\x02\u01F5\u01F0\x03\x02\x02\x02\u01F5\u01F1\x03" +
		"\x02\x02\x02\u01F5\u01F2\x03\x02\x02\x02\u01F5\u01F3\x03\x02\x02\x02\u01F5" +
		"\u01F4\x03\x02\x02\x02\u01F69\x03\x02\x02\x02\u01F7\u01FA\x05\f\x07\x02" +
		"\u01F8\u01FA\x07\x14\x02\x02\u01F9\u01F7\x03\x02\x02\x02\u01F9\u01F8\x03" +
		"\x02\x02\x02\u01F9\u01FA\x03\x02\x02\x02\u01FA\u01FB\x03\x02\x02\x02\u01FB" +
		"\u01FE\x07X\x02\x02\u01FC\u01FF\x05\f\x07\x02\u01FD\u01FF\x07\x14\x02" +
		"\x02\u01FE\u01FC\x03\x02\x02\x02\u01FE\u01FD\x03\x02\x02\x02\u01FE\u01FF" +
		"\x03\x02\x02\x02\u01FF;\x03\x02\x02\x02\u0200\u0201\t\t\x02\x02\u0201" +
		"=\x03\x02\x02\x02\u0202\u0203\x05J&\x02\u0203\u0204\x07Y\x02\x02\u0204" +
		"\u0205\x05\\/\x02\u0205?\x03\x02\x02\x02\u0206\u020A\x07\v\x02\x02\u0207" +
		"\u0209\x05\\/\x02\u0208\u0207\x03\x02\x02\x02\u0209\u020C\x03\x02\x02" +
		"\x02\u020A\u0208\x03\x02\x02\x02\u020A\u020B\x03\x02\x02\x02\u020B\u020D" +
		"\x03\x02\x02\x02\u020C\u020A\x03\x02\x02\x02\u020D\u020E\x07\f\x02\x02" +
		"\u020EA\x03\x02\x02\x02\u020F\u0213\x05@!\x02\u0210\u0211\x071\x02\x02" +
		"\u0211\u0213\x05\\/\x02\u0212\u020F\x03\x02\x02\x02\u0212\u0210\x03\x02" +
		"\x02\x02\u0213C\x03\x02\x02\x02\u0214\u0219\x072\x02\x02\u0215\u0219\x07" +
		"_\x02\x02\u0216\u0219\x07`\x02\x02\u0217\u0219\x05\f\x07\x02\u0218\u0214" +
		"\x03\x02\x02\x02\u0218\u0215\x03\x02\x02\x02\u0218\u0216\x03\x02\x02\x02" +
		"\u0218\u0217\x03\x02\x02\x02\u0219E\x03\x02\x02\x02\u021A\u021B\x07S\x02" +
		"\x02\u021B\u021D\x07d\x02\x02\u021C\u021A\x03\x02\x02\x02\u021C\u021D" +
		"\x03\x02\x02\x02\u021D\u0223\x03\x02\x02\x02\u021E\u021F\x05J&\x02\u021F" +
		"\u0220\x07d\x02\x02\u0220\u0222\x03\x02\x02\x02\u0221\u021E\x03\x02\x02" +
		"\x02\u0222\u0225\x03\x02\x02\x02\u0223\u0221\x03\x02\x02\x02\u0223\u0224" +
		"\x03\x02\x02\x02\u0224\u0226\x03\x02\x02\x02\u0225\u0223\x03\x02\x02\x02" +
		"\u0226\u022A\x05J&\x02\u0227\u022A\x07a\x02\x02\u0228\u022A\x07`\x02\x02" +
		"\u0229\u021C\x03\x02\x02\x02\u0229\u0227\x03\x02\x02\x02\u0229\u0228\x03" +
		"\x02\x02\x02\u022AG\x03\x02\x02\x02\u022B\u022C\x07b\x02\x02\u022C\u0233" +
		"\x05F$\x02\u022D\u0234\x05F$\x02\u022E\u0234\x07\x07\x02\x02\u022F\u0231" +
		"\x07(\x02\x02\u0230\u022F\x03\x02\x02\x02\u0230\u0231\x03\x02\x02\x02" +
		"\u0231\u0232\x03\x02\x02\x02\u0232\u0234\x05\x98M\x02\u0233\u022D\x03" +
		"\x02\x02\x02\u0233\u022E\x03\x02\x02\x02\u0233\u0230\x03\x02\x02\x02\u0234" +
		"I\x03\x02\x02\x02\u0235\u0236\x07f\x02\x02\u0236K\x03\x02\x02\x02\u0237" +
		"\u023D\x05J&\x02\u0238\u0239\x05J&\x02\u0239\u023A\x07c\x02\x02\u023A" +
		"\u023B\x05L\'\x02\u023B\u023D\x03\x02\x02\x02\u023C\u0237\x03\x02\x02" +
		"\x02\u023C\u0238\x03\x02\x02\x02\u023DM\x03\x02\x02\x02\u023E\u0244\x05" +
		"F$\x02\u023F\u0240\x05F$\x02\u0240\u0241\x07c\x02\x02\u0241\u0242\x05" +
		"N(\x02\u0242\u0244\x03\x02\x02\x02\u0243\u023E\x03\x02\x02\x02\u0243\u023F" +
		"\x03\x02\x02\x02\u0244O\x03\x02\x02\x02\u0245\u024B\x05\x12\n\x02\u0246" +
		"\u0247\x05\x12\n\x02\u0247\u0248\x07c\x02\x02\u0248\u0249\x05P)\x02\u0249" +
		"\u024B\x03\x02\x02\x02\u024A\u0245\x03\x02\x02\x02\u024A\u0246\x03\x02" +
		"\x02\x02\u024BQ\x03\x02\x02\x02\u024C\u0252\x05\x14\v\x02\u024D\u024E" +
		"\x05\x14\v\x02\u024E\u024F\x07c\x02\x02\u024F\u0250\x05R*\x02\u0250\u0252" +
		"\x03\x02\x02\x02\u0251\u024C\x03\x02\x02\x02\u0251\u024D\x03\x02\x02\x02" +
		"\u0252S\x03\x02\x02\x02\u0253\u0259\x05\x16\f\x02\u0254\u0255\x05\x16" +
		"\f\x02\u0255\u0256\x07c\x02\x02\u0256\u0257\x05T+\x02\u0257\u0259\x03" +
		"\x02\x02\x02\u0258\u0253\x03\x02\x02\x02\u0258\u0254\x03\x02\x02\x02\u0259" +
		"U\x03\x02\x02\x02\u025A\u0260\x05> \x02\u025B\u025C\x05> \x02\u025C\u025D" +
		"\x07c\x02\x02\u025D\u025E\x05V,\x02\u025E\u0260\x03\x02\x02\x02\u025F" +
		"\u025A\x03\x02\x02\x02\u025F\u025B\x03\x02\x02\x02\u0260W\x03\x02\x02" +
		"\x02\u0261\u0267\x05,\x17\x02\u0262\u0263\x05,\x17\x02\u0263\u0264\x07" +
		"c\x02\x02\u0264\u0265\x05X-\x02\u0265\u0267\x03\x02\x02\x02\u0266\u0261" +
		"\x03\x02\x02\x02\u0266\u0262\x03\x02\x02\x02\u0267Y\x03\x02\x02\x02\u0268" +
		"\u026E\x05\\/\x02\u0269\u026A\x05\\/\x02\u026A\u026B\x07c\x02\x02\u026B" +
		"\u026C\x05Z.\x02\u026C\u026E\x03\x02\x02\x02\u026D\u0268\x03\x02\x02\x02" +
		"\u026D\u0269\x03\x02\x02\x02\u026E[\x03\x02\x02\x02\u026F\u0280\x05^0" +
		"\x02\u0270\u0271\x075\x02\x02\u0271\u0272\x05V,\x02\u0272\u0273\x05B\"" +
		"\x02\u0273\u0280\x03\x02\x02\x02\u0274\u0275\x076\x02\x02\u0275\u0276" +
		"\x05V,\x02\u0276\u0277\x05B\"\x02\u0277\u0280\x03\x02\x02\x02\u0278\u027A" +
		"\x05D#\x02\u0279\u027B\x07\x17\x02\x02\u027A\u0279\x03\x02\x02\x02\u027A" +
		"\u027B\x03\x02\x02\x02\u027B\u027C\x03\x02\x02\x02\u027C\u027D\x05R*\x02" +
		"\u027D\u027E\x05B\"\x02\u027E\u0280\x03\x02\x02\x02\u027F\u026F\x03\x02" +
		"\x02\x02\u027F\u0270\x03\x02\x02\x02\u027F\u0274\x03\x02\x02\x02\u027F" +
		"\u0278\x03\x02\x02\x02\u0280]\x03\x02\x02\x02\u0281\u0282\b0\x01\x02\u0282" +
		"\u0283\x05`1\x02\u0283\u0289\x03\x02\x02\x02\u0284\u0285\f\x03\x02\x02" +
		"\u0285\u0286\x077\x02\x02\u0286\u0288\x05`1\x02\u0287\u0284\x03\x02\x02" +
		"\x02\u0288\u028B\x03\x02\x02\x02\u0289\u0287\x03\x02\x02\x02\u0289\u028A" +
		"\x03\x02\x02\x02\u028A_\x03\x02\x02\x02\u028B\u0289\x03\x02\x02\x02\u028C" +
		"\u028D\b1\x01\x02\u028D\u028E\x05b2\x02\u028E\u0294\x03\x02\x02\x02\u028F" +
		"\u0290\f\x03\x02\x02\u0290\u0291\x078\x02\x02\u0291\u0293\x05b2\x02\u0292" +
		"\u028F\x03\x02\x02\x02\u0293\u0296\x03\x02\x02\x02\u0294\u0292\x03\x02" +
		"\x02\x02\u0294\u0295\x03\x02\x02\x02\u0295a\x03\x02\x02\x02\u0296\u0294" +
		"\x03\x02\x02\x02\u0297\u0298\b2\x01\x02\u0298\u0299\x05d3\x02\u0299\u029F" +
		"\x03\x02\x02\x02\u029A\u029B\f\x03\x02\x02\u029B\u029C\x079\x02\x02\u029C" +
		"\u029E\x05d3\x02\u029D\u029A\x03\x02\x02\x02\u029E\u02A1\x03\x02\x02\x02" +
		"\u029F\u029D\x03\x02\x02\x02\u029F\u02A0\x03\x02\x02\x02\u02A0c\x03\x02" +
		"\x02\x02\u02A1\u029F\x03\x02\x02\x02\u02A2\u02AB\x05f4\x02\u02A3\u02A4" +
		"\x05f4\x02\u02A4\u02A5\x07:\x02\x02\u02A5\u02A8\x05d3\x02\u02A6\u02A7" +
		"\x07;\x02\x02\u02A7\u02A9\x05d3\x02\u02A8\u02A6\x03\x02\x02\x02\u02A8" +
		"\u02A9\x03\x02\x02\x02\u02A9\u02AB\x03\x02\x02\x02\u02AA\u02A2\x03\x02" +
		"\x02\x02\u02AA\u02A3\x03\x02\x02\x02\u02ABe\x03\x02\x02\x02\u02AC\u02AD" +
		"\b4\x01\x02\u02AD\u02AE\x05h5\x02\u02AE\u02B4\x03\x02\x02\x02\u02AF\u02B0" +
		"\f\x03\x02\x02\u02B0\u02B1\x07<\x02\x02\u02B1\u02B3\x05h5\x02\u02B2\u02AF" +
		"\x03\x02\x02\x02\u02B3\u02B6\x03\x02\x02\x02\u02B4\u02B2\x03\x02\x02\x02" +
		"\u02B4\u02B5\x03\x02\x02\x02\u02B5g\x03\x02\x02\x02\u02B6\u02B4\x03\x02" +
		"\x02\x02\u02B7\u02C9\x05j6\x02\u02B8\u02B9\x05j6\x02\u02B9\u02BA\x07=" +
		"\x02\x02\u02BA\u02BB\x05j6\x02\u02BB\u02C9\x03\x02\x02\x02\u02BC\u02BD" +
		"\x05j6\x02\u02BD\u02BE\x07>\x02\x02\u02BE\u02BF\x05j6\x02\u02BF\u02C9" +
		"\x03\x02\x02\x02\u02C0\u02C1\x05j6\x02\u02C1\u02C2\x07?\x02\x02\u02C2" +
		"\u02C3\x05j6\x02\u02C3\u02C9\x03\x02\x02\x02\u02C4\u02C5\x05j6\x02\u02C5" +
		"\u02C6\x07@\x02\x02\u02C6\u02C7\x05j6\x02\u02C7\u02C9\x03\x02\x02\x02" +
		"\u02C8\u02B7\x03\x02\x02\x02\u02C8\u02B8\x03\x02\x02\x02\u02C8\u02BC\x03" +
		"\x02\x02\x02\u02C8\u02C0\x03\x02\x02\x02\u02C8\u02C4\x03\x02\x02\x02\u02C9" +
		"i\x03\x02\x02\x02\u02CA\u02DA\x05l7\x02\u02CB\u02CC\x07A\x02\x02\u02CC" +
		"\u02DA\x05j6\x02\u02CD\u02CE\x07B\x02\x02\u02CE\u02DA\x05j6\x02\u02CF" +
		"\u02D0\x07C\x02\x02\u02D0\u02DA\x05j6\x02\u02D1\u02D2\x07D\x02\x02\u02D2" +
		"\u02DA\x05j6\x02\u02D3\u02D4\x07E\x02\x02\u02D4\u02DA\x05j6\x02\u02D5" +
		"\u02D6\x07F\x02\x02\u02D6\u02DA\x05j6\x02\u02D7\u02D8\x07G\x02\x02\u02D8" +
		"\u02DA\x05j6\x02\u02D9\u02CA\x03\x02\x02\x02\u02D9\u02CB\x03\x02\x02\x02" +
		"\u02D9\u02CD\x03\x02\x02\x02\u02D9\u02CF\x03\x02\x02\x02\u02D9\u02D1\x03" +
		"\x02\x02\x02\u02D9\u02D3\x03\x02\x02\x02\u02D9\u02D5\x03\x02\x02\x02\u02D9" +
		"\u02D7\x03\x02\x02\x02\u02DAk\x03\x02\x02\x02\u02DB\u02DC\b7\x01\x02\u02DC" +
		"\u02DD\x05n8\x02\u02DD\u02E7\x03\x02\x02\x02\u02DE\u02E0\f\x03\x02\x02" +
		"\u02DF\u02E1\x07A\x02\x02\u02E0\u02DF\x03\x02\x02\x02\u02E0\u02E1\x03" +
		"\x02\x02\x02\u02E1\u02E2\x03\x02\x02\x02\u02E2\u02E3\x05<\x1F\x02\u02E3" +
		"\u02E4\x05n8\x02\u02E4\u02E6\x03\x02\x02\x02\u02E5\u02DE\x03\x02\x02\x02" +
		"\u02E6\u02E9\x03\x02\x02\x02\u02E7\u02E5\x03\x02\x02\x02\u02E7\u02E8\x03" +
		"\x02\x02\x02\u02E8m\x03\x02\x02\x02\u02E9\u02E7\x03\x02\x02\x02\u02EA" +
		"\u02EE\x05p9\x02\u02EB\u02EC\t\n\x02\x02\u02EC\u02EE\x05p9\x02\u02ED\u02EA" +
		"\x03\x02\x02\x02\u02ED\u02EB\x03\x02\x02\x02\u02EEo\x03\x02\x02\x02\u02EF" +
		"\u02F0\b9\x01\x02\u02F0\u02F1\x05r:\x02\u02F1\u02F7\x03\x02\x02\x02\u02F2" +
		"\u02F3\f\x03\x02\x02\u02F3\u02F4\t\v\x02\x02\u02F4\u02F6\x05t;\x02\u02F5" +
		"\u02F2\x03\x02\x02\x02\u02F6\u02F9\x03\x02\x02\x02\u02F7\u02F5\x03\x02" +
		"\x02\x02\u02F7\u02F8\x03\x02\x02\x02\u02F8q\x03\x02\x02\x02\u02F9\u02F7" +
		"\x03\x02\x02\x02\u02FA\u02FE\x05t;\x02\u02FB\u02FC\x07H\x02\x02\u02FC" +
		"\u02FE\x05r:\x02\u02FD\u02FA\x03\x02\x02\x02\u02FD\u02FB\x03\x02\x02\x02" +
		"\u02FEs\x03\x02\x02\x02\u02FF\u0300\b;\x01\x02\u0300\u0301\x05v<\x02\u0301" +
		"\u0307\x03\x02\x02\x02\u0302\u0303\f\x03\x02\x02\u0303\u0304\x07I\x02" +
		"\x02\u0304\u0306\x05v<\x02\u0305\u0302\x03\x02\x02\x02\u0306\u0309\x03" +
		"\x02\x02\x02\u0307\u0305\x03\x02\x02\x02\u0307\u0308\x03\x02\x02\x02\u0308" +
		"u\x03\x02\x02\x02\u0309\u0307\x03\x02\x02\x02\u030A\u030B\b<\x01\x02\u030B" +
		"\u030C\x05x=\x02\u030C\u0312\x03\x02\x02\x02\u030D\u030E\f\x03\x02\x02" +
		"\u030E\u030F\x07J\x02\x02\u030F\u0311\x05x=\x02\u0310\u030D\x03\x02\x02" +
		"\x02\u0311\u0314\x03\x02\x02\x02\u0312\u0310\x03\x02\x02\x02\u0312\u0313" +
		"\x03\x02\x02\x02\u0313w\x03\x02\x02\x02\u0314\u0312\x03\x02\x02\x02\u0315" +
		"\u0316\b=\x01\x02\u0316\u0317\x05z>\x02\u0317\u031E\x03\x02\x02\x02\u0318" +
		"\u0319\f\x03\x02\x02\u0319\u031A\x05:\x1E\x02\u031A\u031B\x05z>\x02\u031B" +
		"\u031D\x03\x02\x02\x02\u031C\u0318\x03\x02\x02\x02\u031D\u0320\x03\x02" +
		"\x02\x02\u031E\u031C\x03\x02\x02\x02\u031E\u031F\x03\x02\x02\x02\u031F" +
		"y\x03\x02\x02\x02\u0320\u031E\x03\x02\x02\x02\u0321\u0322\b>\x01\x02\u0322" +
		"\u0323\x05|?\x02\u0323\u0329\x03\x02\x02\x02\u0324\u0325\f\x03\x02\x02" +
		"\u0325\u0326\t\f\x02\x02\u0326\u0328\x05|?\x02\u0327\u0324\x03\x02\x02" +
		"\x02\u0328\u032B\x03\x02\x02\x02\u0329\u0327\x03\x02\x02\x02\u0329\u032A" +
		"\x03\x02\x02\x02\u032A{\x03\x02\x02\x02\u032B\u0329\x03\x02\x02\x02\u032C" +
		"\u032D\b?\x01\x02\u032D\u032E\x05~@\x02\u032E\u0336\x03\x02\x02\x02\u032F" +
		"\u0330\f\x03\x02\x02\u0330\u0331\x07\x04\x02\x02\u0331\u0332\x05Z.\x02" +
		"\u0332\u0333\x07\x05\x02\x02\u0333\u0335\x03\x02\x02\x02\u0334\u032F\x03" +
		"\x02\x02\x02\u0335\u0338\x03\x02\x02\x02\u0336\u0334\x03\x02\x02\x02\u0336" +
		"\u0337\x03\x02\x02\x02\u0337}\x03\x02\x02\x02\u0338\u0336\x03\x02\x02" +
		"\x02\u0339\u033A\b@\x01\x02\u033A\u0341\x05\x80A\x02\u033B\u033C\x05J" +
		"&\x02\u033C\u033D\x07\x04\x02\x02\u033D\u033E\x05Z.\x02\u033E\u033F\x07" +
		"\x05\x02\x02\u033F\u0341\x03\x02\x02\x02\u0340\u0339\x03\x02\x02\x02\u0340" +
		"\u033B\x03\x02\x02\x02\u0341\u0347\x03\x02\x02\x02\u0342\u0343\f\x04\x02" +
		"\x02\u0343\u0344\x07\x1B\x02\x02\u0344\u0346\x05\x80A\x02\u0345\u0342" +
		"\x03\x02\x02\x02\u0346\u0349\x03\x02\x02\x02\u0347\u0345\x03\x02\x02\x02" +
		"\u0347\u0348\x03\x02\x02\x02\u0348\x7F\x03\x02\x02\x02\u0349\u0347\x03" +
		"\x02\x02\x02\u034A\u034B\bA\x01\x02\u034B\u034C\x05\x82B\x02\u034C\u0351" +
		"\x03\x02\x02\x02\u034D\u034E\f\x03\x02\x02\u034E\u0350\x07M\x02\x02\u034F" +
		"\u034D\x03\x02\x02\x02\u0350\u0353\x03\x02\x02\x02\u0351\u034F\x03\x02" +
		"\x02\x02\u0351\u0352\x03\x02\x02\x02\u0352\x81\x03\x02\x02\x02\u0353\u0351" +
		"\x03\x02\x02\x02\u0354\u0358\x05\x84C\x02\u0355\u0356\t\r\x02\x02\u0356" +
		"\u0358\x05\x82B\x02\u0357\u0354\x03\x02\x02\x02\u0357\u0355\x03\x02\x02" +
		"\x02\u0358\x83\x03\x02\x02\x02\u0359\u036C\x05.\x18\x02\u035A\u036C\x05" +
		"F$\x02\u035B\u035C\x07Q\x02\x02\u035C\u036C\x05J&\x02\u035D\u035E\x07" +
		"R\x02\x02\u035E\u036C\x05J&\x02\u035F\u036C\x07S\x02\x02\u0360\u0361\x07" +
		"\v\x02\x02\u0361\u0362\x05R*\x02\u0362\u0363\x05B\"\x02\u0363\u0364\x07" +
		"\f\x02\x02\u0364\u036C\x03\x02\x02\x02\u0365\u0366\x07\x1D\x02\x02\u0366" +
		"\u0367\x05\\/\x02\u0367\u0368\x07\x1E\x02\x02\u0368\u036C\x03\x02\x02" +
		"\x02\u0369\u036C\x05@!\x02\u036A\u036C\x05\x8AF\x02\u036B\u0359\x03\x02" +
		"\x02\x02\u036B\u035A\x03\x02\x02\x02\u036B\u035B\x03\x02\x02\x02\u036B" +
		"\u035D\x03\x02\x02\x02\u036B\u035F\x03\x02\x02\x02\u036B\u0360\x03\x02" +
		"\x02\x02\u036B\u0365\x03\x02\x02\x02\u036B\u0369\x03\x02\x02\x02\u036B" +
		"\u036A\x03\x02\x02\x02\u036C\x85\x03\x02\x02\x02\u036D\u0373\x05F$\x02" +
		"\u036E\u036F\x05F$\x02\u036F\u0370\x07X\x02\x02\u0370\u0371\x05\x86D\x02" +
		"\u0371\u0373\x03\x02\x02\x02\u0372\u036D\x03\x02\x02\x02\u0372\u036E\x03" +
		"\x02\x02\x02\u0373\x87\x03\x02\x02\x02\u0374\u0375\x05\x8AF\x02\u0375" +
		"\x89\x03\x02\x02\x02\u0376\u0377\x07T\x02\x02\u0377\x8B\x03\x02\x02\x02" +
		"\u0378\u0379\x07U\x02\x02\u0379\u037A\x05J&\x02\u037A\u037C\x05\x9AN\x02" +
		"\u037B\u037D\x05*\x16\x02\u037C\u037B\x03\x02\x02\x02\u037C\u037D\x03" +
		"\x02\x02\x02\u037D\x8D\x03\x02\x02\x02\u037E\u037F\x05\x16\f\x02\u037F" +
		"\x8F\x03\x02\x02\x02\u0380\u0381\x07V\x02\x02\u0381\u0382\x05\\/\x02\u0382" +
		"\x91\x03\x02\x02\x02\u0383\u0384\x07W\x02\x02\u0384\u0385\x05J&\x02\u0385" +
		"\u0386\x07)\x02\x02\u0386\u0387\x05\\/\x02\u0387\u0388\x07\"\x02\x02\u0388" +
		"\u0389\x05\x9AN\x02\u0389\x93\x03\x02\x02\x02\u038A\u038B\x05J&\x02\u038B" +
		"\u038C\x07\x18\x02\x02\u038C\u038D\x05\x86D\x02\u038D\u038E\x07Y\x02\x02" +
		"\u038E\u038F\x05\\/\x02\u038F\x95\x03\x02\x02\x02\u0390\u0396\x05\x98" +
		"M\x02\u0391\u0392\x05\x98M\x02\u0392\u0393\x07c\x02\x02\u0393\u0394\x05" +
		"\x96L\x02\u0394\u0396\x03\x02\x02\x02\u0395\u0390\x03\x02\x02\x02\u0395" +
		"\u0391\x03\x02\x02\x02\u0396\x97\x03\x02\x02\x02\u0397\u0398\x07e\x02" +
		"\x02\u0398\x99\x03\x02\x02\x02\u0399\u039D\x07\v\x02\x02\u039A\u039C\x05" +
		"\x9EP\x02\u039B\u039A\x03\x02\x02\x02\u039C\u039F\x03\x02\x02\x02\u039D" +
		"\u039B\x03\x02\x02\x02\u039D\u039E\x03\x02\x02\x02\u039E\u03A0\x03\x02" +
		"\x02\x02\u039F\u039D\x03\x02\x02\x02\u03A0\u03A6\x07\f\x02\x02\u03A1\u03A3" +
		"\x07$\x02\x02\u03A2\u03A1\x03\x02\x02\x02\u03A2\u03A3\x03\x02\x02\x02" +
		"\u03A3\u03A4\x03\x02\x02\x02\u03A4\u03A6\x05F$\x02\u03A5\u0399\x03\x02" +
		"\x02\x02\u03A5\u03A2\x03\x02\x02\x02\u03A6\x9B\x03\x02\x02\x02\u03A7\u03A8" +
		"\x07R\x02\x02\u03A8\u03AD\x05J&\x02\u03A9\u03AD\x05\x98M\x02\u03AA\u03AB" +
		"\x07(\x02\x02\u03AB\u03AD\x05\x98M\x02\u03AC\u03A7\x03\x02\x02\x02\u03AC" +
		"\u03A9\x03\x02\x02\x02\u03AC\u03AA\x03\x02\x02\x02\u03AD\x9D\x03\x02\x02" +
		"\x02\u03AE\u03AF\x05\xA0Q\x02\u03AF\u03B0\x05<\x1F\x02\u03B0\u03B1\x05" +
		"\xA2R\x02\u03B1\u03B6\x03\x02\x02\x02\u03B2\u03B3\x07_\x02\x02\u03B3\u03B6" +
		"\x05\xA0Q\x02\u03B4\u03B6\x05F$\x02\u03B5\u03AE\x03\x02\x02\x02\u03B5" +
		"\u03B2\x03\x02\x02\x02\u03B5\u03B4\x03\x02\x02\x02\u03B6\x9F\x03\x02\x02" +
		"\x02\u03B7\u03B8\x07H\x02\x02\u03B8\u03C2\x05F$\x02\u03B9\u03C2\x05F$" +
		"\x02\u03BA\u03BD\x05\x9CO\x02\u03BB\u03BC\x07\x1B\x02\x02\u03BC\u03BE" +
		"\x05F$\x02\u03BD\u03BB\x03\x02\x02\x02\u03BE\u03BF\x03\x02\x02\x02\u03BF" +
		"\u03BD\x03\x02\x02\x02\u03BF\u03C0\x03\x02\x02\x02\u03C0\u03C2\x03\x02" +
		"\x02\x02\u03C1\u03B7\x03\x02\x02\x02\u03C1\u03B9\x03\x02\x02\x02\u03C1" +
		"\u03BA\x03\x02\x02\x02\u03C2\xA1\x03\x02\x02\x02\u03C3\u03C4\bR\x01\x02" +
		"\u03C4\u03CA\x05\xA4S\x02\u03C5\u03C6\x07\x1D\x02\x02\u03C6\u03C7\x05" +
		"\xA2R\x02\u03C7\u03C8\x07\x1E\x02\x02\u03C8\u03CA\x03\x02\x02\x02\u03C9" +
		"\u03C3\x03\x02\x02\x02\u03C9\u03C5\x03\x02\x02\x02\u03CA\u03D0\x03\x02" +
		"\x02\x02\u03CB\u03CC\f\x04\x02\x02\u03CC\u03CD\x07\x0F\x02\x02\u03CD\u03CF" +
		"\x05\xA4S\x02\u03CE\u03CB\x03\x02\x02\x02\u03CF\u03D2\x03\x02\x02\x02" +
		"\u03D0\u03CE\x03\x02\x02\x02\u03D0\u03D1\x03\x02\x02\x02\u03D1\xA3\x03" +
		"\x02\x02\x02\u03D2\u03D0\x03\x02\x02\x02\u03D3\u03D4\bS\x01\x02\u03D4" +
		"\u03D5\x07\x1D\x02\x02\u03D5\u03D6\x05\xA4S\x02\u03D6\u03D7\x07\x1E\x02" +
		"\x02\u03D7\u03DA\x03\x02\x02\x02\u03D8\u03DA\x05\xA6T\x02\u03D9\u03D3" +
		"\x03\x02\x02\x02\u03D9\u03D8\x03\x02\x02\x02\u03DA\u03E0\x03\x02\x02\x02" +
		"\u03DB\u03DC\f\x04\x02\x02\u03DC\u03DD\t\x0E\x02\x02\u03DD\u03DF\x05\xA6" +
		"T\x02\u03DE\u03DB\x03\x02\x02\x02\u03DF\u03E2\x03\x02\x02\x02\u03E0\u03DE" +
		"\x03\x02\x02\x02\u03E0\u03E1\x03\x02\x02\x02\u03E1\xA5\x03\x02\x02\x02" +
		"\u03E2\u03E0\x03\x02\x02\x02\u03E3\u03EA\x05\x9CO\x02\u03E4\u03EA\x05" +
		"F$\x02\u03E5\u03E6\x07\x1D\x02\x02\u03E6\u03E7\x05\xA2R\x02\u03E7\u03E8" +
		"\x07\x1E\x02\x02\u03E8\u03EA\x03\x02\x02\x02\u03E9\u03E3\x03\x02\x02\x02" +
		"\u03E9\u03E4\x03\x02\x02\x02\u03E9\u03E5\x03\x02\x02\x02\u03EA\xA7\x03" +
		"\x02\x02\x02w\xAB\xB1\xB7\xBA\xC2\xC6\xCC\xCE\xE0\xE3\xE6\xE9\xEE\xF2" +
		"\xF6\u0100\u0103\u010C\u0111\u0116\u011B\u0120\u012B\u0130\u0134\u013C" +
		"\u0140\u0144\u014D\u0152\u0155\u0159\u0160\u0165\u0168\u016C\u0171\u0175" +
		"\u0178\u017C\u0182\u0186\u018E\u0197\u019B\u019E\u01A7\u01AA\u01B1\u01B5" +
		"\u01BE\u01C2\u01C7\u01D0\u01DA\u01DD\u01E1\u01EB\u01F5\u01F9\u01FE\u020A" +
		"\u0212\u0218\u021C\u0223\u0229\u0230\u0233\u023C\u0243\u024A\u0251\u0258" +
		"\u025F\u0266\u026D\u027A\u027F\u0289\u0294\u029F\u02A8\u02AA\u02B4\u02C8" +
		"\u02D9\u02E0\u02E7\u02ED\u02F7\u02FD\u0307\u0312\u031E\u0329\u0336\u0340" +
		"\u0347\u0351\u0357\u036B\u0372\u037C\u0395\u039D\u03A2\u03A5\u03AC\u03B5" +
		"\u03BF\u03C1\u03C9\u03D0\u03D9\u03E0\u03E9";
	public static readonly _serializedATN: string = Utils.join(
		[
			ForgeParserParser._serializedATNSegment0,
			ForgeParserParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ForgeParserParser.__ATN) {
			ForgeParserParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ForgeParserParser._serializedATN));
		}

		return ForgeParserParser.__ATN;
	}

}

export class AlloyModuleContext extends ParserRuleContext {
	public importDecl(): ImportDeclContext[];
	public importDecl(i: number): ImportDeclContext;
	public importDecl(i?: number): ImportDeclContext | ImportDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDeclContext);
		} else {
			return this.getRuleContext(i, ImportDeclContext);
		}
	}
	public paragraph(): ParagraphContext[];
	public paragraph(i: number): ParagraphContext;
	public paragraph(i?: number): ParagraphContext | ParagraphContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParagraphContext);
		} else {
			return this.getRuleContext(i, ParagraphContext);
		}
	}
	public evalDecl(): EvalDeclContext[];
	public evalDecl(i: number): EvalDeclContext;
	public evalDecl(i?: number): EvalDeclContext | EvalDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EvalDeclContext);
		} else {
			return this.getRuleContext(i, EvalDeclContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_alloyModule; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterAlloyModule) {
			listener.enterAlloyModule(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitAlloyModule) {
			listener.exitAlloyModule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitAlloyModule) {
			return visitor.visitAlloyModule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportDeclContext extends ParserRuleContext {
	public OPEN_TOK(): TerminalNode { return this.getToken(ForgeParserParser.OPEN_TOK, 0); }
	public qualName(): QualNameContext | undefined {
		return this.tryGetRuleContext(0, QualNameContext);
	}
	public LEFT_SQUARE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEFT_SQUARE_TOK, 0); }
	public qualNameList(): QualNameListContext | undefined {
		return this.tryGetRuleContext(0, QualNameListContext);
	}
	public RIGHT_SQUARE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RIGHT_SQUARE_TOK, 0); }
	public AS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.AS_TOK, 0); }
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	public FILE_PATH_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.FILE_PATH_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_importDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterImportDecl) {
			listener.enterImportDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitImportDecl) {
			listener.exitImportDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitImportDecl) {
			return visitor.visitImportDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParagraphContext extends ParserRuleContext {
	public sigDecl(): SigDeclContext | undefined {
		return this.tryGetRuleContext(0, SigDeclContext);
	}
	public predDecl(): PredDeclContext | undefined {
		return this.tryGetRuleContext(0, PredDeclContext);
	}
	public funDecl(): FunDeclContext | undefined {
		return this.tryGetRuleContext(0, FunDeclContext);
	}
	public assertDecl(): AssertDeclContext | undefined {
		return this.tryGetRuleContext(0, AssertDeclContext);
	}
	public cmdDecl(): CmdDeclContext | undefined {
		return this.tryGetRuleContext(0, CmdDeclContext);
	}
	public testExpectDecl(): TestExpectDeclContext | undefined {
		return this.tryGetRuleContext(0, TestExpectDeclContext);
	}
	public sexprDecl(): SexprDeclContext | undefined {
		return this.tryGetRuleContext(0, SexprDeclContext);
	}
	public queryDecl(): QueryDeclContext | undefined {
		return this.tryGetRuleContext(0, QueryDeclContext);
	}
	public evalRelDecl(): EvalRelDeclContext | undefined {
		return this.tryGetRuleContext(0, EvalRelDeclContext);
	}
	public optionDecl(): OptionDeclContext | undefined {
		return this.tryGetRuleContext(0, OptionDeclContext);
	}
	public instDecl(): InstDeclContext | undefined {
		return this.tryGetRuleContext(0, InstDeclContext);
	}
	public exampleDecl(): ExampleDeclContext | undefined {
		return this.tryGetRuleContext(0, ExampleDeclContext);
	}
	public propertyDecl(): PropertyDeclContext | undefined {
		return this.tryGetRuleContext(0, PropertyDeclContext);
	}
	public quantifiedPropertyDecl(): QuantifiedPropertyDeclContext | undefined {
		return this.tryGetRuleContext(0, QuantifiedPropertyDeclContext);
	}
	public satisfiabilityDecl(): SatisfiabilityDeclContext | undefined {
		return this.tryGetRuleContext(0, SatisfiabilityDeclContext);
	}
	public testSuiteDecl(): TestSuiteDeclContext | undefined {
		return this.tryGetRuleContext(0, TestSuiteDeclContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_paragraph; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterParagraph) {
			listener.enterParagraph(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitParagraph) {
			listener.exitParagraph(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitParagraph) {
			return visitor.visitParagraph(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SigDeclContext extends ParserRuleContext {
	public SIG_TOK(): TerminalNode { return this.getToken(ForgeParserParser.SIG_TOK, 0); }
	public nameList(): NameListContext {
		return this.getRuleContext(0, NameListContext);
	}
	public LEFT_CURLY_TOK(): TerminalNode { return this.getToken(ForgeParserParser.LEFT_CURLY_TOK, 0); }
	public RIGHT_CURLY_TOK(): TerminalNode { return this.getToken(ForgeParserParser.RIGHT_CURLY_TOK, 0); }
	public VAR_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.VAR_TOK, 0); }
	public ABSTRACT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.ABSTRACT_TOK, 0); }
	public mult(): MultContext | undefined {
		return this.tryGetRuleContext(0, MultContext);
	}
	public sigExt(): SigExtContext | undefined {
		return this.tryGetRuleContext(0, SigExtContext);
	}
	public arrowDeclList(): ArrowDeclListContext | undefined {
		return this.tryGetRuleContext(0, ArrowDeclListContext);
	}
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_sigDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterSigDecl) {
			listener.enterSigDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitSigDecl) {
			listener.exitSigDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitSigDecl) {
			return visitor.visitSigDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SigExtContext extends ParserRuleContext {
	public EXTENDS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.EXTENDS_TOK, 0); }
	public qualName(): QualNameContext[];
	public qualName(i: number): QualNameContext;
	public qualName(i?: number): QualNameContext | QualNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QualNameContext);
		} else {
			return this.getRuleContext(i, QualNameContext);
		}
	}
	public IN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.IN_TOK, 0); }
	public PLUS_TOK(): TerminalNode[];
	public PLUS_TOK(i: number): TerminalNode;
	public PLUS_TOK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ForgeParserParser.PLUS_TOK);
		} else {
			return this.getToken(ForgeParserParser.PLUS_TOK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_sigExt; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterSigExt) {
			listener.enterSigExt(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitSigExt) {
			listener.exitSigExt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitSigExt) {
			return visitor.visitSigExt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultContext extends ParserRuleContext {
	public LONE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LONE_TOK, 0); }
	public SOME_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SOME_TOK, 0); }
	public ONE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.ONE_TOK, 0); }
	public TWO_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.TWO_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_mult; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterMult) {
			listener.enterMult(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitMult) {
			listener.exitMult(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitMult) {
			return visitor.visitMult(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrowMultContext extends ParserRuleContext {
	public LONE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LONE_TOK, 0); }
	public SET_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SET_TOK, 0); }
	public ONE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.ONE_TOK, 0); }
	public TWO_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.TWO_TOK, 0); }
	public FUNC_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.FUNC_TOK, 0); }
	public PFUNC_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.PFUNC_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_arrowMult; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterArrowMult) {
			listener.enterArrowMult(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitArrowMult) {
			listener.exitArrowMult(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitArrowMult) {
			return visitor.visitArrowMult(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class HelperMultContext extends ParserRuleContext {
	public LONE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LONE_TOK, 0); }
	public SET_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SET_TOK, 0); }
	public ONE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.ONE_TOK, 0); }
	public FUNC_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.FUNC_TOK, 0); }
	public PFUNC_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.PFUNC_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_helperMult; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterHelperMult) {
			listener.enterHelperMult(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitHelperMult) {
			listener.exitHelperMult(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitHelperMult) {
			return visitor.visitHelperMult(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParaDeclContext extends ParserRuleContext {
	public nameList(): NameListContext {
		return this.getRuleContext(0, NameListContext);
	}
	public COLON_TOK(): TerminalNode { return this.getToken(ForgeParserParser.COLON_TOK, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public DISJ_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.DISJ_TOK, 0); }
	public helperMult(): HelperMultContext | undefined {
		return this.tryGetRuleContext(0, HelperMultContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_paraDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterParaDecl) {
			listener.enterParaDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitParaDecl) {
			listener.exitParaDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitParaDecl) {
			return visitor.visitParaDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QuantDeclContext extends ParserRuleContext {
	public nameList(): NameListContext {
		return this.getRuleContext(0, NameListContext);
	}
	public COLON_TOK(): TerminalNode { return this.getToken(ForgeParserParser.COLON_TOK, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public DISJ_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.DISJ_TOK, 0); }
	public SET_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SET_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_quantDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterQuantDecl) {
			listener.enterQuantDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitQuantDecl) {
			listener.exitQuantDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitQuantDecl) {
			return visitor.visitQuantDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrowDeclContext extends ParserRuleContext {
	public nameList(): NameListContext {
		return this.getRuleContext(0, NameListContext);
	}
	public COLON_TOK(): TerminalNode { return this.getToken(ForgeParserParser.COLON_TOK, 0); }
	public arrowMult(): ArrowMultContext {
		return this.getRuleContext(0, ArrowMultContext);
	}
	public arrowExpr(): ArrowExprContext {
		return this.getRuleContext(0, ArrowExprContext);
	}
	public VAR_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.VAR_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_arrowDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterArrowDecl) {
			listener.enterArrowDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitArrowDecl) {
			listener.exitArrowDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitArrowDecl) {
			return visitor.visitArrowDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PredTypeContext extends ParserRuleContext {
	public WHEAT_TOK(): TerminalNode { return this.getToken(ForgeParserParser.WHEAT_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_predType; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterPredType) {
			listener.enterPredType(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitPredType) {
			listener.exitPredType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitPredType) {
			return visitor.visitPredType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PredDeclContext extends ParserRuleContext {
	public PRED_TOK(): TerminalNode { return this.getToken(ForgeParserParser.PRED_TOK, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public predType(): PredTypeContext | undefined {
		return this.tryGetRuleContext(0, PredTypeContext);
	}
	public qualName(): QualNameContext | undefined {
		return this.tryGetRuleContext(0, QualNameContext);
	}
	public DOT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.DOT_TOK, 0); }
	public paraDecls(): ParaDeclsContext | undefined {
		return this.tryGetRuleContext(0, ParaDeclsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_predDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterPredDecl) {
			listener.enterPredDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitPredDecl) {
			listener.exitPredDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitPredDecl) {
			return visitor.visitPredDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunDeclContext extends ParserRuleContext {
	public FUN_TOK(): TerminalNode { return this.getToken(ForgeParserParser.FUN_TOK, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public COLON_TOK(): TerminalNode { return this.getToken(ForgeParserParser.COLON_TOK, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LEFT_CURLY_TOK(): TerminalNode { return this.getToken(ForgeParserParser.LEFT_CURLY_TOK, 0); }
	public RIGHT_CURLY_TOK(): TerminalNode { return this.getToken(ForgeParserParser.RIGHT_CURLY_TOK, 0); }
	public qualName(): QualNameContext | undefined {
		return this.tryGetRuleContext(0, QualNameContext);
	}
	public DOT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.DOT_TOK, 0); }
	public paraDecls(): ParaDeclsContext | undefined {
		return this.tryGetRuleContext(0, ParaDeclsContext);
	}
	public helperMult(): HelperMultContext | undefined {
		return this.tryGetRuleContext(0, HelperMultContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_funDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterFunDecl) {
			listener.enterFunDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitFunDecl) {
			listener.exitFunDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitFunDecl) {
			return visitor.visitFunDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParaDeclsContext extends ParserRuleContext {
	public LEFT_PAREN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEFT_PAREN_TOK, 0); }
	public RIGHT_PAREN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RIGHT_PAREN_TOK, 0); }
	public paraDeclList(): ParaDeclListContext | undefined {
		return this.tryGetRuleContext(0, ParaDeclListContext);
	}
	public LEFT_SQUARE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEFT_SQUARE_TOK, 0); }
	public RIGHT_SQUARE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RIGHT_SQUARE_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_paraDecls; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterParaDecls) {
			listener.enterParaDecls(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitParaDecls) {
			listener.exitParaDecls(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitParaDecls) {
			return visitor.visitParaDecls(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssertDeclContext extends ParserRuleContext {
	public ASSERT_TOK(): TerminalNode { return this.getToken(ForgeParserParser.ASSERT_TOK, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_assertDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterAssertDecl) {
			listener.enterAssertDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitAssertDecl) {
			listener.exitAssertDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitAssertDecl) {
			return visitor.visitAssertDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CmdDeclContext extends ParserRuleContext {
	public RUN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RUN_TOK, 0); }
	public CHECK_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.CHECK_TOK, 0); }
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	public COLON_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COLON_TOK, 0); }
	public qualName(): QualNameContext | undefined {
		return this.tryGetRuleContext(0, QualNameContext);
	}
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public scope(): ScopeContext | undefined {
		return this.tryGetRuleContext(0, ScopeContext);
	}
	public FOR_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.FOR_TOK, 0); }
	public bounds(): BoundsContext | undefined {
		return this.tryGetRuleContext(0, BoundsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_cmdDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterCmdDecl) {
			listener.enterCmdDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitCmdDecl) {
			listener.exitCmdDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitCmdDecl) {
			return visitor.visitCmdDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TestDeclContext extends ParserRuleContext {
	public IS_TOK(): TerminalNode { return this.getToken(ForgeParserParser.IS_TOK, 0); }
	public SAT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SAT_TOK, 0); }
	public UNSAT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.UNSAT_TOK, 0); }
	public THEOREM_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.THEOREM_TOK, 0); }
	public FORGE_ERROR_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.FORGE_ERROR_TOK, 0); }
	public qualName(): QualNameContext | undefined {
		return this.tryGetRuleContext(0, QualNameContext);
	}
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	public COLON_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COLON_TOK, 0); }
	public scope(): ScopeContext | undefined {
		return this.tryGetRuleContext(0, ScopeContext);
	}
	public FOR_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.FOR_TOK, 0); }
	public bounds(): BoundsContext | undefined {
		return this.tryGetRuleContext(0, BoundsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_testDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterTestDecl) {
			listener.enterTestDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitTestDecl) {
			listener.exitTestDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitTestDecl) {
			return visitor.visitTestDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TestExpectDeclContext extends ParserRuleContext {
	public EXPECT_TOK(): TerminalNode { return this.getToken(ForgeParserParser.EXPECT_TOK, 0); }
	public testBlock(): TestBlockContext {
		return this.getRuleContext(0, TestBlockContext);
	}
	public TEST_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.TEST_TOK, 0); }
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_testExpectDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterTestExpectDecl) {
			listener.enterTestExpectDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitTestExpectDecl) {
			listener.exitTestExpectDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitTestExpectDecl) {
			return visitor.visitTestExpectDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TestBlockContext extends ParserRuleContext {
	public LEFT_CURLY_TOK(): TerminalNode { return this.getToken(ForgeParserParser.LEFT_CURLY_TOK, 0); }
	public RIGHT_CURLY_TOK(): TerminalNode { return this.getToken(ForgeParserParser.RIGHT_CURLY_TOK, 0); }
	public testDecl(): TestDeclContext[];
	public testDecl(i: number): TestDeclContext;
	public testDecl(i?: number): TestDeclContext | TestDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TestDeclContext);
		} else {
			return this.getRuleContext(i, TestDeclContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_testBlock; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterTestBlock) {
			listener.enterTestBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitTestBlock) {
			listener.exitTestBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitTestBlock) {
			return visitor.visitTestBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScopeContext extends ParserRuleContext {
	public FOR_TOK(): TerminalNode { return this.getToken(ForgeParserParser.FOR_TOK, 0); }
	public number(): NumberContext | undefined {
		return this.tryGetRuleContext(0, NumberContext);
	}
	public BUT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.BUT_TOK, 0); }
	public typescopeList(): TypescopeListContext | undefined {
		return this.tryGetRuleContext(0, TypescopeListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_scope; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterScope) {
			listener.enterScope(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitScope) {
			listener.exitScope(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitScope) {
			return visitor.visitScope(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypescopeContext extends ParserRuleContext {
	public number(): NumberContext {
		return this.getRuleContext(0, NumberContext);
	}
	public qualName(): QualNameContext {
		return this.getRuleContext(0, QualNameContext);
	}
	public EXACTLY_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.EXACTLY_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_typescope; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterTypescope) {
			listener.enterTypescope(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitTypescope) {
			listener.exitTypescope(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitTypescope) {
			return visitor.visitTypescope(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstContext extends ParserRuleContext {
	public NONE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.NONE_TOK, 0); }
	public UNIV_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.UNIV_TOK, 0); }
	public IDEN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.IDEN_TOK, 0); }
	public number(): NumberContext | undefined {
		return this.tryGetRuleContext(0, NumberContext);
	}
	public MINUS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.MINUS_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_const; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterConst) {
			listener.enterConst(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitConst) {
			listener.exitConst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitConst) {
			return visitor.visitConst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SatisfiabilityDeclContext extends ParserRuleContext {
	public ASSERT_TOK(): TerminalNode { return this.getToken(ForgeParserParser.ASSERT_TOK, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public IS_TOK(): TerminalNode { return this.getToken(ForgeParserParser.IS_TOK, 0); }
	public SAT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SAT_TOK, 0); }
	public UNSAT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.UNSAT_TOK, 0); }
	public FORGE_ERROR_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.FORGE_ERROR_TOK, 0); }
	public scope(): ScopeContext | undefined {
		return this.tryGetRuleContext(0, ScopeContext);
	}
	public FOR_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.FOR_TOK, 0); }
	public bounds(): BoundsContext | undefined {
		return this.tryGetRuleContext(0, BoundsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_satisfiabilityDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterSatisfiabilityDecl) {
			listener.enterSatisfiabilityDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitSatisfiabilityDecl) {
			listener.exitSatisfiabilityDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitSatisfiabilityDecl) {
			return visitor.visitSatisfiabilityDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyDeclContext extends ParserRuleContext {
	public ASSERT_TOK(): TerminalNode { return this.getToken(ForgeParserParser.ASSERT_TOK, 0); }
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public IS_TOK(): TerminalNode { return this.getToken(ForgeParserParser.IS_TOK, 0); }
	public FOR_TOK(): TerminalNode[];
	public FOR_TOK(i: number): TerminalNode;
	public FOR_TOK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ForgeParserParser.FOR_TOK);
		} else {
			return this.getToken(ForgeParserParser.FOR_TOK, i);
		}
	}
	public SUFFICIENT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SUFFICIENT_TOK, 0); }
	public NECESSARY_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.NECESSARY_TOK, 0); }
	public scope(): ScopeContext | undefined {
		return this.tryGetRuleContext(0, ScopeContext);
	}
	public bounds(): BoundsContext | undefined {
		return this.tryGetRuleContext(0, BoundsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_propertyDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterPropertyDecl) {
			listener.enterPropertyDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitPropertyDecl) {
			listener.exitPropertyDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitPropertyDecl) {
			return visitor.visitPropertyDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QuantifiedPropertyDeclContext extends ParserRuleContext {
	public ASSERT_TOK(): TerminalNode { return this.getToken(ForgeParserParser.ASSERT_TOK, 0); }
	public ALL_TOK(): TerminalNode { return this.getToken(ForgeParserParser.ALL_TOK, 0); }
	public quantDeclList(): QuantDeclListContext {
		return this.getRuleContext(0, QuantDeclListContext);
	}
	public BAR_TOK(): TerminalNode { return this.getToken(ForgeParserParser.BAR_TOK, 0); }
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public IS_TOK(): TerminalNode { return this.getToken(ForgeParserParser.IS_TOK, 0); }
	public FOR_TOK(): TerminalNode[];
	public FOR_TOK(i: number): TerminalNode;
	public FOR_TOK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ForgeParserParser.FOR_TOK);
		} else {
			return this.getToken(ForgeParserParser.FOR_TOK, i);
		}
	}
	public SUFFICIENT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SUFFICIENT_TOK, 0); }
	public NECESSARY_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.NECESSARY_TOK, 0); }
	public DISJ_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.DISJ_TOK, 0); }
	public LEFT_SQUARE_TOK(): TerminalNode[];
	public LEFT_SQUARE_TOK(i: number): TerminalNode;
	public LEFT_SQUARE_TOK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ForgeParserParser.LEFT_SQUARE_TOK);
		} else {
			return this.getToken(ForgeParserParser.LEFT_SQUARE_TOK, i);
		}
	}
	public exprList(): ExprListContext[];
	public exprList(i: number): ExprListContext;
	public exprList(i?: number): ExprListContext | ExprListContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprListContext);
		} else {
			return this.getRuleContext(i, ExprListContext);
		}
	}
	public RIGHT_SQUARE_TOK(): TerminalNode[];
	public RIGHT_SQUARE_TOK(i: number): TerminalNode;
	public RIGHT_SQUARE_TOK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ForgeParserParser.RIGHT_SQUARE_TOK);
		} else {
			return this.getToken(ForgeParserParser.RIGHT_SQUARE_TOK, i);
		}
	}
	public scope(): ScopeContext | undefined {
		return this.tryGetRuleContext(0, ScopeContext);
	}
	public bounds(): BoundsContext | undefined {
		return this.tryGetRuleContext(0, BoundsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_quantifiedPropertyDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterQuantifiedPropertyDecl) {
			listener.enterQuantifiedPropertyDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitQuantifiedPropertyDecl) {
			listener.exitQuantifiedPropertyDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitQuantifiedPropertyDecl) {
			return visitor.visitQuantifiedPropertyDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TestSuiteDeclContext extends ParserRuleContext {
	public TEST_TOK(): TerminalNode { return this.getToken(ForgeParserParser.TEST_TOK, 0); }
	public SUITE_TOK(): TerminalNode { return this.getToken(ForgeParserParser.SUITE_TOK, 0); }
	public FOR_TOK(): TerminalNode { return this.getToken(ForgeParserParser.FOR_TOK, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public LEFT_CURLY_TOK(): TerminalNode { return this.getToken(ForgeParserParser.LEFT_CURLY_TOK, 0); }
	public RIGHT_CURLY_TOK(): TerminalNode { return this.getToken(ForgeParserParser.RIGHT_CURLY_TOK, 0); }
	public testConstruct(): TestConstructContext[];
	public testConstruct(i: number): TestConstructContext;
	public testConstruct(i?: number): TestConstructContext | TestConstructContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TestConstructContext);
		} else {
			return this.getRuleContext(i, TestConstructContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_testSuiteDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterTestSuiteDecl) {
			listener.enterTestSuiteDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitTestSuiteDecl) {
			listener.exitTestSuiteDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitTestSuiteDecl) {
			return visitor.visitTestSuiteDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TestConstructContext extends ParserRuleContext {
	public exampleDecl(): ExampleDeclContext | undefined {
		return this.tryGetRuleContext(0, ExampleDeclContext);
	}
	public testExpectDecl(): TestExpectDeclContext | undefined {
		return this.tryGetRuleContext(0, TestExpectDeclContext);
	}
	public propertyDecl(): PropertyDeclContext | undefined {
		return this.tryGetRuleContext(0, PropertyDeclContext);
	}
	public quantifiedPropertyDecl(): QuantifiedPropertyDeclContext | undefined {
		return this.tryGetRuleContext(0, QuantifiedPropertyDeclContext);
	}
	public satisfiabilityDecl(): SatisfiabilityDeclContext | undefined {
		return this.tryGetRuleContext(0, SatisfiabilityDeclContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_testConstruct; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterTestConstruct) {
			listener.enterTestConstruct(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitTestConstruct) {
			listener.exitTestConstruct(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitTestConstruct) {
			return visitor.visitTestConstruct(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrowOpContext extends ParserRuleContext {
	public ARROW_TOK(): TerminalNode { return this.getToken(ForgeParserParser.ARROW_TOK, 0); }
	public mult(): MultContext[];
	public mult(i: number): MultContext;
	public mult(i?: number): MultContext | MultContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MultContext);
		} else {
			return this.getRuleContext(i, MultContext);
		}
	}
	public SET_TOK(): TerminalNode[];
	public SET_TOK(i: number): TerminalNode;
	public SET_TOK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ForgeParserParser.SET_TOK);
		} else {
			return this.getToken(ForgeParserParser.SET_TOK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_arrowOp; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterArrowOp) {
			listener.enterArrowOp(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitArrowOp) {
			listener.exitArrowOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitArrowOp) {
			return visitor.visitArrowOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompareOpContext extends ParserRuleContext {
	public IN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.IN_TOK, 0); }
	public EQ_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.EQ_TOK, 0); }
	public LT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LT_TOK, 0); }
	public GT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.GT_TOK, 0); }
	public LEQ_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEQ_TOK, 0); }
	public GEQ_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.GEQ_TOK, 0); }
	public IS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.IS_TOK, 0); }
	public NI_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.NI_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_compareOp; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterCompareOp) {
			listener.enterCompareOp(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitCompareOp) {
			listener.exitCompareOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitCompareOp) {
			return visitor.visitCompareOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LetDeclContext extends ParserRuleContext {
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public EQ_TOK(): TerminalNode { return this.getToken(ForgeParserParser.EQ_TOK, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_letDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterLetDecl) {
			listener.enterLetDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitLetDecl) {
			listener.exitLetDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitLetDecl) {
			return visitor.visitLetDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	public LEFT_CURLY_TOK(): TerminalNode { return this.getToken(ForgeParserParser.LEFT_CURLY_TOK, 0); }
	public RIGHT_CURLY_TOK(): TerminalNode { return this.getToken(ForgeParserParser.RIGHT_CURLY_TOK, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_block; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterBlock) {
			listener.enterBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitBlock) {
			listener.exitBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockOrBarContext extends ParserRuleContext {
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public BAR_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.BAR_TOK, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_blockOrBar; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterBlockOrBar) {
			listener.enterBlockOrBar(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitBlockOrBar) {
			listener.exitBlockOrBar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitBlockOrBar) {
			return visitor.visitBlockOrBar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QuantContext extends ParserRuleContext {
	public ALL_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.ALL_TOK, 0); }
	public NO_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.NO_TOK, 0); }
	public SUM_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SUM_TOK, 0); }
	public mult(): MultContext | undefined {
		return this.tryGetRuleContext(0, MultContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_quant; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterQuant) {
			listener.enterQuant(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitQuant) {
			listener.exitQuant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitQuant) {
			return visitor.visitQuant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualNameContext extends ParserRuleContext {
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	public THIS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.THIS_TOK, 0); }
	public SLASH_TOK(): TerminalNode[];
	public SLASH_TOK(i: number): TerminalNode;
	public SLASH_TOK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ForgeParserParser.SLASH_TOK);
		} else {
			return this.getToken(ForgeParserParser.SLASH_TOK, i);
		}
	}
	public INT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.INT_TOK, 0); }
	public SUM_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SUM_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_qualName; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterQualName) {
			listener.enterQualName(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitQualName) {
			listener.exitQualName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitQualName) {
			return visitor.visitQualName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptionDeclContext extends ParserRuleContext {
	public OPTION_TOK(): TerminalNode { return this.getToken(ForgeParserParser.OPTION_TOK, 0); }
	public qualName(): QualNameContext[];
	public qualName(i: number): QualNameContext;
	public qualName(i?: number): QualNameContext | QualNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QualNameContext);
		} else {
			return this.getRuleContext(i, QualNameContext);
		}
	}
	public FILE_PATH_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.FILE_PATH_TOK, 0); }
	public number(): NumberContext | undefined {
		return this.tryGetRuleContext(0, NumberContext);
	}
	public MINUS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.MINUS_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_optionDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterOptionDecl) {
			listener.enterOptionDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitOptionDecl) {
			listener.exitOptionDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitOptionDecl) {
			return visitor.visitOptionDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NameContext extends ParserRuleContext {
	public IDENTIFIER_TOK(): TerminalNode { return this.getToken(ForgeParserParser.IDENTIFIER_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_name; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterName) {
			listener.enterName(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitName) {
			listener.exitName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitName) {
			return visitor.visitName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NameListContext extends ParserRuleContext {
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public COMMA_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COMMA_TOK, 0); }
	public nameList(): NameListContext | undefined {
		return this.tryGetRuleContext(0, NameListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_nameList; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterNameList) {
			listener.enterNameList(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitNameList) {
			listener.exitNameList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitNameList) {
			return visitor.visitNameList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualNameListContext extends ParserRuleContext {
	public qualName(): QualNameContext {
		return this.getRuleContext(0, QualNameContext);
	}
	public COMMA_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COMMA_TOK, 0); }
	public qualNameList(): QualNameListContext | undefined {
		return this.tryGetRuleContext(0, QualNameListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_qualNameList; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterQualNameList) {
			listener.enterQualNameList(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitQualNameList) {
			listener.exitQualNameList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitQualNameList) {
			return visitor.visitQualNameList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParaDeclListContext extends ParserRuleContext {
	public paraDecl(): ParaDeclContext {
		return this.getRuleContext(0, ParaDeclContext);
	}
	public COMMA_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COMMA_TOK, 0); }
	public paraDeclList(): ParaDeclListContext | undefined {
		return this.tryGetRuleContext(0, ParaDeclListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_paraDeclList; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterParaDeclList) {
			listener.enterParaDeclList(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitParaDeclList) {
			listener.exitParaDeclList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitParaDeclList) {
			return visitor.visitParaDeclList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QuantDeclListContext extends ParserRuleContext {
	public quantDecl(): QuantDeclContext {
		return this.getRuleContext(0, QuantDeclContext);
	}
	public COMMA_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COMMA_TOK, 0); }
	public quantDeclList(): QuantDeclListContext | undefined {
		return this.tryGetRuleContext(0, QuantDeclListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_quantDeclList; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterQuantDeclList) {
			listener.enterQuantDeclList(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitQuantDeclList) {
			listener.exitQuantDeclList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitQuantDeclList) {
			return visitor.visitQuantDeclList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrowDeclListContext extends ParserRuleContext {
	public arrowDecl(): ArrowDeclContext {
		return this.getRuleContext(0, ArrowDeclContext);
	}
	public COMMA_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COMMA_TOK, 0); }
	public arrowDeclList(): ArrowDeclListContext | undefined {
		return this.tryGetRuleContext(0, ArrowDeclListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_arrowDeclList; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterArrowDeclList) {
			listener.enterArrowDeclList(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitArrowDeclList) {
			listener.exitArrowDeclList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitArrowDeclList) {
			return visitor.visitArrowDeclList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LetDeclListContext extends ParserRuleContext {
	public letDecl(): LetDeclContext {
		return this.getRuleContext(0, LetDeclContext);
	}
	public COMMA_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COMMA_TOK, 0); }
	public letDeclList(): LetDeclListContext | undefined {
		return this.tryGetRuleContext(0, LetDeclListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_letDeclList; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterLetDeclList) {
			listener.enterLetDeclList(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitLetDeclList) {
			listener.exitLetDeclList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitLetDeclList) {
			return visitor.visitLetDeclList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypescopeListContext extends ParserRuleContext {
	public typescope(): TypescopeContext {
		return this.getRuleContext(0, TypescopeContext);
	}
	public COMMA_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COMMA_TOK, 0); }
	public typescopeList(): TypescopeListContext | undefined {
		return this.tryGetRuleContext(0, TypescopeListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_typescopeList; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterTypescopeList) {
			listener.enterTypescopeList(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitTypescopeList) {
			listener.exitTypescopeList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitTypescopeList) {
			return visitor.visitTypescopeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprListContext extends ParserRuleContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public COMMA_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COMMA_TOK, 0); }
	public exprList(): ExprListContext | undefined {
		return this.tryGetRuleContext(0, ExprListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_exprList; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExprList) {
			listener.enterExprList(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExprList) {
			listener.exitExprList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExprList) {
			return visitor.visitExprList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	public expr1(): Expr1Context | undefined {
		return this.tryGetRuleContext(0, Expr1Context);
	}
	public LET_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LET_TOK, 0); }
	public letDeclList(): LetDeclListContext | undefined {
		return this.tryGetRuleContext(0, LetDeclListContext);
	}
	public blockOrBar(): BlockOrBarContext | undefined {
		return this.tryGetRuleContext(0, BlockOrBarContext);
	}
	public BIND_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.BIND_TOK, 0); }
	public quant(): QuantContext | undefined {
		return this.tryGetRuleContext(0, QuantContext);
	}
	public quantDeclList(): QuantDeclListContext | undefined {
		return this.tryGetRuleContext(0, QuantDeclListContext);
	}
	public DISJ_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.DISJ_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr) {
			listener.enterExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr) {
			listener.exitExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr) {
			return visitor.visitExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr1Context extends ParserRuleContext {
	public expr1_5(): Expr1_5Context {
		return this.getRuleContext(0, Expr1_5Context);
	}
	public expr1(): Expr1Context | undefined {
		return this.tryGetRuleContext(0, Expr1Context);
	}
	public OR_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.OR_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr1; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr1) {
			listener.enterExpr1(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr1) {
			listener.exitExpr1(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr1) {
			return visitor.visitExpr1(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr1_5Context extends ParserRuleContext {
	public expr2(): Expr2Context {
		return this.getRuleContext(0, Expr2Context);
	}
	public expr1_5(): Expr1_5Context | undefined {
		return this.tryGetRuleContext(0, Expr1_5Context);
	}
	public XOR_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.XOR_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr1_5; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr1_5) {
			listener.enterExpr1_5(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr1_5) {
			listener.exitExpr1_5(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr1_5) {
			return visitor.visitExpr1_5(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr2Context extends ParserRuleContext {
	public expr3(): Expr3Context {
		return this.getRuleContext(0, Expr3Context);
	}
	public expr2(): Expr2Context | undefined {
		return this.tryGetRuleContext(0, Expr2Context);
	}
	public IFF_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.IFF_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr2; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr2) {
			listener.enterExpr2(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr2) {
			listener.exitExpr2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr2) {
			return visitor.visitExpr2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr3Context extends ParserRuleContext {
	public expr4(): Expr4Context {
		return this.getRuleContext(0, Expr4Context);
	}
	public IMP_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.IMP_TOK, 0); }
	public expr3(): Expr3Context[];
	public expr3(i: number): Expr3Context;
	public expr3(i?: number): Expr3Context | Expr3Context[] {
		if (i === undefined) {
			return this.getRuleContexts(Expr3Context);
		} else {
			return this.getRuleContext(i, Expr3Context);
		}
	}
	public ELSE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.ELSE_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr3; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr3) {
			listener.enterExpr3(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr3) {
			listener.exitExpr3(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr3) {
			return visitor.visitExpr3(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr4Context extends ParserRuleContext {
	public expr4_5(): Expr4_5Context {
		return this.getRuleContext(0, Expr4_5Context);
	}
	public expr4(): Expr4Context | undefined {
		return this.tryGetRuleContext(0, Expr4Context);
	}
	public AND_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.AND_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr4; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr4) {
			listener.enterExpr4(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr4) {
			listener.exitExpr4(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr4) {
			return visitor.visitExpr4(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr4_5Context extends ParserRuleContext {
	public expr5(): Expr5Context[];
	public expr5(i: number): Expr5Context;
	public expr5(i?: number): Expr5Context | Expr5Context[] {
		if (i === undefined) {
			return this.getRuleContexts(Expr5Context);
		} else {
			return this.getRuleContext(i, Expr5Context);
		}
	}
	public UNTIL_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.UNTIL_TOK, 0); }
	public RELEASE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RELEASE_TOK, 0); }
	public SINCE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SINCE_TOK, 0); }
	public TRIGGERED_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.TRIGGERED_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr4_5; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr4_5) {
			listener.enterExpr4_5(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr4_5) {
			listener.exitExpr4_5(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr4_5) {
			return visitor.visitExpr4_5(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr5Context extends ParserRuleContext {
	public expr6(): Expr6Context | undefined {
		return this.tryGetRuleContext(0, Expr6Context);
	}
	public NEG_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.NEG_TOK, 0); }
	public expr5(): Expr5Context | undefined {
		return this.tryGetRuleContext(0, Expr5Context);
	}
	public ALWAYS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.ALWAYS_TOK, 0); }
	public EVENTUALLY_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.EVENTUALLY_TOK, 0); }
	public AFTER_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.AFTER_TOK, 0); }
	public BEFORE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.BEFORE_TOK, 0); }
	public ONCE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.ONCE_TOK, 0); }
	public HISTORICALLY_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.HISTORICALLY_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr5; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr5) {
			listener.enterExpr5(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr5) {
			listener.exitExpr5(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr5) {
			return visitor.visitExpr5(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr6Context extends ParserRuleContext {
	public expr7(): Expr7Context {
		return this.getRuleContext(0, Expr7Context);
	}
	public expr6(): Expr6Context | undefined {
		return this.tryGetRuleContext(0, Expr6Context);
	}
	public compareOp(): CompareOpContext | undefined {
		return this.tryGetRuleContext(0, CompareOpContext);
	}
	public NEG_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.NEG_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr6; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr6) {
			listener.enterExpr6(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr6) {
			listener.exitExpr6(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr6) {
			return visitor.visitExpr6(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr7Context extends ParserRuleContext {
	public expr8(): Expr8Context {
		return this.getRuleContext(0, Expr8Context);
	}
	public NO_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.NO_TOK, 0); }
	public SOME_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SOME_TOK, 0); }
	public LONE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LONE_TOK, 0); }
	public ONE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.ONE_TOK, 0); }
	public TWO_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.TWO_TOK, 0); }
	public SET_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SET_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr7; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr7) {
			listener.enterExpr7(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr7) {
			listener.exitExpr7(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr7) {
			return visitor.visitExpr7(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr8Context extends ParserRuleContext {
	public expr9(): Expr9Context | undefined {
		return this.tryGetRuleContext(0, Expr9Context);
	}
	public expr8(): Expr8Context | undefined {
		return this.tryGetRuleContext(0, Expr8Context);
	}
	public expr10(): Expr10Context | undefined {
		return this.tryGetRuleContext(0, Expr10Context);
	}
	public PLUS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.PLUS_TOK, 0); }
	public MINUS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.MINUS_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr8; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr8) {
			listener.enterExpr8(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr8) {
			listener.exitExpr8(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr8) {
			return visitor.visitExpr8(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr9Context extends ParserRuleContext {
	public expr10(): Expr10Context | undefined {
		return this.tryGetRuleContext(0, Expr10Context);
	}
	public CARD_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.CARD_TOK, 0); }
	public expr9(): Expr9Context | undefined {
		return this.tryGetRuleContext(0, Expr9Context);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr9; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr9) {
			listener.enterExpr9(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr9) {
			listener.exitExpr9(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr9) {
			return visitor.visitExpr9(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr10Context extends ParserRuleContext {
	public expr11(): Expr11Context {
		return this.getRuleContext(0, Expr11Context);
	}
	public expr10(): Expr10Context | undefined {
		return this.tryGetRuleContext(0, Expr10Context);
	}
	public PPLUS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.PPLUS_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr10; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr10) {
			listener.enterExpr10(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr10) {
			listener.exitExpr10(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr10) {
			return visitor.visitExpr10(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr11Context extends ParserRuleContext {
	public expr12(): Expr12Context {
		return this.getRuleContext(0, Expr12Context);
	}
	public expr11(): Expr11Context | undefined {
		return this.tryGetRuleContext(0, Expr11Context);
	}
	public AMP_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.AMP_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr11; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr11) {
			listener.enterExpr11(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr11) {
			listener.exitExpr11(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr11) {
			return visitor.visitExpr11(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr12Context extends ParserRuleContext {
	public expr13(): Expr13Context {
		return this.getRuleContext(0, Expr13Context);
	}
	public expr12(): Expr12Context | undefined {
		return this.tryGetRuleContext(0, Expr12Context);
	}
	public arrowOp(): ArrowOpContext | undefined {
		return this.tryGetRuleContext(0, ArrowOpContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr12; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr12) {
			listener.enterExpr12(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr12) {
			listener.exitExpr12(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr12) {
			return visitor.visitExpr12(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr13Context extends ParserRuleContext {
	public expr14(): Expr14Context {
		return this.getRuleContext(0, Expr14Context);
	}
	public expr13(): Expr13Context | undefined {
		return this.tryGetRuleContext(0, Expr13Context);
	}
	public SUBT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SUBT_TOK, 0); }
	public SUPT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.SUPT_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr13; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr13) {
			listener.enterExpr13(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr13) {
			listener.exitExpr13(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr13) {
			return visitor.visitExpr13(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr14Context extends ParserRuleContext {
	public expr15(): Expr15Context | undefined {
		return this.tryGetRuleContext(0, Expr15Context);
	}
	public expr14(): Expr14Context | undefined {
		return this.tryGetRuleContext(0, Expr14Context);
	}
	public LEFT_SQUARE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEFT_SQUARE_TOK, 0); }
	public exprList(): ExprListContext | undefined {
		return this.tryGetRuleContext(0, ExprListContext);
	}
	public RIGHT_SQUARE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RIGHT_SQUARE_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr14; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr14) {
			listener.enterExpr14(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr14) {
			listener.exitExpr14(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr14) {
			return visitor.visitExpr14(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr15Context extends ParserRuleContext {
	public expr16(): Expr16Context | undefined {
		return this.tryGetRuleContext(0, Expr16Context);
	}
	public expr15(): Expr15Context | undefined {
		return this.tryGetRuleContext(0, Expr15Context);
	}
	public DOT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.DOT_TOK, 0); }
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	public LEFT_SQUARE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEFT_SQUARE_TOK, 0); }
	public exprList(): ExprListContext | undefined {
		return this.tryGetRuleContext(0, ExprListContext);
	}
	public RIGHT_SQUARE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RIGHT_SQUARE_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr15; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr15) {
			listener.enterExpr15(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr15) {
			listener.exitExpr15(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr15) {
			return visitor.visitExpr15(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr16Context extends ParserRuleContext {
	public expr17(): Expr17Context | undefined {
		return this.tryGetRuleContext(0, Expr17Context);
	}
	public expr16(): Expr16Context | undefined {
		return this.tryGetRuleContext(0, Expr16Context);
	}
	public PRIME_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.PRIME_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr16; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr16) {
			listener.enterExpr16(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr16) {
			listener.exitExpr16(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr16) {
			return visitor.visitExpr16(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr17Context extends ParserRuleContext {
	public expr18(): Expr18Context | undefined {
		return this.tryGetRuleContext(0, Expr18Context);
	}
	public expr17(): Expr17Context | undefined {
		return this.tryGetRuleContext(0, Expr17Context);
	}
	public TILDE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.TILDE_TOK, 0); }
	public EXP_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.EXP_TOK, 0); }
	public STAR_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.STAR_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr17; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr17) {
			listener.enterExpr17(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr17) {
			listener.exitExpr17(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr17) {
			return visitor.visitExpr17(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr18Context extends ParserRuleContext {
	public const(): ConstContext | undefined {
		return this.tryGetRuleContext(0, ConstContext);
	}
	public qualName(): QualNameContext | undefined {
		return this.tryGetRuleContext(0, QualNameContext);
	}
	public AT_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.AT_TOK, 0); }
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	public BACKQUOTE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.BACKQUOTE_TOK, 0); }
	public THIS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.THIS_TOK, 0); }
	public LEFT_CURLY_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEFT_CURLY_TOK, 0); }
	public quantDeclList(): QuantDeclListContext | undefined {
		return this.tryGetRuleContext(0, QuantDeclListContext);
	}
	public blockOrBar(): BlockOrBarContext | undefined {
		return this.tryGetRuleContext(0, BlockOrBarContext);
	}
	public RIGHT_CURLY_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RIGHT_CURLY_TOK, 0); }
	public LEFT_PAREN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEFT_PAREN_TOK, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public RIGHT_PAREN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RIGHT_PAREN_TOK, 0); }
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public sexpr(): SexprContext | undefined {
		return this.tryGetRuleContext(0, SexprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_expr18; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExpr18) {
			listener.enterExpr18(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExpr18) {
			listener.exitExpr18(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExpr18) {
			return visitor.visitExpr18(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrowExprContext extends ParserRuleContext {
	public qualName(): QualNameContext {
		return this.getRuleContext(0, QualNameContext);
	}
	public ARROW_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.ARROW_TOK, 0); }
	public arrowExpr(): ArrowExprContext | undefined {
		return this.tryGetRuleContext(0, ArrowExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_arrowExpr; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterArrowExpr) {
			listener.enterArrowExpr(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitArrowExpr) {
			listener.exitArrowExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitArrowExpr) {
			return visitor.visitArrowExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SexprDeclContext extends ParserRuleContext {
	public sexpr(): SexprContext {
		return this.getRuleContext(0, SexprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_sexprDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterSexprDecl) {
			listener.enterSexprDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitSexprDecl) {
			listener.exitSexprDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitSexprDecl) {
			return visitor.visitSexprDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SexprContext extends ParserRuleContext {
	public SEXPR_TOK(): TerminalNode { return this.getToken(ForgeParserParser.SEXPR_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_sexpr; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterSexpr) {
			listener.enterSexpr(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitSexpr) {
			listener.exitSexpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitSexpr) {
			return visitor.visitSexpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InstDeclContext extends ParserRuleContext {
	public INST_TOK(): TerminalNode { return this.getToken(ForgeParserParser.INST_TOK, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public bounds(): BoundsContext {
		return this.getRuleContext(0, BoundsContext);
	}
	public scope(): ScopeContext | undefined {
		return this.tryGetRuleContext(0, ScopeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_instDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterInstDecl) {
			listener.enterInstDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitInstDecl) {
			listener.exitInstDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitInstDecl) {
			return visitor.visitInstDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EvalRelDeclContext extends ParserRuleContext {
	public arrowDecl(): ArrowDeclContext {
		return this.getRuleContext(0, ArrowDeclContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_evalRelDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterEvalRelDecl) {
			listener.enterEvalRelDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitEvalRelDecl) {
			listener.exitEvalRelDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitEvalRelDecl) {
			return visitor.visitEvalRelDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EvalDeclContext extends ParserRuleContext {
	public EVAL_TOK(): TerminalNode { return this.getToken(ForgeParserParser.EVAL_TOK, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_evalDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterEvalDecl) {
			listener.enterEvalDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitEvalDecl) {
			listener.exitEvalDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitEvalDecl) {
			return visitor.visitEvalDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExampleDeclContext extends ParserRuleContext {
	public EXAMPLE_TOK(): TerminalNode { return this.getToken(ForgeParserParser.EXAMPLE_TOK, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public IS_TOK(): TerminalNode { return this.getToken(ForgeParserParser.IS_TOK, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public FOR_TOK(): TerminalNode { return this.getToken(ForgeParserParser.FOR_TOK, 0); }
	public bounds(): BoundsContext {
		return this.getRuleContext(0, BoundsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_exampleDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterExampleDecl) {
			listener.enterExampleDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitExampleDecl) {
			listener.exitExampleDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitExampleDecl) {
			return visitor.visitExampleDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QueryDeclContext extends ParserRuleContext {
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public COLON_TOK(): TerminalNode { return this.getToken(ForgeParserParser.COLON_TOK, 0); }
	public arrowExpr(): ArrowExprContext {
		return this.getRuleContext(0, ArrowExprContext);
	}
	public EQ_TOK(): TerminalNode { return this.getToken(ForgeParserParser.EQ_TOK, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_queryDecl; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterQueryDecl) {
			listener.enterQueryDecl(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitQueryDecl) {
			listener.exitQueryDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitQueryDecl) {
			return visitor.visitQueryDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumberListContext extends ParserRuleContext {
	public number(): NumberContext {
		return this.getRuleContext(0, NumberContext);
	}
	public COMMA_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COMMA_TOK, 0); }
	public numberList(): NumberListContext | undefined {
		return this.tryGetRuleContext(0, NumberListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_numberList; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterNumberList) {
			listener.enterNumberList(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitNumberList) {
			listener.exitNumberList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitNumberList) {
			return visitor.visitNumberList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumberContext extends ParserRuleContext {
	public NUM_CONST_TOK(): TerminalNode { return this.getToken(ForgeParserParser.NUM_CONST_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_number; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterNumber) {
			listener.enterNumber(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitNumber) {
			listener.exitNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitNumber) {
			return visitor.visitNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BoundsContext extends ParserRuleContext {
	public LEFT_CURLY_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEFT_CURLY_TOK, 0); }
	public RIGHT_CURLY_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RIGHT_CURLY_TOK, 0); }
	public bound(): BoundContext[];
	public bound(i: number): BoundContext;
	public bound(i?: number): BoundContext | BoundContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BoundContext);
		} else {
			return this.getRuleContext(i, BoundContext);
		}
	}
	public qualName(): QualNameContext | undefined {
		return this.tryGetRuleContext(0, QualNameContext);
	}
	public EXACTLY_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.EXACTLY_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_bounds; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterBounds) {
			listener.enterBounds(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitBounds) {
			listener.exitBounds(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitBounds) {
			return visitor.visitBounds(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtomNameOrNumberContext extends ParserRuleContext {
	public BACKQUOTE_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.BACKQUOTE_TOK, 0); }
	public name(): NameContext | undefined {
		return this.tryGetRuleContext(0, NameContext);
	}
	public number(): NumberContext | undefined {
		return this.tryGetRuleContext(0, NumberContext);
	}
	public MINUS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.MINUS_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_atomNameOrNumber; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterAtomNameOrNumber) {
			listener.enterAtomNameOrNumber(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitAtomNameOrNumber) {
			listener.exitAtomNameOrNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitAtomNameOrNumber) {
			return visitor.visitAtomNameOrNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BoundContext extends ParserRuleContext {
	public boundLHS(): BoundLHSContext | undefined {
		return this.tryGetRuleContext(0, BoundLHSContext);
	}
	public compareOp(): CompareOpContext | undefined {
		return this.tryGetRuleContext(0, CompareOpContext);
	}
	public bindRHSUnion(): BindRHSUnionContext | undefined {
		return this.tryGetRuleContext(0, BindRHSUnionContext);
	}
	public NO_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.NO_TOK, 0); }
	public qualName(): QualNameContext | undefined {
		return this.tryGetRuleContext(0, QualNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_bound; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterBound) {
			listener.enterBound(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitBound) {
			listener.exitBound(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitBound) {
			return visitor.visitBound(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BoundLHSContext extends ParserRuleContext {
	public CARD_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.CARD_TOK, 0); }
	public qualName(): QualNameContext[];
	public qualName(i: number): QualNameContext;
	public qualName(i?: number): QualNameContext | QualNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QualNameContext);
		} else {
			return this.getRuleContext(i, QualNameContext);
		}
	}
	public atomNameOrNumber(): AtomNameOrNumberContext | undefined {
		return this.tryGetRuleContext(0, AtomNameOrNumberContext);
	}
	public DOT_TOK(): TerminalNode[];
	public DOT_TOK(i: number): TerminalNode;
	public DOT_TOK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ForgeParserParser.DOT_TOK);
		} else {
			return this.getToken(ForgeParserParser.DOT_TOK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_boundLHS; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterBoundLHS) {
			listener.enterBoundLHS(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitBoundLHS) {
			listener.exitBoundLHS(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitBoundLHS) {
			return visitor.visitBoundLHS(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BindRHSUnionContext extends ParserRuleContext {
	public bindRHSProduct(): BindRHSProductContext | undefined {
		return this.tryGetRuleContext(0, BindRHSProductContext);
	}
	public bindRHSUnion(): BindRHSUnionContext | undefined {
		return this.tryGetRuleContext(0, BindRHSUnionContext);
	}
	public PLUS_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.PLUS_TOK, 0); }
	public LEFT_PAREN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEFT_PAREN_TOK, 0); }
	public RIGHT_PAREN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RIGHT_PAREN_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_bindRHSUnion; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterBindRHSUnion) {
			listener.enterBindRHSUnion(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitBindRHSUnion) {
			listener.exitBindRHSUnion(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitBindRHSUnion) {
			return visitor.visitBindRHSUnion(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BindRHSProductContext extends ParserRuleContext {
	public LEFT_PAREN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEFT_PAREN_TOK, 0); }
	public bindRHSProduct(): BindRHSProductContext | undefined {
		return this.tryGetRuleContext(0, BindRHSProductContext);
	}
	public RIGHT_PAREN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RIGHT_PAREN_TOK, 0); }
	public bindRHSProductBase(): BindRHSProductBaseContext | undefined {
		return this.tryGetRuleContext(0, BindRHSProductBaseContext);
	}
	public COMMA_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.COMMA_TOK, 0); }
	public ARROW_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.ARROW_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_bindRHSProduct; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterBindRHSProduct) {
			listener.enterBindRHSProduct(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitBindRHSProduct) {
			listener.exitBindRHSProduct(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitBindRHSProduct) {
			return visitor.visitBindRHSProduct(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BindRHSProductBaseContext extends ParserRuleContext {
	public atomNameOrNumber(): AtomNameOrNumberContext | undefined {
		return this.tryGetRuleContext(0, AtomNameOrNumberContext);
	}
	public qualName(): QualNameContext | undefined {
		return this.tryGetRuleContext(0, QualNameContext);
	}
	public LEFT_PAREN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.LEFT_PAREN_TOK, 0); }
	public bindRHSUnion(): BindRHSUnionContext | undefined {
		return this.tryGetRuleContext(0, BindRHSUnionContext);
	}
	public RIGHT_PAREN_TOK(): TerminalNode | undefined { return this.tryGetToken(ForgeParserParser.RIGHT_PAREN_TOK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ForgeParserParser.RULE_bindRHSProductBase; }
	// @Override
	public enterRule(listener: ForgeParserListener): void {
		if (listener.enterBindRHSProductBase) {
			listener.enterBindRHSProductBase(this);
		}
	}
	// @Override
	public exitRule(listener: ForgeParserListener): void {
		if (listener.exitBindRHSProductBase) {
			listener.exitBindRHSProductBase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ForgeParserVisitor<Result>): Result {
		if (visitor.visitBindRHSProductBase) {
			return visitor.visitBindRHSProductBase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


