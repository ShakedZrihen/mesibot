import authRouter from "./modules/auth/auth.controller";
import { spotify } from "./modules/spotify/spotify.controller";
import { webhooks } from "./modules/webhooks/webhooks.controller";

const defineRoutes = (app) => {
    app.use('/auth', authRouter)
    app.use('/webhooks', webhooks);
    app.use('/spotify', spotify);
}

export default defineRoutes;