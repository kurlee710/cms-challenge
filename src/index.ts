// src/index.ts
import { mainMenu } from "./prompts";

async function init() {
  console.log("Welcome to the Employee Management System!");
  await mainMenu();
}

init();
