import mongoose from "mongoose";

async function connection(url) {
   await mongoose
    .connect(url)
    .then(() => console.log("db is connected"))
    .catch((err) => console.log(err));
}
export { connection };

