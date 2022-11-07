import _ from 'lodash';
import { getUserProfile } from "../webhooks/slack/slack.service";

const verifyAndParseHeaders = async (req, res, next) => {
    const { userslackid, channel } = req.headers;

    if (userslackid) {
        req.userSlackId = userslackid;
        const profile = await getUserProfile(req.userSlackId);
        req.profile = _.get(profile, 'user');
    }
    if (channel) {
        req.channel = channel;
    }
    next();
}

export default verifyAndParseHeaders;