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
        <div class="flex space-x-4">
          <Select {...selectManufacturer} />
          {/* <button
            hx-post="model"
            hx-swap="outerHTML"
            hx-target="closest div"
            class="bg-gray-200 rounded-md px-4"
          >
            Push me
          </button> */}
        </div>
        {/* <Select {...selectModel} /> */}
      </BaseHtml>
    )
  )
  .post("/manufacturer", async (c) => {
    const mf = (await c.req.formData()).get("manufacturer");

    const props: SelectProps = {
      name: "model",
      id: "md-select",
      options: [],
    };

    switch (mf) {
      case "nissan":
        props.options = ["leaf", "ariya"];
        break;

      default:
        break;
    }
    console.log(props);
    return c.html(
      <div class="flex space-x-2">
        <Select {...props} />
      </div>
    );
  });

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

const selectModel: SelectProps = {
  name: "model",
  id: "md-select",
  options: ["leaf", "ariya"],
};

function Select(props: SelectProps) {
  const { name, id, options, className = "" } = props;
  return (
    <select
      name={name}
      id={id}
      class={`${className} border-b-2 border-x-0 border-t-0 border-slate-200 capitalize  focus:ring-0 focus:ring-transparent focus:border-slate-200 hover:shadow-lg transition-shadow`}
      hx-trigger="change changed"
      hx-post={`/${name}`}
      hx-target="closest div"
      hx-swap="outerHTML transition:true"
    >
      <option value="">--{name}--</option>
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
}

const BaseHtml = ({ children }: elements.Children) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;600&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/htmx.org@1.9.11" integrity="sha384-0gxUXCCR8yv9FM2b+U3FDbsKthCI66oH5IA9fHppQq9DDMHuMauqq1ZHBpJxQ0J0" crossorigin="anonymous"></script>
  <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
  <link href="css/style.css" rel="stylesheet" >
  <title>EV Charge Time</title>
</head>
<body class="flex w-full h-screen justify-center items-center">
  ${children}
</body>
</html>`;
