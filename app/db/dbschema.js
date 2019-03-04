/**
 * DB schema
 */

/**
 * Require files
 */
const MONGOCLIENT = require('mongodb');
// ----------------------------------------------------------------------------
// console.log('fone1');
module.exports.createSchema = function (req, res) {
    console.log('fone1');
    MONGOCLIENT.connect('mongodb://aswinsasi.amtpl.in:27017', { useNewUrlParser: true }, (err, client) => {

        if (err) {
            console.log('Unable to connect to server');
        } else {
            console.log('Connected to fcube server');
            const DB = client.db('fcube');

            //Users collection
            DB.createCollection("users", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["firstName",
                            "userName",
                            "passWord"
                        ],
                        properties: {
                            userName: {
                                bsonType: "string"
                            },
                            passWord: {
                                bsonType: "string"
                            },
                            firstName: {
                                bsonType: "string"
                            },
                            lastName: {
                                bsonType: "string"
                            },
                            email: {
                                bsonType: "string"
                            },
                            address1: {
                                bsonType: "string"
                            },
                            address2: {
                                bsonType: "string"
                            },
                            city: {
                                bsonType: "string"
                            },
                            state: {
                                bsonType: "string"
                            },
                            zip: {
                                bsonType: "string"
                            },
                            phoneNumber: {
                                bsonType: "array"
                            },
                            timezone: {
                                bsonType: "string"
                            },
                            profileImage: {
                                bsonType: "string"
                            }
                        }
                    }
                }, validationLevel: "off"
                // validationLevel: "strict/moderate/off"
            }),
                // Index creation for 'users'
                DB.collection("users").createIndex({ userName: 1 })
            DB.collection("users").createIndex({ firstName: 1 })
            DB.collection("users").createIndex({ lastName: 1 })
            DB.collection("users").createIndex({ profileImage: 1 })
            //-----------------------------------------------------------------

            // user_devices collection creation
            DB.createCollection("user_devices", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: [
                            "user",
                            "refreshToken"
                        ],
                        properties: {
                            deviceToken: {
                                bsonType: "string"
                            },
                            user: {
                                bsonType: "object"
                            },
                            appVersion: {
                                bsonType: "string"
                            },
                            deviceModel: {
                                bsonType: "string"
                            },
                            deviceName: {
                                bsonType: "string"
                            },
                            deviceVersion: {
                                bsonType: "string"
                            },
                            notificationStatus: {
                                bsonType: "bool"
                            },
                            platform: {
                                bsonType: "string"
                            },
                            pushToken: {
                                bsonType: "string"
                            },
                            refreshToken: {
                                bsonType: "string"
                            },
                            buildNumber: {
                                bsonType: "string"
                            },
                            brand: {
                                bsonType: "string"
                            },
                            isTablet: {
                                bsonType: "bool"
                            },
                            status: {
                                bsonType: "string"
                            },
                            timezone: {
                                bsonType: "string"
                            }

                        }
                    }
                }, validationLevel: "off"
            }),
                // Index creation for 'user_devices'
                DB.collection("user_devices").createIndex({ user: 1 })
            DB.collection("user_devices").createIndex({ notificationStatus: 1 })
            DB.collection("user_devices").createIndex({ status: 1 })
            //-----------------------------------------------------------------              
            // Inserting documents to collections
            //-----------------------------------------------------------------
            // Inserting documents into 'carriers'
            DB.collection('users').insertMany([
                {

                    "carrier": "Test Carrier 1",
                    "products": [
                        "Test Product 1-1",
                        "Test Product 1-2"
                    ]
                }
                ,

                {

                    "carrier": "Test Carrier 2",
                    "products": [
                        "Test Product 2-1",
                        "Test Product 2-2"
                    ]
                }
            ]);
            //-----------------------------------------------------------------
            // Inserting documents into 'activity_groups'
            DB.collection('user_devices').insertMany([
                {

                    "name": "Sales",
                    "type": "sales",
                    "label": "sales",
                    "created_date": new Date(),
                    "modified_date": new Date()
                }
                ,
                {

                    "name": "recruiting",
                    "type": "recruiting",
                    "label": "Recruiting",
                    "created_date": new Date(),
                    "modified_date": new Date()
                }
            ]);
            //-----------------------------------------------------------------
            res.send('Collections created and Values inserted');
            //-----------------------------------------------------------------
            DB.close();
            //-----------------------------------------------------------------
        }
    });
};