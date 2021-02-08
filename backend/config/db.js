import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connected to DB @ ${connection.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Could not connect to Database in /config/db.js`.red.inverse);
    process.exit(1);
  }
};
