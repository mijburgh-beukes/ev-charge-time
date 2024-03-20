/* import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello World!").listen(3000); */
// console.log(`Elysia is running at http://`);
import * as elements from "typed-html";
const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Welcome to Bun!");
  },
});

console.log(`Listening on localhost:${server.port}`);

const base = ({ children }: elements.Children) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="css/style.css" rel="stylesheet">
  <title>EV Charge Time</title>
</head>
<body>
  ${children}
</body>
</html>`;
