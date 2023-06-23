import * as morgan from 'morgan';
import { StreamOptions } from 'morgan';
import Logger from './logger';

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => Logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

// Build the morgan middleware
const morganMiddleware = morgan(':method :url :response-time ms - :res[content-length]', { stream });
export default morganMiddleware;
