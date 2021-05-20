# defi-playground

Use the following steps to deploy this full-stack application. 

<b> Setup Database </b> 

1. Setup mysql server. Once setup, establish new database and user 
2. Configure database connection: database/setup.sql 
3. Launch into mysql, then 'use <database>;' and 'source ./setup.sql' 

<b> Setup Backend</b>

1. Update config to point to local db: backend/config/database.js 
2. Update backend API port if necessary (default 5000): backend/index.js
3. Run the node in bg (from backend folder) via forever module: 
./node_modules/forever/bin/forever start index.js

Primary node modules for backend: mysql, cors, express, forever 

<b> Setup Frontend </b>

Note files in this folder are the raw frontend files - this folder is used for development but not production deployment. Latest build has been generated via 'npm run build' and production  files can be found in frontend/dist. This node can be deployed to production via: 

1. On the server where backend node is created, create a new folder (we'll call it frontend-app)
2. In new folder, run 'npm init -y' 
3. In same folder, run 'npm install express forever serve-static path axios core-js vue vue-router vuetify'
4. Copy server.js and /dist (the whole folder) from this frontend repo to the new folder (frontend-app)
5. Run the node in bg (from frontend-app folder) via forever module: 
./node_modules/forever/bin/forever start server.js

Primary node modules for frontend: express, forever, serve-static,path, axios, core-js, vue, veutify, vue-router 


