import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Set up test environment variables
process.env.JWT_SECRET = 'test-jwt-secret-key';
process.env.JWT_EXPIRES_IN = '24h';
process.env.NODE_ENV = 'test';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});