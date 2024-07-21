const fs = require('fs');
const path = require('path');
const { Parser } = require('./forge');
const { describe, test, beforeAll, expect } = require('@jest/globals');

// Helper to read input files
function readInput(filename) {
    return fs.readFileSync(filename, 'utf8');
}

// Helper to get all .frg files in the tests dir
function getTestFiles(dir) {
    return fs.readdirSync(dir).filter(file => file.endsWith('.frg'));
}

describe('Forge Parser', () => {
    let parser;

    beforeAll(() => {
        parser = new Parser();
    });

    const posTestFilesDir = path.join(__dirname, 'tests', 'positive');
    const posTestFiles = getTestFiles(posTestFilesDir);

    describe('Positive Tests', () => {
        posTestFiles.forEach(file => {
            test(`should parse ${file}`, () => {
                const input = readInput(path.join(posTestFilesDir, file));
                expect(() => parser.parse(input)).not.toThrow();
            });
        });
    });

    const negTestFilesDir = path.join(__dirname, 'tests', 'negative');
    const negTestFiles = getTestFiles(negTestFilesDir);

    describe('Negative Tests', () => {
        negTestFiles.forEach(file => {
            test(`should throw error in ${file}`, () => {
                const input = readInput(path.join(negTestFilesDir, file));
                expect(() => parser.parse(input)).toThrow();
            });
        });
    });

    const regTestFilesDir = path.join(__dirname, 'tests', 'regression');
    const regTestFiles = getTestFiles(regTestFilesDir);

    describe('Regression Tests', () => {
        //regTestFiles.forEach(file => {
        //    test(`should parse ${file}`, () => {
        //        const input = readInput(path.join(regTestFilesDir, file));
        //        expect(() => parser.parse(input)).not.toThrow();
        //    });
        //});
    });

    describe('Performance Tests', () => {
        //test('should parse large input efficiently', () => {
        //    const largeInput = '#lang forge\n'.repeat(1000);
        //    const start = Date.now();
        //    expect(() => parser.parse(largeInput)).not.toThrow();
        //    const duration = Date.now() - start;
        //    console.log(`Parsing time: ${duration}ms`);
        //    expect(duration).toBeLessThan(1000); // Ensure it parses within 1s 
        //});

        // Add more performance tests
    });
});

