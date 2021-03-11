import { config } from "dotenv";

config();

console.log(process.env.DECLARED_VARIABLE);
console.log(process.env.UNDECLARED_VARIABLE);
