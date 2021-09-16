# college-management-application-client" 
#### Install Angular on local system
   1. clone code from git URL.
   2. install latest angular and node v12.x above.
   3  install project dependency----- use command *npm install* from terminal.
   4. To run application----use command *ng serve*.
   5. for local API , need to change path in main.ts file for environment.ts  
#### Deploy angular on FIREBASE
  ### Configuration for API URL
      go to > main.ts file. and import environment.prod.ts file for enableProd() method.
      now change API URL path in environment.prod.ts file.
   1. install firebase cli---<npm install firebase> from project root directory.
   2. type command on terminal from project root directory----<npm install -g firebase-tools>
   3. type <firebase login> and login with firebase login credentials.
   4. then---<firebase init> command. this command will give some prompt options. select desired option.
      choose these options
        What do you want to use as your public directory? www
        Configure as a single-page app (rewrite all urls to /index.html)? No
        Set up automatic builds and deploys with GitHub? No
        File www/index.html already exists. Overwrite? No
   5. finally deploy it, by using the command ----<firebase deploy> :))))

#### URL of this project
 https://college-management-client.web.app