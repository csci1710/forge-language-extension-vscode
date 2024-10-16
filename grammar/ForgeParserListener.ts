// Generated from grammar/ForgeParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { AlloyModuleContext } from "./ForgeParserParser";
import { ImportDeclContext } from "./ForgeParserParser";
import { ParagraphContext } from "./ForgeParserParser";
import { SigDeclContext } from "./ForgeParserParser";
import { SigExtContext } from "./ForgeParserParser";
import { MultContext } from "./ForgeParserParser";
import { ArrowMultContext } from "./ForgeParserParser";
import { HelperMultContext } from "./ForgeParserParser";
import { ParaDeclContext } from "./ForgeParserParser";
import { QuantDeclContext } from "./ForgeParserParser";
import { ArrowDeclContext } from "./ForgeParserParser";
import { PredTypeContext } from "./ForgeParserParser";
import { PredDeclContext } from "./ForgeParserParser";
import { FunDeclContext } from "./ForgeParserParser";
import { ParaDeclsContext } from "./ForgeParserParser";
import { AssertDeclContext } from "./ForgeParserParser";
import { CmdDeclContext } from "./ForgeParserParser";
import { TestDeclContext } from "./ForgeParserParser";
import { TestExpectDeclContext } from "./ForgeParserParser";
import { TestBlockContext } from "./ForgeParserParser";
import { ScopeContext } from "./ForgeParserParser";
import { TypescopeContext } from "./ForgeParserParser";
import { ConstContext } from "./ForgeParserParser";
import { SatisfiabilityDeclContext } from "./ForgeParserParser";
import { PropertyDeclContext } from "./ForgeParserParser";
import { QuantifiedPropertyDeclContext } from "./ForgeParserParser";
import { TestSuiteDeclContext } from "./ForgeParserParser";
import { TestConstructContext } from "./ForgeParserParser";
import { ArrowOpContext } from "./ForgeParserParser";
import { CompareOpContext } from "./ForgeParserParser";
import { LetDeclContext } from "./ForgeParserParser";
import { BlockContext } from "./ForgeParserParser";
import { BlockOrBarContext } from "./ForgeParserParser";
import { QuantContext } from "./ForgeParserParser";
import { QualNameContext } from "./ForgeParserParser";
import { OptionDeclContext } from "./ForgeParserParser";
import { NameContext } from "./ForgeParserParser";
import { NameListContext } from "./ForgeParserParser";
import { QualNameListContext } from "./ForgeParserParser";
import { ParaDeclListContext } from "./ForgeParserParser";
import { QuantDeclListContext } from "./ForgeParserParser";
import { ArrowDeclListContext } from "./ForgeParserParser";
import { LetDeclListContext } from "./ForgeParserParser";
import { TypescopeListContext } from "./ForgeParserParser";
import { ExprListContext } from "./ForgeParserParser";
import { ExprContext } from "./ForgeParserParser";
import { Expr1Context } from "./ForgeParserParser";
import { Expr1_5Context } from "./ForgeParserParser";
import { Expr2Context } from "./ForgeParserParser";
import { Expr3Context } from "./ForgeParserParser";
import { Expr4Context } from "./ForgeParserParser";
import { Expr4_5Context } from "./ForgeParserParser";
import { Expr5Context } from "./ForgeParserParser";
import { Expr6Context } from "./ForgeParserParser";
import { Expr7Context } from "./ForgeParserParser";
import { Expr8Context } from "./ForgeParserParser";
import { Expr9Context } from "./ForgeParserParser";
import { Expr10Context } from "./ForgeParserParser";
import { Expr11Context } from "./ForgeParserParser";
import { Expr12Context } from "./ForgeParserParser";
import { Expr13Context } from "./ForgeParserParser";
import { Expr14Context } from "./ForgeParserParser";
import { Expr15Context } from "./ForgeParserParser";
import { Expr16Context } from "./ForgeParserParser";
import { Expr17Context } from "./ForgeParserParser";
import { Expr18Context } from "./ForgeParserParser";
import { ArrowExprContext } from "./ForgeParserParser";
import { SexprDeclContext } from "./ForgeParserParser";
import { SexprContext } from "./ForgeParserParser";
import { InstDeclContext } from "./ForgeParserParser";
import { EvalRelDeclContext } from "./ForgeParserParser";
import { EvalDeclContext } from "./ForgeParserParser";
import { ExampleDeclContext } from "./ForgeParserParser";
import { QueryDeclContext } from "./ForgeParserParser";
import { NumberListContext } from "./ForgeParserParser";
import { NumberContext } from "./ForgeParserParser";
import { BoundsContext } from "./ForgeParserParser";
import { AtomNameOrNumberContext } from "./ForgeParserParser";
import { BoundContext } from "./ForgeParserParser";
import { BoundLHSContext } from "./ForgeParserParser";
import { BindRHSUnionContext } from "./ForgeParserParser";
import { BindRHSProductContext } from "./ForgeParserParser";
import { BindRHSProductBaseContext } from "./ForgeParserParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ForgeParserParser`.
 */
