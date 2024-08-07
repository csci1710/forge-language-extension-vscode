import * as vscode from 'vscode';
import { astCache, parseAndCacheDocument, collectDefinitions } from './astHelper';

export class ForgeDefinitionProvider implements vscode.DefinitionProvider {
	provideDefinition(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken
	): vscode.ProviderResult<vscode.Definition | vscode.LocationLink[]> {
		console.log(`Providing definition for ${document.uri.toString()} at position ${position.line}:${position.character}`);
		const wordRange = document.getWordRangeAtPosition(position);
		console.log(`Word range ${JSON.stringify(wordRange)}`);
		const word = document.getText(wordRange);
		console.log(`Word ${word}`);
	
		let ast = astCache.get(document.uri.toString(), document.version);
		console.log(`Ast: ${JSON.stringify(ast)}`);
	
		if (!ast) {
			ast = parseAndCacheDocument(document.uri.toString(), document.getText(), document.version);
			if (!ast) return null;
		}
	
		const definitions = collectDefinitions(ast);
		console.log(`Definitions: ${JSON.stringify(definitions)}`);
		const relevantDefinition = this.findRelevantDefinition(definitions, word, position);
		console.log(`Relevant definition: ${JSON.stringify(relevantDefinition, null, 2)}`);

		const loc = relevantDefinition.location;
	
		if (relevantDefinition && relevantDefinition.location) {
			const range = new vscode.Range(
				loc.first_line -1,
				loc.first_column,
				loc.last_line - 1,
				loc.last_column
			);
	
			return new vscode.Location(document.uri, range);
		}
	
		return null;
	}

	private findRelevantDefinition(definitions: any[], word: string, position: vscode.Position): any {
		const matchingDefs = definitions.filter(def => def.name === word);
		console.log(JSON.stringify(matchingDefs, null, 2));
	
		if (matchingDefs.length === 0) return null;
		if (matchingDefs.length === 1) return matchingDefs[0];
	
		return matchingDefs.reduce((closest, current) => {
			if (!closest) return current;

			const location = current.location;
	
			if (location && 
				location.first_line <= position.line &&
				location.first_line > (closest.name.location?.first_line ?? -1)) {
				return current;
			}

	
			return closest;
		}, null);
	}
}
