import mongoose from "mongoose";

export const startServer = async (port, mongouri, app) => {
  try {
    await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established");

    app.listen(port, () => {
      console.log("running in a Port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};
