import dotenv from 'dotenv';
dotenv.load();

export default {
  'mongo-url': process.env.MONGOLAB_URI,
  'mongo-cache-seconds': process.env.MONGO_CACHE_SECONDS,
  'github-name': process.env.GITHUB_NAME
};
