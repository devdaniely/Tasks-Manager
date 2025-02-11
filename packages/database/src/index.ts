import pgPromise from "pg-promise";

export default class DatabaseConnector {
    private pgp: any;
    private db: any;

    constructor() {
        this.pgp = pgPromise();
        this.db = this.pgp({
            host: 'localhost',
            port: 5432,
            database: 'pirrosdb',
            user: 'appuser',
            password: 'pirrospw',
            max: 10, // Limit connections to prevent overload
            idleTimeoutMillis: 5000 // Close idle connections after 30s
        });
        console.log("Constructed DatabaseConnector");
    }

    async getUsers(): Promise<any> {
        console.log("test db connect");
        return this.db.any('SELECT * FROM "Users"');
        /*
        this.db.any('SELECT * FROM "Users"')
            .then((data) => {
                console.log('DATA:', data)
                users = data
            })
            .catch((error) => {
                console.log('ERROR:', error)
            })*/
    }



}





