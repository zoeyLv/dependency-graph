import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import styleImport from './utils/style-import'
import "./assets/main.css";

let app = createApp(App);
app = styleImport(app)

app.use(router);

app.mount("#app");
