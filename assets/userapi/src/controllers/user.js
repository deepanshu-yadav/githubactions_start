const db = require('../dbClient')

getlocal = (usernameObj, callback) => {
  if(!usernameObj.username){
    callback(new Error("User name not specified"), null)
  }

  db.hget(usernameObj.username, "username", (err, response)=> {
    console.log("In get() err is" + err+ "  res is " + response)
    if(err){  
      callback(err, null);
    }
    else if(!response)
    {
      callback(new Error("User Name does not exist."), null)
    }
    else{
      callback(null, response);
    }
  });
  
}

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    
    getlocal(userObj, (err, res) => {
      console.log("Inside create res is "+ res);
      console.log("Inside create err is "+ err);
    if(err){
      console.log("Inserting");
      db.hmset(user.username, userObj, (err, res) => {
        console.log("Inside insert in create res is "+ res);
        console.log("Inside insert create err is "+ err);
        if (err) return callback(err, null)
        callback(null, res) // Return callback
      })
    }
    else {
      if (res.username == user.username) {
        callback(new Error("User Already exists."), null)
      }
      else{
        console.log("Inserting in else");
        console.log("Inside insert else in create res is "+ res);
        console.log("Inside insert else create err is "+ err);
        db.hmset(user.username, userObj, (err, res) => {
          if (err) return callback(err, null)
          callback(null, res) // Return callback
        })
      }
    }
  })
  }
  ,
  get : getlocal

}
