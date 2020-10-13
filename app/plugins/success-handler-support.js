/**
 * Every successful return will be translated here, returning the respective statusCode
 */

const fp = require('fastify-plugin');

const statusCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204
}

module.exports = fp(async (fastify, options) => {

    /**
     * Indicates statusCode 200 in the response. Request OK
     * @param reply
     * @param data
     * @returns {{}|*}
     */
    const ok = (reply, data) => {
        reply.code(statusCode.OK);
        if(data){
            return data;
        }
        else{
            return {};
        }
    };

    /**
     * Indicates statusCode 201 in the response. Resource created.
     * @param reply
     * @param data
     * @returns {*}
     */
    const created = (reply, data) => {
        reply.code(statusCode.CREATED);
        return data;
    };


    fastify.decorate('successHandler', () => {
        return { ok, created };
    });

});
