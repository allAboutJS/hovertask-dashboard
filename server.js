import express from "express";
import path from "node:path";

const app = express();
const port = process.env.PORT || "3000";

app.use(express.static("./public"));
app.use(express.static("./pages"));
app.get("*", (req, res) => {
    const hostname = "http://localhost:3000";
    res.sendFile(path.resolve(process.cwd(), "./pages" + new URL(req.url, hostname).pathname + ".html"));
});
app.listen(port, () => console.log("Server started."));
