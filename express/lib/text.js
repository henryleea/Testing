const request = require('request');
const crypto = require('crypto');

const log      = require('./log');
const config      = require('./config');

module.exports = {
    semantic: (req, res) => {

        if (!req.body.query) {
            res.send('invalid query')
        } else {
            log.info(req.body.query);

            let curTime = parseInt(new Date().getTime() / 1000);

            let paramStr = JSON.stringify({
                "scene": config.scene,
                "userid": config.userid
            })

            let param = Buffer.from(paramStr).toString('base64');

            let text = Buffer.from(req.body.query).toString('base64');

            let http_body = 'text=' + text;

            let checkStr = config.apiKey + curTime + param + http_body;

            let checkSum = crypto.createHash('md5').update(checkStr).digest('hex');

            let options = {
                url: config.semantic_url,
                headers: {
                    "X-Appid": config.appid,
                    "X-CurTime": curTime,
                    "X-Param": param,
                    "X-CheckSum": checkSum
                },
                form: {
                    "text": text
                }
            }

            request.post(options, (error, response, body) => {
                if (error) {
                    log.error(error);
                    res.send(error);
                } else {
                    log.info('query success!')
                    res.send(body);
                }
            });
        }
    }
}