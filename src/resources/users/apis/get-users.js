const db = require('../../../db/repository');

module.exports.get = async (req, res, next) => {
    await db.execute('ll').then(response => {
        res.send({
            status: true,
            message: 'successfully get users',
            entity: response
        });

    }).catch(error => {
        res.send({
            status: false,
            message: 'Failed to get users',
            entity: null
        })
    });
}