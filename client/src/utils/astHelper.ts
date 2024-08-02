import * as forgeParser from '../../../parser/forge';

// This is just basically storing the whole ast, which is kinda questionsable
export class ASTCache {
	private cache: Map<string, { ast: any, version: number, lastAccessed: number }> = new Map();
	private maxSize: 50; // What is a good number?

	get(uri: string, version: number): any | undefined {
		const cached = this.cache.get(uri);
		if (cached && cached.version === version) {
			cached.lastAccessed = Date.now();
			return cached.ast;
		}
		return undefined;
	}

	set(uri: string, ast: any, version: number): void {
		if (this.cache.size >= this.maxSize) {
			this.truncateCache();
		}
		console.log(`Updating cache for: ${uri}`);
		this.cache.set(uri, { ast, version, lastAccessed: Date.now() });
	}

	delete(uri: string): void {
		this.cache.delete(uri);
	}

	clear(): void {
		this.cache.clear();
	}

	private truncateCache(): void {
		// Have to sort, dont want to tho
		const sortedEntries = [...this.cache.entries()].sort(
			(a, b) => a[1].lastAccessed - b[1].lastAccessed
		);
		// Need to remove accordingly
	}
}

export const astCache = new ASTCache();

export function parseAndCacheDocument(uri: string, text: string, version: number): any {
	// TODO: make this better
	try {
		const ast = forgeParser.parse(text);
		console.log(`Successfully parsed document: ${uri}`);
		astCache.set(uri, ast, version);
		return ast;
	} catch (error) {
		console.error('Error parsing Forge code:', error);
		return null;
	}
}

export function collectDefinitions(ast: any): any[] {
	// Dummy traversal for now
	const definitions = [];

	function traverse(node) {
		if (node.type === 'definition') { // Need to change this accordingly
			definitions.push(node);
		}
		for (const child of node.children || []) {
			traverse(child);
		}
	}

	traverse(ast);
	return definitions;
}
