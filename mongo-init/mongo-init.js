db = db.getSiblingDB('unipeak-data-base');

db.createCollection('users');

db.createUser(
    {
        user: "api-user",
        pwd: "api-pwd",
        roles: [
            {
                role: "readWrite",
                db: "unipeak-data-base"
            }
        ]
    }
);

// db.sample_collection.insertMany([
//  {
//     org: 'helpdev',
//     filter: 'EVENT_A',
//     addrs: 'http://rest_client_1:8080/wh'
//   },
//   {
//     org: 'helpdev',
//     filter: 'EVENT_B',
//     addrs: 'http://rest_client_2:8081/wh'
//   },
//   {
//     org: 'github',
//     filter: 'EVENT_C',
//     addrs: 'http://rest_client_3:8082/wh'
//   }  
// ]);