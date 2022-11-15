const { Client } = require("pg");

module.exports = {
    queryToDb: function(que)
    {
        const client = new Client({
            user: 'commonmanager',
            host: 'localhost',
            database: 'CowBullGameBase',
            password: 'hant8312',
            port: 23014
        });



        return new Promise(function (resolve, reject){
            client.connect();

            client.query(que, (err, res) => {
                if (err)
                {
                    console.error(err);
                    reject(0);
                }

                client.end();
                resolve(res.rows);
            });
        });
    },

    unicNumGenerator: function()
    {
        return parseInt(Math.random()*1000000);
    }
}