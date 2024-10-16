import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { ForgeListener } from './ForgeListener';
import { ForgeParser } from './ForgeParser';
import { ForgeLexer } from './ForgeLexer';


// Example usage
const input = "#lang forge";
const inputStream = CharStreams.fromString(input);
const lexer = new ForgeLexer(inputStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new ForgeParser(tokenStream);

// Parse the input and obtain the parse tree
const tree = parser.alloyModule();
console.log(tree.toStringTree(parser));