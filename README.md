### Instructions:

1. Run: npm install
2. Run: npm dev-migration:generate -- migrations_name { Note: generate migration folder and metro-event-db(sqlite) in the root folder }
3. Run: npm dev-migration:run { populates/updates the metro-event-db }
4. Run: npm run serve


### Current api endpoints

1. Create user POST: /metro/users
2. Get all users GET: /metro/users
3. Login user POST: /metro/login
4. Create event POST: /metro/event

###### Samples sa kani na api calls kay naa sa postman, pd ra sa nimo macheck sad kung unsa ang imo ebody sa ilaha src/metro/dto

###### Install sad og sqlite [sqlite](https://sqlitebrowser.org/) 


###### Resources:

[Type Orm (ManyToMany, OneToOne, OneToMany, ManyToOne)](https://orkhan.gitbook.io/typeorm/docs)


##### Important Files To Consider

1. ormconfig.ts
2. src/app.service.ts
3. app.module.ts
4. all entities/models location: src/metro/entities