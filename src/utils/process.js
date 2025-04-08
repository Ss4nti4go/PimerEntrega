import { Command } from "commander";

const program = new Command();

program
.option('-p <port>', 'Port number', 8080)
.option('-l --letters [letters...]', 'resto')
.option('--mode <mode>', 'Mode', 'production')
.parse();

console.log("Options:", program.opts());
console.log("Args:", program.args);

export default program;