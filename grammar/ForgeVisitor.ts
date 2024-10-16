// Generated from grammar/Forge.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ForgeParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ForgeVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ForgeParser.alloyModule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlloyModule?: (ctx: AlloyModuleContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.importDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportDecl?: (ctx: ImportDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.paragraph`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParagraph?: (ctx: ParagraphContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.sigDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSigDecl?: (ctx: SigDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.sigExt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSigExt?: (ctx: SigExtContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.mult`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMult?: (ctx: MultContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.arrowMult`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowMult?: (ctx: ArrowMultContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.helperMult`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHelperMult?: (ctx: HelperMultContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.paraDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParaDecl?: (ctx: ParaDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.quantDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantDecl?: (ctx: QuantDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.arrowDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowDecl?: (ctx: ArrowDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.predType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPredType?: (ctx: PredTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.predDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPredDecl?: (ctx: PredDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.funDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunDecl?: (ctx: FunDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.paraDecls`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParaDecls?: (ctx: ParaDeclsContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.assertDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssertDecl?: (ctx: AssertDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.cmdDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmdDecl?: (ctx: CmdDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.testDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestDecl?: (ctx: TestDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.testExpectDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestExpectDecl?: (ctx: TestExpectDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.testBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestBlock?: (ctx: TestBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.scope`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScope?: (ctx: ScopeContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.typescope`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypescope?: (ctx: TypescopeContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.const`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConst?: (ctx: ConstContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.satisfiabilityDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSatisfiabilityDecl?: (ctx: SatisfiabilityDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.propertyDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertyDecl?: (ctx: PropertyDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.quantifiedPropertyDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantifiedPropertyDecl?: (ctx: QuantifiedPropertyDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.testSuiteDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestSuiteDecl?: (ctx: TestSuiteDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.testConstruct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTestConstruct?: (ctx: TestConstructContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.arrowOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowOp?: (ctx: ArrowOpContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.compareOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompareOp?: (ctx: CompareOpContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.letDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLetDecl?: (ctx: LetDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock?: (ctx: BlockContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.blockOrBar`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlockOrBar?: (ctx: BlockOrBarContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.quant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuant?: (ctx: QuantContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.qualName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualName?: (ctx: QualNameContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.optionDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptionDecl?: (ctx: OptionDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitName?: (ctx: NameContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.nameList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNameList?: (ctx: NameListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.qualNameList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualNameList?: (ctx: QualNameListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.paraDeclList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParaDeclList?: (ctx: ParaDeclListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.quantDeclList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantDeclList?: (ctx: QuantDeclListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.arrowDeclList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowDeclList?: (ctx: ArrowDeclListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.letDeclList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLetDeclList?: (ctx: LetDeclListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.typescopeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypescopeList?: (ctx: TypescopeListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.exprList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprList?: (ctx: ExprListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr1`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr1?: (ctx: Expr1Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr1_5`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr1_5?: (ctx: Expr1_5Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr2?: (ctx: Expr2Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr3`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr3?: (ctx: Expr3Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr4`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr4?: (ctx: Expr4Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr4_5`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr4_5?: (ctx: Expr4_5Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr5`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr5?: (ctx: Expr5Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr6`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr6?: (ctx: Expr6Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr7`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr7?: (ctx: Expr7Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr8`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr8?: (ctx: Expr8Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr9`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr9?: (ctx: Expr9Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr10`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr10?: (ctx: Expr10Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr11`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr11?: (ctx: Expr11Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr12`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr12?: (ctx: Expr12Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr13`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr13?: (ctx: Expr13Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr14`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr14?: (ctx: Expr14Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr15`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr15?: (ctx: Expr15Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr16`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr16?: (ctx: Expr16Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr17`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr17?: (ctx: Expr17Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.expr18`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr18?: (ctx: Expr18Context) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.arrowExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowExpr?: (ctx: ArrowExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.sexprDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSexprDecl?: (ctx: SexprDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.sexpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSexpr?: (ctx: SexprContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.instDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstDecl?: (ctx: InstDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.evalRelDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvalRelDecl?: (ctx: EvalRelDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.evalDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvalDecl?: (ctx: EvalDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.exampleDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExampleDecl?: (ctx: ExampleDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.queryDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueryDecl?: (ctx: QueryDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.numberList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberList?: (ctx: NumberListContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.bounds`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBounds?: (ctx: BoundsContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.atomNameOrNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomNameOrNumber?: (ctx: AtomNameOrNumberContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.bound`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBound?: (ctx: BoundContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.boundLHS`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoundLHS?: (ctx: BoundLHSContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.bindRHSUnion`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBindRHSUnion?: (ctx: BindRHSUnionContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.bindRHSProduct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBindRHSProduct?: (ctx: BindRHSProductContext) => Result;

	/**
	 * Visit a parse tree produced by `ForgeParser.bindRHSProductBase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBindRHSProductBase?: (ctx: BindRHSProductBaseContext) => Result;
}

