import * as path from 'path';
import * as os from 'os';


export function tempFile(): string {
	const tempDir = os.tmpdir();
	const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const length = 10;
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}

	return path.join(tempDir, result + '.rkt');
}

export function combineTestsWithModel(wheatText: string, tests: string): string {
	// todo: What if separator doesn't exist (in that case, look for #lang forge)
	const TEST_SEPARATOR = "//// Do not edit anything above this line ////"
	const hashlang_decl = "#lang";

	if (tests.includes(TEST_SEPARATOR)) {
		const startIndex = tests.indexOf(TEST_SEPARATOR) + TEST_SEPARATOR.length;
		tests = tests.substring(startIndex).trim();
	}

	tests = tests.replace(hashlang_decl, "// #lang");

	var combined = wheatText + "\n" + tests;
	combined = removeForgeComments(combined);

	combined = combined.replace(/\t/g, " ");
	combined = combined.replace(/\r/g, " ");
	

	return combined;
