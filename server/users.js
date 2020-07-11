class User {
    constructor(uid, username, connection)
    {
        this.uid = uid;
        this.username = username;
        this.connection = connection;
    }

    disconnect ()
    {
        this.connection.close();
    }
}


module.exports = User;