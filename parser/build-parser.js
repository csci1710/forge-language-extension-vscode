const { exec } = require('child_process');
const path = require('path');

// Path to the grammar file
const grammarFile = path.join(__dirname, 'grammar', 'forge.y');
const lexFile = path.join(__dirname, 'grammar', 'forge.l');

// Command to generate the parser
const command = `jison ${grammarFile} ${lexFile}`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Stdout: ${stdout}`);
});

