const fp = require('fastify-plugin');

module.exports = fp(async(fastify, options) => {
    const loadPLuginsInstancesSupport = (fsreaddirSync, filter, decorateName) =>{

        const instances = {};

        fsreaddirSync.filter((file) => {
            return (
                file.indexOf(".") !== 0 &&
                file !== basename &&
                file.slice(-3) === ".js" &&
                (filter || true)
            );
        })
            .forEach((file) => {
                const fileObj = require(path.join(__dirname, file));
                const prefix = fileObj.name;

                instances[prefix] = file;
            });

        fastify.decorate(decorateName, () => instances);
    };

    fastify.decorate('loadPluginsInstances', (fsreaddirSync, filter, decorateName) => loadPLuginsInstancesSupport(fsreaddirSync, filter, decorateName));
});