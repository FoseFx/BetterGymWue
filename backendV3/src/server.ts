import app, { PORT, API_VERSION } from "./app"

const server = app.listen(PORT, () => {
    console.log(`Running BGW backend ${API_VERSION} on port ${PORT}`);
});

export default server;