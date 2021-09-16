# college-management-application-client" 
## setup
#### Install Angular on local system
   * clone code from git URL.
   * install latest angular and node v12.x above.
   * install project dependency
       use command  ***npm install*** from terminal.
   * To run application
       use command ***ng serve***.
   * for local API , need to 
       change path in main.ts file for environment.ts  

#### Deploy angular on FIREBASE
  ### Configuration for API URL
      go to > main.ts file. and import environment.prod.ts file for enableProd() method.
      now change API URL path in environment.prod.ts file.
   * install firebase cli 
       ***npm install firebase*** from project root directory.
   * type command on terminal from project root directory 
       ***npm install -g firebase-tools***
   * type ***firebase login*** and login with firebase login credentials.
   * then  ***firebase init*** command. this command will give some prompt options. select desired option.
        ##### choose these options
        What do you want to use as your public directory? www
        Configure as a single-page app (rewrite all urls to /index.html)? No
        Set up automatic builds and deploys with GitHub? No
        File www/index.html already exists. Overwrite? No
   * finally deploy it, by using the command ***firebase deploy***.

#### URL of this project
 https://college-management-client.web.app
