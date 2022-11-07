import Pusher from 'pusher';
import {
  PUSHER_API_KEY,
  PUSHER_API_SECRET,
  PUSHER_APP_ID,
  PUSHER_CLUSTER
} from '../../common/env';

const PusherClient: any = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_API_KEY,
  secret: PUSHER_API_SECRET,
  cluster: PUSHER_CLUSTER,
  useTLS: true
});

export default PusherClient;
