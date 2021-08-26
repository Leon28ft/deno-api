import { Application } from "./deps.ts";

import router from './routes/index.routes.ts';

const app = new Application();

/* app.use((ctx) => {
  ctx.response.body = "Hello World!";
}); */

app.use(router.routes());
app.use(router.allowedMethods());

/* console.log('Server running on port', 1993); */

await app.listen({ port: 1993 });
