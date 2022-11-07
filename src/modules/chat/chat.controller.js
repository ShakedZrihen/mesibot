import { Router } from 'express';
import moment from 'moment';
import _ from 'lodash';
import chatEvents from './chat.events';


const chatRouter = Router();

chatRouter.post('/newMessage', (req, res) => {
    const { message } = req.body;
    const { profile, channel } = req;
    console.log({ profile });
    const pusher = req.app.get('pusher');
    const newMessagePayload = {
        content: message,
        sentAt: moment(),
        author: _.get(profile, 'real_name')
    }
    pusher.trigger(channel, chatEvents.NEW_MESSAGE, newMessagePayload)
    res.send();
})

export default chatRouter;