import { Hono } from "hono";
import * as elements from "typed-html";

const app = new Hono();
app
  .get("/", (c) =>
    c.html(
      <BaseHtml>
        {/* <button hx-post="/clicked" hx-swap="outerHTML">
          Click me
        </button> */}
        <Select {...selectManufacturer} />
      </BaseHtml>
    )
  )
  .post("/clicked", (c) => c.html(Select(selectManufacturer)));

export default app;

interface SelectProps {
  name: string;
  id: string;
  options: string[];
  className?: string;
}

const selectManufacturer: SelectProps = {
  name: "manufacturer",
  id: "mf-select",
  options: ["nissan", "tesla", "bmw", "audi"],
};

function Select(props: SelectProps) {
  const { name, id, options, className = "" } = props;
  return (
    <select
      name={name}
      id={id}
      class={`${className} border-b-2 border-x-0 border-t-0 border-slate-200 capitalize  focus:ring-0 focus:ring-transparent focus:border-slate-200 hover:shadow-lg transition-shadow`}
    >
      <option value="">--{name}--</option>
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
}

// const server = Bun.serve({
//   hostname: "localhost",
//   port: 3000,
//   fetch: handler,
//   error(error) {
//     console.log(error);
//     return new Response("oops");
//   },
// });

// function handler(req: Request): Response {
//   const url = new URL(req.url);
//   switch (url.pathname) {
//     case "":
//     case "/":
//       return new Response(Bun.file("index.html"));
//     default:
//       break;
//   }
//   return new Response("Not found", { status: 404 });
// }

// console.log(`Listening on localhost:${server.hostname}:${server.port}`);

const BaseHtml = ({ children }: elements.Children) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/htmx.org@1.9.11" integrity="sha384-0gxUXCCR8yv9FM2b+U3FDbsKthCI66oH5IA9fHppQq9DDMHuMauqq1ZHBpJxQ0J0" crossorigin="anonymous"></script>
  <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
  <title>EV Charge Time</title>
</head>
<body class="flex w-full h-screen justify-center items-center">
  ${children}
</body>
</html>`;
