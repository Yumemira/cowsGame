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


        client.connect();

        return new Promise(function (resolve, reject){
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
    }
}