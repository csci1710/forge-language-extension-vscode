// Generated from grammar/Forge.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { AlloyModuleContext } from "./ForgeParser";
import { ImportDeclContext } from "./ForgeParser";
import { ParagraphContext } from "./ForgeParser";
import { SigDeclContext } from "./ForgeParser";
import { SigExtContext } from "./ForgeParser";
import { MultContext } from "./ForgeParser";
import { ArrowMultContext } from "./ForgeParser";
import { HelperMultContext } from "./ForgeParser";
import { ParaDeclContext } from "./ForgeParser";
import { QuantDeclContext } from "./ForgeParser";
import { ArrowDeclContext } from "./ForgeParser";
import { PredTypeContext } from "./ForgeParser";
import { PredDeclContext } from "./ForgeParser";
import { FunDeclContext } from "./ForgeParser";
import { ParaDeclsContext } from "./ForgeParser";
import { AssertDeclContext } from "./ForgeParser";
import { CmdDeclContext } from "./ForgeParser";
import { TestDeclContext } from "./ForgeParser";
import { TestExpectDeclContext } from "./ForgeParser";
import { TestBlockContext } from "./ForgeParser";
import { ScopeContext } from "./ForgeParser";
import { TypescopeContext } from "./ForgeParser";
import { ConstContext } from "./ForgeParser";
import { SatisfiabilityDeclContext } from "./ForgeParser";
import { PropertyDeclContext } from "./ForgeParser";
import { QuantifiedPropertyDeclContext } from "./ForgeParser";
import { TestSuiteDeclContext } from "./ForgeParser";
import { TestConstructContext } from "./ForgeParser";
import { ArrowOpContext } from "./ForgeParser";
import { CompareOpContext } from "./ForgeParser";
import { LetDeclContext } from "./ForgeParser";
import { BlockContext } from "./ForgeParser";
import { BlockOrBarContext } from "./ForgeParser";
import { QuantContext } from "./ForgeParser";
import { QualNameContext } from "./ForgeParser";
import { OptionDeclContext } from "./ForgeParser";
import { NameContext } from "./ForgeParser";
import { NameListContext } from "./ForgeParser";
import { QualNameListContext } from "./ForgeParser";
import { ParaDeclListContext } from "./ForgeParser";
import { QuantDeclListContext } from "./ForgeParser";
import { ArrowDeclListContext } from "./ForgeParser";
import { LetDeclListContext } from "./ForgeParser";
import { TypescopeListContext } from "./ForgeParser";
import { ExprListContext } from "./ForgeParser";
import { ExprContext } from "./ForgeParser";
import { Expr1Context } from "./ForgeParser";
import { Expr1_5Context } from "./ForgeParser";
import { Expr2Context } from "./ForgeParser";
import { Expr3Context } from "./ForgeParser";
import { Expr4Context } from "./ForgeParser";
import { Expr4_5Context } from "./ForgeParser";
import { Expr5Context } from "./ForgeParser";
import { Expr6Context } from "./ForgeParser";
import { Expr7Context } from "./ForgeParser";
import { Expr8Context } from "./ForgeParser";
import { Expr9Context } from "./ForgeParser";
import { Expr10Context } from "./ForgeParser";
import { Expr11Context } from "./ForgeParser";
import { Expr12Context } from "./ForgeParser";
import { Expr13Context } from "./ForgeParser";
import { Expr14Context } from "./ForgeParser";
import { Expr15Context } from "./ForgeParser";
import { Expr16Context } from "./ForgeParser";
import { Expr17Context } from "./ForgeParser";
import { Expr18Context } from "./ForgeParser";
import { ArrowExprContext } from "./ForgeParser";
import { SexprDeclContext } from "./ForgeParser";
import { SexprContext } from "./ForgeParser";
import { InstDeclContext } from "./ForgeParser";
import { EvalRelDeclContext } from "./ForgeParser";
import { EvalDeclContext } from "./ForgeParser";
import { ExampleDeclContext } from "./ForgeParser";
import { QueryDeclContext } from "./ForgeParser";
import { NumberListContext } from "./ForgeParser";
import { NumberContext } from "./ForgeParser";
import { BoundsContext } from "./ForgeParser";
import { AtomNameOrNumberContext } from "./ForgeParser";
import { BoundContext } from "./ForgeParser";
import { BoundLHSContext } from "./ForgeParser";
import { BindRHSUnionContext } from "./ForgeParser";
import { BindRHSProductContext } from "./ForgeParser";
import { BindRHSProductBaseContext } from "./ForgeParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ForgeParser`.
 */
