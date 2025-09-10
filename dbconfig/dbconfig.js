import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`dabatase Connected successfully`);

    // Best-effort: drop stale unique index on 'code' in faculties if it exists
    try {
      const db = mongoose.connection.db;
      const coll = db.collection("faculties");
      const indexes = await coll.indexes();
      const hasCodeIndex = indexes.some((idx) => idx.name === "code_1");
      if (hasCodeIndex) {
        await coll.dropIndex("code_1");
        console.log("Dropped stale index faculties.code_1");
      }
    } catch (idxErr) {
      // Ignore index cleanup errors; not fatal
      console.warn("Index cleanup skipped:", idxErr.message);
    }
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;