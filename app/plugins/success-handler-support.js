const fp = require('fastify-plugin');

const statusCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204
}

module.exports = fp(async (fastify, options) => {

    const ok = (reply, data) => {
        reply.code(statusCode.OK);
        if(data){
            return data;
        }
        else{
            return {};
        }
    };

    const created = (reply, data) => {
        reply.code(statusCode.CREATED);
        return data;
    };

    fastify.decorate('successHandler', () => {

        return { ok, created };

    });

});