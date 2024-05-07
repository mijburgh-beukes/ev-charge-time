import { Hono } from "hono";
import * as elements from "typed-html";
const css = await Bun.file("css/style.css").text();

const state = {
  manufacturer: "",
  model: "",
  generation: "",
};

const app = new Hono();
app
  .get("/", (c) =>
    c.html(
      <BaseHtml>
        <BaseGrid>
          <div class="col-span-10 grid grid-cols-10 gap-4">
            <Select
              {...selectManufacturer}
              className="col-start-5 col-span-6"
            />
          </div>
        </BaseGrid>
      </BaseHtml>
    )
  )
  .post("/manufacturer", async (c) => {
    const mf = (await c.req.formData()).get("manufacturer");
    state.manufacturer = mf?.toString() ?? "";
    switch (mf) {
      case "nissan":
        selectModel.options = ["leaf", "ariya"];
        break;

      default:
        break;
    }
    return c.html(
      <div class="col-span-10 grid grid-cols-10 gap-4">
        <div
          class="col-span-3 flex flex-col gap-2 border-y border-neutral-300 bg-neutral-50 p-4"
          id="history"
        >
          <div>
            <p class="text-xs text-neutral-300 capitalize">Manufacturer</p>
            <p class="capitalize">{mf}</p>
          </div>
        </div>
        <Select {...selectModel} className="col-start-5 col-span-6" />
      </div>
    );
  })
  .post("/model", async (c) => {
    const md = (await c.req.formData()).get("model");
    state.model = md?.toString() ?? "";
    switch (md) {
      case "leaf":
        {
          selectGeneration.options = ["ZE0", "ZE1"];
        }
        break;
      default:
        break;
    }
    return c.html(
      `${(<HistoryItem category="Model" item={md!.toString()} />)}
        ${(
          <Select {...selectGeneration} className="col-start-5 col-span-6" />
        )}`
    );
  });

export default app;

interface SelectProps {
  name: string;
  id: string;
  options?: string[];
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
};

const selectGeneration: SelectProps = {
  name: "generation",
  id: "gn-select",
};

const Select = (props: SelectProps) => {
  const { name, id, options, className = "" } = props;
  if (!options || options.length < 1)
    return <div class="">No {name} options available</div>;
  return (
    <div class={className}>
      <label for={name} class="capitalize text-neutral-400">
        {name}
      </label>
      <select
        name={name}
        id={id}
        class={`px-0 w-full border-t-2 border-x-0 border-b-0 border-neutral-200 capitalize  focus:ring-0 focus:ring-transparent focus:border-neutral-200 hover:font-bold transition-all`}
        required="true"
        hx-trigger="change changed"
        hx-post={`/${name}`}
        hx-target="closest div"
        hx-swap="outerHTML transition:true"
      >
        <option value=""></option>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

const HistoryItem = ({
  category,
  item,
}: {
  category: string;
  item: string;
}) => (
  <div hx-swap-oob="beforeend:#history">
    <div>
      <p class="text-xs text-neutral-300 capitalize">{category}</p>
      <p class="capitalize">{item}</p>
    </div>
  </div>
);

const BaseHtml = ({ children }: elements.Children) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/htmx.org@1.9.11" integrity="sha384-0gxUXCCR8yv9FM2b+U3FDbsKthCI66oH5IA9fHppQq9DDMHuMauqq1ZHBpJxQ0J0" crossorigin="anonymous"></script>
  <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
  <style>${css}</style>
  <title>EV Charge Time</title>
</head>
<body class="flex w-full h-screen justify-center items-center plex-regular">
  ${children}
</body>
</html>`;

const BaseGrid = ({ children }: elements.Children) => (
  <div class="max-w-7xl w-full grid grid-cols-12 gap-4 mx-4">{children}</div>
);
