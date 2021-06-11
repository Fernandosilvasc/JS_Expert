import chalk from "chalk";
import chalkTable from "chalk-table";
import DraftLog from "draftlog";
import readLine from "readline";

import database from "../database.json";
import Person from "./person.js";

DraftLog(console).addLineListener(process.stdin);

const DEFAULT_LANG = "en";

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.magenta("Vehicles") },
    { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
    { field: "from", name: chalk.cyan("From") },
    { field: "to", name: chalk.cyan("To") },
  ],
};

const table = chalkTable(
  options,
  database.map((item) => new Person(item).formatted(DEFAULT_LANG))
);
console.log("\n");
const print = console.draft(table);
console.log("\n");

// setInterval(() => {
//   database.push({
//     id: Date.now(),
//     vehicles: ["Test" + Date.now()],
//   });
//   const table = chalkTable(options, database);
//   print(table);
// }, 400);

// const terminal = readLine.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// terminal.question(
//   "What is your name?",
//   (msg) => {
//     console.log("msg", msg);
//   },
//   400
// );
