import io from 'socket.io-client';
import env from 'env';
import logger from 'logger';

// TODO: QuanNM get token from localStorage or Cookies
const token = env.TOKEN_TEMP;
function Socket() {
  this.socket = io.connect(env.API_URL, {
    path: '/socket',
  });
  this.socket.on('connect', () => {
    this.socket
      .emit('authenticate', {
        token,
      }) // send the jwt
      .on('authenticated', () => {
        logger.info('Has connected with socket!!!');
      })
      .on('unauthorized', (msg) => {
        logger.error(`Socket Unauthorized: ${JSON.stringify(msg.data)}`);
        throw new Error(msg.data.type);
      });
  });
}

const socket = new Socket();

export {
  socket,
};