export interface ForgeListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ForgeParser.alloyModule`.
	 * @param ctx the parse tree
	 */
	enterAlloyModule?: (ctx: AlloyModuleContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.alloyModule`.
	 * @param ctx the parse tree
	 */
	exitAlloyModule?: (ctx: AlloyModuleContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.importDecl`.
	 * @param ctx the parse tree
	 */
	enterImportDecl?: (ctx: ImportDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.importDecl`.
	 * @param ctx the parse tree
	 */
	exitImportDecl?: (ctx: ImportDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.paragraph`.
	 * @param ctx the parse tree
	 */
	enterParagraph?: (ctx: ParagraphContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.paragraph`.
	 * @param ctx the parse tree
	 */
	exitParagraph?: (ctx: ParagraphContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.sigDecl`.
	 * @param ctx the parse tree
	 */
	enterSigDecl?: (ctx: SigDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.sigDecl`.
	 * @param ctx the parse tree
	 */
	exitSigDecl?: (ctx: SigDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.sigExt`.
	 * @param ctx the parse tree
	 */
	enterSigExt?: (ctx: SigExtContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.sigExt`.
	 * @param ctx the parse tree
	 */
	exitSigExt?: (ctx: SigExtContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.mult`.
	 * @param ctx the parse tree
	 */
	enterMult?: (ctx: MultContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.mult`.
	 * @param ctx the parse tree
	 */
	exitMult?: (ctx: MultContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.arrowMult`.
	 * @param ctx the parse tree
	 */
	enterArrowMult?: (ctx: ArrowMultContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.arrowMult`.
	 * @param ctx the parse tree
	 */
	exitArrowMult?: (ctx: ArrowMultContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.helperMult`.
	 * @param ctx the parse tree
	 */
	enterHelperMult?: (ctx: HelperMultContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.helperMult`.
	 * @param ctx the parse tree
	 */
	exitHelperMult?: (ctx: HelperMultContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.paraDecl`.
	 * @param ctx the parse tree
	 */
	enterParaDecl?: (ctx: ParaDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.paraDecl`.
	 * @param ctx the parse tree
	 */
	exitParaDecl?: (ctx: ParaDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.quantDecl`.
	 * @param ctx the parse tree
	 */
	enterQuantDecl?: (ctx: QuantDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.quantDecl`.
	 * @param ctx the parse tree
	 */
	exitQuantDecl?: (ctx: QuantDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.arrowDecl`.
	 * @param ctx the parse tree
	 */
	enterArrowDecl?: (ctx: ArrowDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.arrowDecl`.
	 * @param ctx the parse tree
	 */
	exitArrowDecl?: (ctx: ArrowDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.predType`.
	 * @param ctx the parse tree
	 */
	enterPredType?: (ctx: PredTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.predType`.
	 * @param ctx the parse tree
	 */
	exitPredType?: (ctx: PredTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.predDecl`.
	 * @param ctx the parse tree
	 */
	enterPredDecl?: (ctx: PredDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.predDecl`.
	 * @param ctx the parse tree
	 */
	exitPredDecl?: (ctx: PredDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.funDecl`.
	 * @param ctx the parse tree
	 */
	enterFunDecl?: (ctx: FunDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.funDecl`.
	 * @param ctx the parse tree
	 */
	exitFunDecl?: (ctx: FunDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.paraDecls`.
	 * @param ctx the parse tree
	 */
	enterParaDecls?: (ctx: ParaDeclsContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.paraDecls`.
	 * @param ctx the parse tree
	 */
	exitParaDecls?: (ctx: ParaDeclsContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.assertDecl`.
	 * @param ctx the parse tree
	 */
	enterAssertDecl?: (ctx: AssertDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.assertDecl`.
	 * @param ctx the parse tree
	 */
	exitAssertDecl?: (ctx: AssertDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.cmdDecl`.
	 * @param ctx the parse tree
	 */
	enterCmdDecl?: (ctx: CmdDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.cmdDecl`.
	 * @param ctx the parse tree
	 */
	exitCmdDecl?: (ctx: CmdDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.testDecl`.
	 * @param ctx the parse tree
	 */
	enterTestDecl?: (ctx: TestDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.testDecl`.
	 * @param ctx the parse tree
	 */
	exitTestDecl?: (ctx: TestDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.testExpectDecl`.
	 * @param ctx the parse tree
	 */
	enterTestExpectDecl?: (ctx: TestExpectDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.testExpectDecl`.
	 * @param ctx the parse tree
	 */
	exitTestExpectDecl?: (ctx: TestExpectDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.testBlock`.
	 * @param ctx the parse tree
	 */
	enterTestBlock?: (ctx: TestBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.testBlock`.
	 * @param ctx the parse tree
	 */
	exitTestBlock?: (ctx: TestBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.scope`.
	 * @param ctx the parse tree
	 */
	enterScope?: (ctx: ScopeContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.scope`.
	 * @param ctx the parse tree
	 */
	exitScope?: (ctx: ScopeContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.typescope`.
	 * @param ctx the parse tree
	 */
	enterTypescope?: (ctx: TypescopeContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.typescope`.
	 * @param ctx the parse tree
	 */
	exitTypescope?: (ctx: TypescopeContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.const`.
	 * @param ctx the parse tree
	 */
	enterConst?: (ctx: ConstContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.const`.
	 * @param ctx the parse tree
	 */
	exitConst?: (ctx: ConstContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.satisfiabilityDecl`.
	 * @param ctx the parse tree
	 */
	enterSatisfiabilityDecl?: (ctx: SatisfiabilityDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.satisfiabilityDecl`.
	 * @param ctx the parse tree
	 */
	exitSatisfiabilityDecl?: (ctx: SatisfiabilityDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.propertyDecl`.
	 * @param ctx the parse tree
	 */
	enterPropertyDecl?: (ctx: PropertyDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.propertyDecl`.
	 * @param ctx the parse tree
	 */
	exitPropertyDecl?: (ctx: PropertyDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.quantifiedPropertyDecl`.
	 * @param ctx the parse tree
	 */
	enterQuantifiedPropertyDecl?: (ctx: QuantifiedPropertyDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.quantifiedPropertyDecl`.
	 * @param ctx the parse tree
	 */
	exitQuantifiedPropertyDecl?: (ctx: QuantifiedPropertyDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.testSuiteDecl`.
	 * @param ctx the parse tree
	 */
	enterTestSuiteDecl?: (ctx: TestSuiteDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.testSuiteDecl`.
	 * @param ctx the parse tree
	 */
	exitTestSuiteDecl?: (ctx: TestSuiteDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.testConstruct`.
	 * @param ctx the parse tree
	 */
	enterTestConstruct?: (ctx: TestConstructContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.testConstruct`.
	 * @param ctx the parse tree
	 */
	exitTestConstruct?: (ctx: TestConstructContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.arrowOp`.
	 * @param ctx the parse tree
	 */
	enterArrowOp?: (ctx: ArrowOpContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.arrowOp`.
	 * @param ctx the parse tree
	 */
	exitArrowOp?: (ctx: ArrowOpContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.compareOp`.
	 * @param ctx the parse tree
	 */
	enterCompareOp?: (ctx: CompareOpContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.compareOp`.
	 * @param ctx the parse tree
	 */
	exitCompareOp?: (ctx: CompareOpContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.letDecl`.
	 * @param ctx the parse tree
	 */
	enterLetDecl?: (ctx: LetDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.letDecl`.
	 * @param ctx the parse tree
	 */
	exitLetDecl?: (ctx: LetDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.blockOrBar`.
	 * @param ctx the parse tree
	 */
	enterBlockOrBar?: (ctx: BlockOrBarContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.blockOrBar`.
	 * @param ctx the parse tree
	 */
	exitBlockOrBar?: (ctx: BlockOrBarContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.quant`.
	 * @param ctx the parse tree
	 */
	enterQuant?: (ctx: QuantContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.quant`.
	 * @param ctx the parse tree
	 */
	exitQuant?: (ctx: QuantContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.qualName`.
	 * @param ctx the parse tree
	 */
	enterQualName?: (ctx: QualNameContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.qualName`.
	 * @param ctx the parse tree
	 */
	exitQualName?: (ctx: QualNameContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.optionDecl`.
	 * @param ctx the parse tree
	 */
	enterOptionDecl?: (ctx: OptionDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.optionDecl`.
	 * @param ctx the parse tree
	 */
	exitOptionDecl?: (ctx: OptionDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.name`.
	 * @param ctx the parse tree
	 */
	enterName?: (ctx: NameContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.name`.
	 * @param ctx the parse tree
	 */
	exitName?: (ctx: NameContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.nameList`.
	 * @param ctx the parse tree
	 */
	enterNameList?: (ctx: NameListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.nameList`.
	 * @param ctx the parse tree
	 */
	exitNameList?: (ctx: NameListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.qualNameList`.
	 * @param ctx the parse tree
	 */
	enterQualNameList?: (ctx: QualNameListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.qualNameList`.
	 * @param ctx the parse tree
	 */
	exitQualNameList?: (ctx: QualNameListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.paraDeclList`.
	 * @param ctx the parse tree
	 */
	enterParaDeclList?: (ctx: ParaDeclListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.paraDeclList`.
	 * @param ctx the parse tree
	 */
	exitParaDeclList?: (ctx: ParaDeclListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.quantDeclList`.
	 * @param ctx the parse tree
	 */
	enterQuantDeclList?: (ctx: QuantDeclListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.quantDeclList`.
	 * @param ctx the parse tree
	 */
	exitQuantDeclList?: (ctx: QuantDeclListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.arrowDeclList`.
	 * @param ctx the parse tree
	 */
	enterArrowDeclList?: (ctx: ArrowDeclListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.arrowDeclList`.
	 * @param ctx the parse tree
	 */
	exitArrowDeclList?: (ctx: ArrowDeclListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.letDeclList`.
	 * @param ctx the parse tree
	 */
	enterLetDeclList?: (ctx: LetDeclListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.letDeclList`.
	 * @param ctx the parse tree
	 */
	exitLetDeclList?: (ctx: LetDeclListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.typescopeList`.
	 * @param ctx the parse tree
	 */
	enterTypescopeList?: (ctx: TypescopeListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.typescopeList`.
	 * @param ctx the parse tree
	 */
	exitTypescopeList?: (ctx: TypescopeListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.exprList`.
	 * @param ctx the parse tree
	 */
	enterExprList?: (ctx: ExprListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.exprList`.
	 * @param ctx the parse tree
	 */
	exitExprList?: (ctx: ExprListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr1`.
	 * @param ctx the parse tree
	 */
	enterExpr1?: (ctx: Expr1Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr1`.
	 * @param ctx the parse tree
	 */
	exitExpr1?: (ctx: Expr1Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr1_5`.
	 * @param ctx the parse tree
	 */
	enterExpr1_5?: (ctx: Expr1_5Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr1_5`.
	 * @param ctx the parse tree
	 */
	exitExpr1_5?: (ctx: Expr1_5Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr2`.
	 * @param ctx the parse tree
	 */
	enterExpr2?: (ctx: Expr2Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr2`.
	 * @param ctx the parse tree
	 */
	exitExpr2?: (ctx: Expr2Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr3`.
	 * @param ctx the parse tree
	 */
	enterExpr3?: (ctx: Expr3Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr3`.
	 * @param ctx the parse tree
	 */
	exitExpr3?: (ctx: Expr3Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr4`.
	 * @param ctx the parse tree
	 */
	enterExpr4?: (ctx: Expr4Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr4`.
	 * @param ctx the parse tree
	 */
	exitExpr4?: (ctx: Expr4Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr4_5`.
	 * @param ctx the parse tree
	 */
	enterExpr4_5?: (ctx: Expr4_5Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr4_5`.
	 * @param ctx the parse tree
	 */
	exitExpr4_5?: (ctx: Expr4_5Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr5`.
	 * @param ctx the parse tree
	 */
	enterExpr5?: (ctx: Expr5Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr5`.
	 * @param ctx the parse tree
	 */
	exitExpr5?: (ctx: Expr5Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr6`.
	 * @param ctx the parse tree
	 */
	enterExpr6?: (ctx: Expr6Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr6`.
	 * @param ctx the parse tree
	 */
	exitExpr6?: (ctx: Expr6Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr7`.
	 * @param ctx the parse tree
	 */
	enterExpr7?: (ctx: Expr7Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr7`.
	 * @param ctx the parse tree
	 */
	exitExpr7?: (ctx: Expr7Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr8`.
	 * @param ctx the parse tree
	 */
	enterExpr8?: (ctx: Expr8Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr8`.
	 * @param ctx the parse tree
	 */
	exitExpr8?: (ctx: Expr8Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr9`.
	 * @param ctx the parse tree
	 */
	enterExpr9?: (ctx: Expr9Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr9`.
	 * @param ctx the parse tree
	 */
	exitExpr9?: (ctx: Expr9Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr10`.
	 * @param ctx the parse tree
	 */
	enterExpr10?: (ctx: Expr10Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr10`.
	 * @param ctx the parse tree
	 */
	exitExpr10?: (ctx: Expr10Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr11`.
	 * @param ctx the parse tree
	 */
	enterExpr11?: (ctx: Expr11Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr11`.
	 * @param ctx the parse tree
	 */
	exitExpr11?: (ctx: Expr11Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr12`.
	 * @param ctx the parse tree
	 */
	enterExpr12?: (ctx: Expr12Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr12`.
	 * @param ctx the parse tree
	 */
	exitExpr12?: (ctx: Expr12Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr13`.
	 * @param ctx the parse tree
	 */
	enterExpr13?: (ctx: Expr13Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr13`.
	 * @param ctx the parse tree
	 */
	exitExpr13?: (ctx: Expr13Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr14`.
	 * @param ctx the parse tree
	 */
	enterExpr14?: (ctx: Expr14Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr14`.
	 * @param ctx the parse tree
	 */
	exitExpr14?: (ctx: Expr14Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr15`.
	 * @param ctx the parse tree
	 */
	enterExpr15?: (ctx: Expr15Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr15`.
	 * @param ctx the parse tree
	 */
	exitExpr15?: (ctx: Expr15Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr16`.
	 * @param ctx the parse tree
	 */
	enterExpr16?: (ctx: Expr16Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr16`.
	 * @param ctx the parse tree
	 */
	exitExpr16?: (ctx: Expr16Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr17`.
	 * @param ctx the parse tree
	 */
	enterExpr17?: (ctx: Expr17Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr17`.
	 * @param ctx the parse tree
	 */
	exitExpr17?: (ctx: Expr17Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.expr18`.
	 * @param ctx the parse tree
	 */
	enterExpr18?: (ctx: Expr18Context) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.expr18`.
	 * @param ctx the parse tree
	 */
	exitExpr18?: (ctx: Expr18Context) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.arrowExpr`.
	 * @param ctx the parse tree
	 */
	enterArrowExpr?: (ctx: ArrowExprContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.arrowExpr`.
	 * @param ctx the parse tree
	 */
	exitArrowExpr?: (ctx: ArrowExprContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.sexprDecl`.
	 * @param ctx the parse tree
	 */
	enterSexprDecl?: (ctx: SexprDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.sexprDecl`.
	 * @param ctx the parse tree
	 */
	exitSexprDecl?: (ctx: SexprDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.sexpr`.
	 * @param ctx the parse tree
	 */
	enterSexpr?: (ctx: SexprContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.sexpr`.
	 * @param ctx the parse tree
	 */
	exitSexpr?: (ctx: SexprContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.instDecl`.
	 * @param ctx the parse tree
	 */
	enterInstDecl?: (ctx: InstDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.instDecl`.
	 * @param ctx the parse tree
	 */
	exitInstDecl?: (ctx: InstDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.evalRelDecl`.
	 * @param ctx the parse tree
	 */
	enterEvalRelDecl?: (ctx: EvalRelDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.evalRelDecl`.
	 * @param ctx the parse tree
	 */
	exitEvalRelDecl?: (ctx: EvalRelDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.evalDecl`.
	 * @param ctx the parse tree
	 */
	enterEvalDecl?: (ctx: EvalDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.evalDecl`.
	 * @param ctx the parse tree
	 */
	exitEvalDecl?: (ctx: EvalDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.exampleDecl`.
	 * @param ctx the parse tree
	 */
	enterExampleDecl?: (ctx: ExampleDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.exampleDecl`.
	 * @param ctx the parse tree
	 */
	exitExampleDecl?: (ctx: ExampleDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.queryDecl`.
	 * @param ctx the parse tree
	 */
	enterQueryDecl?: (ctx: QueryDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.queryDecl`.
	 * @param ctx the parse tree
	 */
	exitQueryDecl?: (ctx: QueryDeclContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.numberList`.
	 * @param ctx the parse tree
	 */
	enterNumberList?: (ctx: NumberListContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.numberList`.
	 * @param ctx the parse tree
	 */
	exitNumberList?: (ctx: NumberListContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.number`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.number`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.bounds`.
	 * @param ctx the parse tree
	 */
	enterBounds?: (ctx: BoundsContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.bounds`.
	 * @param ctx the parse tree
	 */
	exitBounds?: (ctx: BoundsContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.atomNameOrNumber`.
	 * @param ctx the parse tree
	 */
	enterAtomNameOrNumber?: (ctx: AtomNameOrNumberContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.atomNameOrNumber`.
	 * @param ctx the parse tree
	 */
	exitAtomNameOrNumber?: (ctx: AtomNameOrNumberContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.bound`.
	 * @param ctx the parse tree
	 */
	enterBound?: (ctx: BoundContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.bound`.
	 * @param ctx the parse tree
	 */
	exitBound?: (ctx: BoundContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.boundLHS`.
	 * @param ctx the parse tree
	 */
	enterBoundLHS?: (ctx: BoundLHSContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.boundLHS`.
	 * @param ctx the parse tree
	 */
	exitBoundLHS?: (ctx: BoundLHSContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.bindRHSUnion`.
	 * @param ctx the parse tree
	 */
	enterBindRHSUnion?: (ctx: BindRHSUnionContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.bindRHSUnion`.
	 * @param ctx the parse tree
	 */
	exitBindRHSUnion?: (ctx: BindRHSUnionContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.bindRHSProduct`.
	 * @param ctx the parse tree
	 */
	enterBindRHSProduct?: (ctx: BindRHSProductContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.bindRHSProduct`.
	 * @param ctx the parse tree
	 */
	exitBindRHSProduct?: (ctx: BindRHSProductContext) => void;

	/**
	 * Enter a parse tree produced by `ForgeParser.bindRHSProductBase`.
	 * @param ctx the parse tree
	 */
	enterBindRHSProductBase?: (ctx: BindRHSProductBaseContext) => void;
	/**
	 * Exit a parse tree produced by `ForgeParser.bindRHSProductBase`.
	 * @param ctx the parse tree
	 */
	exitBindRHSProductBase?: (ctx: BindRHSProductBaseContext) => void;
}

