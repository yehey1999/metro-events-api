### Instructions:

1. Run: npm install
2. Run: npm dev-migration:generate -- migrations_name { Note: generate migration folder and metro-event-db(sqlite) in the root folder }
3. Run: npm dev-migration:run { populates/updates the metro-event-db }
4. Run: npm run serve

Note: if mu error ang 2 and 3 tungod sa mga constraints, delete ang metro-event-db og ang migration folder, then repeat 2 and 3.

### Current api endpoints

Base URL: http://localhost:3000/metro

###### Users
1. Login user POST: /login
2. Create user POST: /users
3. Get all users GET: /users
4. Get user by id GET: /users/:id
5. Update user PATCH: /users/:id
6. Get user sent requests GET: /users/:id/requests
7. Get user created events (organizer) GET: /users/:id/created-events

###### Events
1. Create event POST: /events
2. Get all events GET: /events
3. Get event by id GET: /events/:id
4. Get event requests GET: /events/:id/requests

##### Requests
1. Create Request (type: ['join event' || 'request to organizer || request to admin]') POST: /metro/requests/
2. Update Request POST: /requests
3. Get All Requests GET: /requests

##### Reviews
1. Create Event Review POST: /reviews/events/:id
2. Get All Event Reviews GET: /reviews/events/:id
3. Delete Event DELETE: /reviews/events/:id

###### Samples sa kani na api calls kay naa sa postman, pd ra sa nimo macheck sad kung unsa ang imo ebody sa ilaha src/metro/dto

###### Install sad og sqlite [sqlite](https://sqlitebrowser.org/) 


###### Resources:

[Type Orm (ManyToMany, OneToOne, OneToMany, ManyToOne)](https://orkhan.gitbook.io/typeorm/docs), bidirectional


##### Important Files To Consider

1. ormconfig.ts
2. src/app.service.ts
3. app.module.ts
4. all entities/models location: src/metro/entities
