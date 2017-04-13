# JWT-Angular-Setup
A setup for using json web token with angular JS. 

## Installation
1.Node should previously be installed globally.  
  https://nodejs.org/en/  
2.Install bower globally.  
  npm install -g bower  
3.Navigate to folder of downloaded repo and install node dependencies.  
  npm install    
4.Install bower dependencies.  
  bower install  

## Usage

1.Navigate to repo folder and start server.  
  grunt serve
2.Server will start on port 8500 on localhost.  
3.The port can be changed fron Gruntfile.js.  
4.For external access please replace localhost with 0.0.0.0  
5.In order to access your REST Service endpoint, change link:port/context in services/local-storage/settings.js -> [download here](https://github.com/stefanBusnita/JWT-Spring-Security)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

MIT
