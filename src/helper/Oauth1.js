import OAuth from 'oauth-1.0a';
import crypto from 'crypto'
/* const crypto = require('crypto');
const oauth1a = require('oauth-1.0a'); */

const CONSUMERKEY = '<consumerKey>';
const CONSUMERSECRET = '<consumerSecret>';
const TOKENKEY = '<tokenKey>';
const TOKENSECRET = '<tokenSecret>';

class Oauth1 {
    static getAuthHeaderForRequest(request) {
        const oauth = OAuth({
            consumer: { key: CONSUMERKEY, secret: CONSUMERSECRET },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return crypto
                    .createHmac('sha1', key)
                    .update(base_string)
                    .digest('base64')
            },
        })

        const authorization = oauth.authorize(request, {
            key: TOKENKEY,
            secret: TOKENSECRET,
        });

        return oauth.toHeader(authorization);
    }
}

module.exports = Oauth1;