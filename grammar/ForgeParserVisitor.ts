// Generated from grammar/ForgeParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ForgeParserParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ForgeParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ForgeParserParser.alloyModule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlloyModule?: (ctx: AlloyModuleContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.importDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportDecl?: (ctx: ImportDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.paragraph`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParagraph?: (ctx: ParagraphContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.sigDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSigDecl?: (ctx: SigDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.sigExt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSigExt?: (ctx: SigExtContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.mult`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMult?: (ctx: MultContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.arrowMult`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowMult?: (ctx: ArrowMultContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.helperMult`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHelperMult?: (ctx: HelperMultContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.paraDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParaDecl?: (ctx: ParaDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.quantDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantDecl?: (ctx: QuantDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.arrowDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowDecl?: (ctx: ArrowDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.predType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPredType?: (ctx: PredTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.predDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPredDecl?: (ctx: PredDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.funDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunDecl?: (ctx: FunDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.paraDecls`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParaDecls?: (ctx: ParaDeclsContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.assertDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssertDecl?: (ctx: AssertDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.cmdDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdDecl?: (ctx: CmdDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.testDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestDecl?: (ctx: TestDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.testExpectDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestExpectDecl?: (ctx: TestExpectDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.testBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestBlock?: (ctx: TestBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.scope`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScope?: (ctx: ScopeContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.typescope`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypescope?: (ctx: TypescopeContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.const`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConst?: (ctx: ConstContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.satisfiabilityDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSatisfiabilityDecl?: (ctx: SatisfiabilityDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.propertyDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertyDecl?: (ctx: PropertyDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.quantifiedPropertyDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantifiedPropertyDecl?: (ctx: QuantifiedPropertyDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.testSuiteDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestSuiteDecl?: (ctx: TestSuiteDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.testConstruct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestConstruct?: (ctx: TestConstructContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.arrowOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowOp?: (ctx: ArrowOpContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.compareOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompareOp?: (ctx: CompareOpContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.letDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLetDecl?: (ctx: LetDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock?: (ctx: BlockContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.blockOrBar`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlockOrBar?: (ctx: BlockOrBarContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.quant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuant?: (ctx: QuantContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.qualName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualName?: (ctx: QualNameContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.optionDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptionDecl?: (ctx: OptionDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitName?: (ctx: NameContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.nameList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNameList?: (ctx: NameListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.qualNameList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualNameList?: (ctx: QualNameListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.paraDeclList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParaDeclList?: (ctx: ParaDeclListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.quantDeclList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantDeclList?: (ctx: QuantDeclListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.arrowDeclList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowDeclList?: (ctx: ArrowDeclListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.letDeclList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLetDeclList?: (ctx: LetDeclListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.typescopeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypescopeList?: (ctx: TypescopeListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.exprList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprList?: (ctx: ExprListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr1`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr1?: (ctx: Expr1Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr1_5`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr1_5?: (ctx: Expr1_5Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr2?: (ctx: Expr2Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr3`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr3?: (ctx: Expr3Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr4`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr4?: (ctx: Expr4Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr4_5`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr4_5?: (ctx: Expr4_5Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr5`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr5?: (ctx: Expr5Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr6`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr6?: (ctx: Expr6Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr7`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr7?: (ctx: Expr7Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr8`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr8?: (ctx: Expr8Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr9`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr9?: (ctx: Expr9Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr10`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr10?: (ctx: Expr10Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr11`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr11?: (ctx: Expr11Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr12`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr12?: (ctx: Expr12Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr13`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr13?: (ctx: Expr13Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr14`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr14?: (ctx: Expr14Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr15`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr15?: (ctx: Expr15Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr16`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr16?: (ctx: Expr16Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr17`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr17?: (ctx: Expr17Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.expr18`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr18?: (ctx: Expr18Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.arrowExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowExpr?: (ctx: ArrowExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.sexprDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSexprDecl?: (ctx: SexprDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.sexpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSexpr?: (ctx: SexprContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.instDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstDecl?: (ctx: InstDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.evalRelDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvalRelDecl?: (ctx: EvalRelDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.evalDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvalDecl?: (ctx: EvalDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.exampleDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExampleDecl?: (ctx: ExampleDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.queryDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueryDecl?: (ctx: QueryDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.numberList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberList?: (ctx: NumberListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.bounds`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBounds?: (ctx: BoundsContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.atomNameOrNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomNameOrNumber?: (ctx: AtomNameOrNumberContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.bound`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBound?: (ctx: BoundContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.boundLHS`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoundLHS?: (ctx: BoundLHSContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.bindRHSUnion`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBindRHSUnion?: (ctx: BindRHSUnionContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.bindRHSProduct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBindRHSProduct?: (ctx: BindRHSProductContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParserParser.bindRHSProductBase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBindRHSProductBase?: (ctx: BindRHSProductBaseContext) => Result;
}

