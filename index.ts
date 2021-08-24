import { Application } from "https://deno.land/x/oak/mod.ts";

import router from './routes/index.routes.ts';

const app = new Application();

/* app.use((ctx) => {
  ctx.response.body = "Hello World!";
}); */

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server running on port', 8000);

await app.listen({ port: 8000 });