export interface ForgeParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ForgeParserParser.alloyModule`.
	 * @param ctx the parse tree
	 */
	enterAlloyModule?: (ctx: AlloyModuleContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.alloyModule`.
	 * @param ctx the parse tree
	 */
	exitAlloyModule?: (ctx: AlloyModuleContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.importDecl`.
	 * @param ctx the parse tree
	 */
	enterImportDecl?: (ctx: ImportDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.importDecl`.
	 * @param ctx the parse tree
	 */
	exitImportDecl?: (ctx: ImportDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.paragraph`.
	 * @param ctx the parse tree
	 */
	enterParagraph?: (ctx: ParagraphContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.paragraph`.
	 * @param ctx the parse tree
	 */
	exitParagraph?: (ctx: ParagraphContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.sigDecl`.
	 * @param ctx the parse tree
	 */
	enterSigDecl?: (ctx: SigDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.sigDecl`.
	 * @param ctx the parse tree
	 */
	exitSigDecl?: (ctx: SigDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.sigExt`.
	 * @param ctx the parse tree
	 */
	enterSigExt?: (ctx: SigExtContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.sigExt`.
	 * @param ctx the parse tree
	 */
	exitSigExt?: (ctx: SigExtContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.mult`.
	 * @param ctx the parse tree
	 */
	enterMult?: (ctx: MultContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.mult`.
	 * @param ctx the parse tree
	 */
	exitMult?: (ctx: MultContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.arrowMult`.
	 * @param ctx the parse tree
	 */
	enterArrowMult?: (ctx: ArrowMultContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.arrowMult`.
	 * @param ctx the parse tree
	 */
	exitArrowMult?: (ctx: ArrowMultContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.helperMult`.
	 * @param ctx the parse tree
	 */
	enterHelperMult?: (ctx: HelperMultContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.helperMult`.
	 * @param ctx the parse tree
	 */
	exitHelperMult?: (ctx: HelperMultContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.paraDecl`.
	 * @param ctx the parse tree
	 */
	enterParaDecl?: (ctx: ParaDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.paraDecl`.
	 * @param ctx the parse tree
	 */
	exitParaDecl?: (ctx: ParaDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.quantDecl`.
	 * @param ctx the parse tree
	 */
	enterQuantDecl?: (ctx: QuantDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.quantDecl`.
	 * @param ctx the parse tree
	 */
	exitQuantDecl?: (ctx: QuantDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.arrowDecl`.
	 * @param ctx the parse tree
	 */
	enterArrowDecl?: (ctx: ArrowDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.arrowDecl`.
	 * @param ctx the parse tree
	 */
	exitArrowDecl?: (ctx: ArrowDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.predType`.
	 * @param ctx the parse tree
	 */
	enterPredType?: (ctx: PredTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.predType`.
	 * @param ctx the parse tree
	 */
	exitPredType?: (ctx: PredTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.predDecl`.
	 * @param ctx the parse tree
	 */
	enterPredDecl?: (ctx: PredDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.predDecl`.
	 * @param ctx the parse tree
	 */
	exitPredDecl?: (ctx: PredDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.funDecl`.
	 * @param ctx the parse tree
	 */
	enterFunDecl?: (ctx: FunDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.funDecl`.
	 * @param ctx the parse tree
	 */
	exitFunDecl?: (ctx: FunDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.paraDecls`.
	 * @param ctx the parse tree
	 */
	enterParaDecls?: (ctx: ParaDeclsContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.paraDecls`.
	 * @param ctx the parse tree
	 */
	exitParaDecls?: (ctx: ParaDeclsContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.assertDecl`.
	 * @param ctx the parse tree
	 */
	enterAssertDecl?: (ctx: AssertDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.assertDecl`.
	 * @param ctx the parse tree
	 */
	exitAssertDecl?: (ctx: AssertDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.cmdDecl`.
	 * @param ctx the parse tree
	 */
	enterCmdDecl?: (ctx: CmdDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.cmdDecl`.
	 * @param ctx the parse tree
	 */
	exitCmdDecl?: (ctx: CmdDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.testDecl`.
	 * @param ctx the parse tree
	 */
	enterTestDecl?: (ctx: TestDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.testDecl`.
	 * @param ctx the parse tree
	 */
	exitTestDecl?: (ctx: TestDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.testExpectDecl`.
	 * @param ctx the parse tree
	 */
	enterTestExpectDecl?: (ctx: TestExpectDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.testExpectDecl`.
	 * @param ctx the parse tree
	 */
	exitTestExpectDecl?: (ctx: TestExpectDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.testBlock`.
	 * @param ctx the parse tree
	 */
	enterTestBlock?: (ctx: TestBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.testBlock`.
	 * @param ctx the parse tree
	 */
	exitTestBlock?: (ctx: TestBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.scope`.
	 * @param ctx the parse tree
	 */
	enterScope?: (ctx: ScopeContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.scope`.
	 * @param ctx the parse tree
	 */
	exitScope?: (ctx: ScopeContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.typescope`.
	 * @param ctx the parse tree
	 */
	enterTypescope?: (ctx: TypescopeContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.typescope`.
	 * @param ctx the parse tree
	 */
	exitTypescope?: (ctx: TypescopeContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.const`.
	 * @param ctx the parse tree
	 */
	enterConst?: (ctx: ConstContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.const`.
	 * @param ctx the parse tree
	 */
	exitConst?: (ctx: ConstContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.satisfiabilityDecl`.
	 * @param ctx the parse tree
	 */
	enterSatisfiabilityDecl?: (ctx: SatisfiabilityDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.satisfiabilityDecl`.
	 * @param ctx the parse tree
	 */
	exitSatisfiabilityDecl?: (ctx: SatisfiabilityDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.propertyDecl`.
	 * @param ctx the parse tree
	 */
	enterPropertyDecl?: (ctx: PropertyDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.propertyDecl`.
	 * @param ctx the parse tree
	 */
	exitPropertyDecl?: (ctx: PropertyDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.quantifiedPropertyDecl`.
	 * @param ctx the parse tree
	 */
	enterQuantifiedPropertyDecl?: (ctx: QuantifiedPropertyDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.quantifiedPropertyDecl`.
	 * @param ctx the parse tree
	 */
	exitQuantifiedPropertyDecl?: (ctx: QuantifiedPropertyDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.testSuiteDecl`.
	 * @param ctx the parse tree
	 */
	enterTestSuiteDecl?: (ctx: TestSuiteDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.testSuiteDecl`.
	 * @param ctx the parse tree
	 */
	exitTestSuiteDecl?: (ctx: TestSuiteDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.testConstruct`.
	 * @param ctx the parse tree
	 */
	enterTestConstruct?: (ctx: TestConstructContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.testConstruct`.
	 * @param ctx the parse tree
	 */
	exitTestConstruct?: (ctx: TestConstructContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.arrowOp`.
	 * @param ctx the parse tree
	 */
	enterArrowOp?: (ctx: ArrowOpContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.arrowOp`.
	 * @param ctx the parse tree
	 */
	exitArrowOp?: (ctx: ArrowOpContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.compareOp`.
	 * @param ctx the parse tree
	 */
	enterCompareOp?: (ctx: CompareOpContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.compareOp`.
	 * @param ctx the parse tree
	 */
	exitCompareOp?: (ctx: CompareOpContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.letDecl`.
	 * @param ctx the parse tree
	 */
	enterLetDecl?: (ctx: LetDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.letDecl`.
	 * @param ctx the parse tree
	 */
	exitLetDecl?: (ctx: LetDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.blockOrBar`.
	 * @param ctx the parse tree
	 */
	enterBlockOrBar?: (ctx: BlockOrBarContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.blockOrBar`.
	 * @param ctx the parse tree
	 */
	exitBlockOrBar?: (ctx: BlockOrBarContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.quant`.
	 * @param ctx the parse tree
	 */
	enterQuant?: (ctx: QuantContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.quant`.
	 * @param ctx the parse tree
	 */
	exitQuant?: (ctx: QuantContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.qualName`.
	 * @param ctx the parse tree
	 */
	enterQualName?: (ctx: QualNameContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.qualName`.
	 * @param ctx the parse tree
	 */
	exitQualName?: (ctx: QualNameContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.optionDecl`.
	 * @param ctx the parse tree
	 */
	enterOptionDecl?: (ctx: OptionDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.optionDecl`.
	 * @param ctx the parse tree
	 */
	exitOptionDecl?: (ctx: OptionDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.name`.
	 * @param ctx the parse tree
	 */
	enterName?: (ctx: NameContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.name`.
	 * @param ctx the parse tree
	 */
	exitName?: (ctx: NameContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.nameList`.
	 * @param ctx the parse tree
	 */
	enterNameList?: (ctx: NameListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.nameList`.
	 * @param ctx the parse tree
	 */
	exitNameList?: (ctx: NameListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.qualNameList`.
	 * @param ctx the parse tree
	 */
	enterQualNameList?: (ctx: QualNameListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.qualNameList`.
	 * @param ctx the parse tree
	 */
	exitQualNameList?: (ctx: QualNameListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.paraDeclList`.
	 * @param ctx the parse tree
	 */
	enterParaDeclList?: (ctx: ParaDeclListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.paraDeclList`.
	 * @param ctx the parse tree
	 */
	exitParaDeclList?: (ctx: ParaDeclListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.quantDeclList`.
	 * @param ctx the parse tree
	 */
	enterQuantDeclList?: (ctx: QuantDeclListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.quantDeclList`.
	 * @param ctx the parse tree
	 */
	exitQuantDeclList?: (ctx: QuantDeclListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.arrowDeclList`.
	 * @param ctx the parse tree
	 */
	enterArrowDeclList?: (ctx: ArrowDeclListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.arrowDeclList`.
	 * @param ctx the parse tree
	 */
	exitArrowDeclList?: (ctx: ArrowDeclListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.letDeclList`.
	 * @param ctx the parse tree
	 */
	enterLetDeclList?: (ctx: LetDeclListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.letDeclList`.
	 * @param ctx the parse tree
	 */
	exitLetDeclList?: (ctx: LetDeclListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.typescopeList`.
	 * @param ctx the parse tree
	 */
	enterTypescopeList?: (ctx: TypescopeListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.typescopeList`.
	 * @param ctx the parse tree
	 */
	exitTypescopeList?: (ctx: TypescopeListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.exprList`.
	 * @param ctx the parse tree
	 */
	enterExprList?: (ctx: ExprListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.exprList`.
	 * @param ctx the parse tree
	 */
	exitExprList?: (ctx: ExprListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr1`.
	 * @param ctx the parse tree
	 */
	enterExpr1?: (ctx: Expr1Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr1`.
	 * @param ctx the parse tree
	 */
	exitExpr1?: (ctx: Expr1Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr1_5`.
	 * @param ctx the parse tree
	 */
	enterExpr1_5?: (ctx: Expr1_5Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr1_5`.
	 * @param ctx the parse tree
	 */
	exitExpr1_5?: (ctx: Expr1_5Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr2`.
	 * @param ctx the parse tree
	 */
	enterExpr2?: (ctx: Expr2Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr2`.
	 * @param ctx the parse tree
	 */
	exitExpr2?: (ctx: Expr2Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr3`.
	 * @param ctx the parse tree
	 */
	enterExpr3?: (ctx: Expr3Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr3`.
	 * @param ctx the parse tree
	 */
	exitExpr3?: (ctx: Expr3Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr4`.
	 * @param ctx the parse tree
	 */
	enterExpr4?: (ctx: Expr4Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr4`.
	 * @param ctx the parse tree
	 */
	exitExpr4?: (ctx: Expr4Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr4_5`.
	 * @param ctx the parse tree
	 */
	enterExpr4_5?: (ctx: Expr4_5Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr4_5`.
	 * @param ctx the parse tree
	 */
	exitExpr4_5?: (ctx: Expr4_5Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr5`.
	 * @param ctx the parse tree
	 */
	enterExpr5?: (ctx: Expr5Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr5`.
	 * @param ctx the parse tree
	 */
	exitExpr5?: (ctx: Expr5Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr6`.
	 * @param ctx the parse tree
	 */
	enterExpr6?: (ctx: Expr6Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr6`.
	 * @param ctx the parse tree
	 */
	exitExpr6?: (ctx: Expr6Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr7`.
	 * @param ctx the parse tree
	 */
	enterExpr7?: (ctx: Expr7Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr7`.
	 * @param ctx the parse tree
	 */
	exitExpr7?: (ctx: Expr7Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr8`.
	 * @param ctx the parse tree
	 */
	enterExpr8?: (ctx: Expr8Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr8`.
	 * @param ctx the parse tree
	 */
	exitExpr8?: (ctx: Expr8Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr9`.
	 * @param ctx the parse tree
	 */
	enterExpr9?: (ctx: Expr9Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr9`.
	 * @param ctx the parse tree
	 */
	exitExpr9?: (ctx: Expr9Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr10`.
	 * @param ctx the parse tree
	 */
	enterExpr10?: (ctx: Expr10Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr10`.
	 * @param ctx the parse tree
	 */
	exitExpr10?: (ctx: Expr10Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr11`.
	 * @param ctx the parse tree
	 */
	enterExpr11?: (ctx: Expr11Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr11`.
	 * @param ctx the parse tree
	 */
	exitExpr11?: (ctx: Expr11Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr12`.
	 * @param ctx the parse tree
	 */
	enterExpr12?: (ctx: Expr12Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr12`.
	 * @param ctx the parse tree
	 */
	exitExpr12?: (ctx: Expr12Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr13`.
	 * @param ctx the parse tree
	 */
	enterExpr13?: (ctx: Expr13Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr13`.
	 * @param ctx the parse tree
	 */
	exitExpr13?: (ctx: Expr13Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr14`.
	 * @param ctx the parse tree
	 */
	enterExpr14?: (ctx: Expr14Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr14`.
	 * @param ctx the parse tree
	 */
	exitExpr14?: (ctx: Expr14Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr15`.
	 * @param ctx the parse tree
	 */
	enterExpr15?: (ctx: Expr15Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr15`.
	 * @param ctx the parse tree
	 */
	exitExpr15?: (ctx: Expr15Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr16`.
	 * @param ctx the parse tree
	 */
	enterExpr16?: (ctx: Expr16Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr16`.
	 * @param ctx the parse tree
	 */
	exitExpr16?: (ctx: Expr16Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr17`.
	 * @param ctx the parse tree
	 */
	enterExpr17?: (ctx: Expr17Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr17`.
	 * @param ctx the parse tree
	 */
	exitExpr17?: (ctx: Expr17Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.expr18`.
	 * @param ctx the parse tree
	 */
	enterExpr18?: (ctx: Expr18Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.expr18`.
	 * @param ctx the parse tree
	 */
	exitExpr18?: (ctx: Expr18Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.arrowExpr`.
	 * @param ctx the parse tree
	 */
	enterArrowExpr?: (ctx: ArrowExprContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.arrowExpr`.
	 * @param ctx the parse tree
	 */
	exitArrowExpr?: (ctx: ArrowExprContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.sexprDecl`.
	 * @param ctx the parse tree
	 */
	enterSexprDecl?: (ctx: SexprDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.sexprDecl`.
	 * @param ctx the parse tree
	 */
	exitSexprDecl?: (ctx: SexprDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.sexpr`.
	 * @param ctx the parse tree
	 */
	enterSexpr?: (ctx: SexprContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.sexpr`.
	 * @param ctx the parse tree
	 */
	exitSexpr?: (ctx: SexprContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.instDecl`.
	 * @param ctx the parse tree
	 */
	enterInstDecl?: (ctx: InstDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.instDecl`.
	 * @param ctx the parse tree
	 */
	exitInstDecl?: (ctx: InstDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.evalRelDecl`.
	 * @param ctx the parse tree
	 */
	enterEvalRelDecl?: (ctx: EvalRelDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.evalRelDecl`.
	 * @param ctx the parse tree
	 */
	exitEvalRelDecl?: (ctx: EvalRelDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.evalDecl`.
	 * @param ctx the parse tree
	 */
	enterEvalDecl?: (ctx: EvalDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.evalDecl`.
	 * @param ctx the parse tree
	 */
	exitEvalDecl?: (ctx: EvalDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.exampleDecl`.
	 * @param ctx the parse tree
	 */
	enterExampleDecl?: (ctx: ExampleDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.exampleDecl`.
	 * @param ctx the parse tree
	 */
	exitExampleDecl?: (ctx: ExampleDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.queryDecl`.
	 * @param ctx the parse tree
	 */
	enterQueryDecl?: (ctx: QueryDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.queryDecl`.
	 * @param ctx the parse tree
	 */
	exitQueryDecl?: (ctx: QueryDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.numberList`.
	 * @param ctx the parse tree
	 */
	enterNumberList?: (ctx: NumberListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.numberList`.
	 * @param ctx the parse tree
	 */
	exitNumberList?: (ctx: NumberListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.number`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.number`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.bounds`.
	 * @param ctx the parse tree
	 */
	enterBounds?: (ctx: BoundsContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.bounds`.
	 * @param ctx the parse tree
	 */
	exitBounds?: (ctx: BoundsContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.atomNameOrNumber`.
	 * @param ctx the parse tree
	 */
	enterAtomNameOrNumber?: (ctx: AtomNameOrNumberContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.atomNameOrNumber`.
	 * @param ctx the parse tree
	 */
	exitAtomNameOrNumber?: (ctx: AtomNameOrNumberContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.bound`.
	 * @param ctx the parse tree
	 */
	enterBound?: (ctx: BoundContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.bound`.
	 * @param ctx the parse tree
	 */
	exitBound?: (ctx: BoundContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.boundLHS`.
	 * @param ctx the parse tree
	 */
	enterBoundLHS?: (ctx: BoundLHSContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.boundLHS`.
	 * @param ctx the parse tree
	 */
	exitBoundLHS?: (ctx: BoundLHSContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.bindRHSUnion`.
	 * @param ctx the parse tree
	 */
	enterBindRHSUnion?: (ctx: BindRHSUnionContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.bindRHSUnion`.
	 * @param ctx the parse tree
	 */
	exitBindRHSUnion?: (ctx: BindRHSUnionContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.bindRHSProduct`.
	 * @param ctx the parse tree
	 */
	enterBindRHSProduct?: (ctx: BindRHSProductContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.bindRHSProduct`.
	 * @param ctx the parse tree
	 */
	exitBindRHSProduct?: (ctx: BindRHSProductContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParserParser.bindRHSProductBase`.
	 * @param ctx the parse tree
	 */
	enterBindRHSProductBase?: (ctx: BindRHSProductBaseContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParserParser.bindRHSProductBase`.
	 * @param ctx the parse tree
	 */
	exitBindRHSProductBase?: (ctx: BindRHSProductBaseContext) => void;
}

