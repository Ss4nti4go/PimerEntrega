import { RouterClass } from "./router.js";

export class UsersRouter extends RouterClass {
    init() {
        this.get("/users", ["ADMIN"], (req, res) => {
           try {
            res.sendSuccess([]);
           } catch (error) {
            res.sendServerError(error);
           }
        });
        this.post("/users", (req, res) => {
            res.send("post users");
        });
        this.put("/users", (req, res) => {
            res.send("put users");
        });
        this.delete("/users", (req, res) => {
            res.send("delete users");
        });
    }
}

