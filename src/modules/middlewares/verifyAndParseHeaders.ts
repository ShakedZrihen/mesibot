
const verifyAndParseHeaders = (req, res, next) => {
    const { userslackid, channel } = req.headers;
    if (userslackid)
        req.userSlackId = userslackid;
    if (channel)
        req.channel = channel;
    next();
}

export default verifyAndParseHeaders;