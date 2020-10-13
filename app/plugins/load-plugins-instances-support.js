/**
 * Loads all files on the current folder, placing them in the fastify instance <br>
 * The instance can be obtained with fastify.businessErrors(); <br>
 *
 */

const fp = require('fastify-plugin');
const fs = require("fs");
const path = require("path");

module.exports = fp(async(fastify, options) => {

    const loadPluginsInstancesSupport = async (dirName, baseName, ignoredFiles, decorateName) =>{
        
        const instances = {};
        const files = [];
        const filterIgnore = ignoredFiles || false;
        
        const logger = fastify.logger();

        fs.readdirSync(dirName)
        .filter((file) => {
            return (
                file.indexOf(".") !== 0 &&
                file !== baseName &&
                file.slice(-3) === ".js" &&
                (!filterIgnore.includes(file))
            );
        })
        .forEach((file) => {
            const fileObj = require(path.join(dirName, file));
            const prefix = fileObj.name;
            
            //info array to print on below logger
            files.push(prefix);

            // the fileObj require will be inserted on "const instances = {};" with name of file
            instances[prefix] = fileObj;
        });
        
        logger.debug(`********** Decorate: ${decorateName} **********`);
        logger.info(`********** Instances: ${files} **********`);
        
        fastify.decorate(decorateName, () => instances);
    };

    fastify.decorate('loadPluginsInstances', () => loadPluginsInstancesSupport);

});