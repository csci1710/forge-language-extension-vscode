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
		const word = document.getText(wordRange);

		let ast = astCache.get(document.uri.toString(), document.version);

		if (!ast) {
			ast = parseAndCacheDocument(document.uri.toString(), document.getText(), document.version);
			if (!ast) return null;
		}

		const definitions = collectDefinitions(ast);
		const relevantDefinition = this.findRelevantDefinition(definitions, word, position);

		if (relevantDefinition) {
			return new vscode.Location(
				document.uri,
				new vscode.Position(relevantDefinition.line, relevantDefinition.column) // Depending on testing this might be line -1
			);
		}

		return null;
	}

	private findRelevantDefinition(definitions: any[], word: string, position: vscode.Position): any {
		const matchingDefs = definitions.filter(def => def.name === word);

		if (matchingDefs.length === 0) return null;
		if (matchingDefs.length === 1) return matchingDefs[0];

		return matchingDefs.reduce((closest, current) => {
			if (!closest) return current;

			if (current.line <= position.line && current.line > closest.line) {
				return current;
			}

			return closest;
		}, null);
	}
}
