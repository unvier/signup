//Requiring mailchimp's module
//For this we need to install the npm module @mailchimp/mailchimp_marketing. To do that we write:
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
// //Requiring express and body parser and initializing the constant "app"
// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// //Using bod-parser
// app.use(bodyParser.urlencoded({extended:true}));
// //The public folder which holds the CSS
// app.use(express.static("public"));
// //Listening on port 3000 and if it goes well then logging a message saying that the server is running
// app.listen(process.env.PORT||3000,function () {
//  console.log("Server is running at port 3000");
// });
// //Sending the signup.html file to the browser as soon as a request is made on localhost:3000
// app.get("/", function (req, res) {
//  res.sendFile(__dirname + "/signup.html");
// });
// //Setting up MailChimp
// mailchimp.setConfig({
// //*****************************ENTER YOUR API KEY HERE******************************
//  apiKey: "8339e49dd2cb1a5979650bbfbb6da04a-us17",
// //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
//  server: "us17"
// });
// //As soon as the sign in button is pressed execute this
// app.post("/", function (req,res) {
// //*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
// const firstName = req.body.firstName;
// const lastName = req.body.secondName;
// const email = req.body.email;
// //*****************************ENTER YOU LIST ID HERE******************************
// const listId = "2526c2b9d0";
// //Creating an object with the users data
// const subscribingUser = {
//  firstName: firstName,
//  lastName: lastName,
//  email: email
// };
// //Uploading the data to the server
//  async function run() {
// const response = await mailchimp.lists.addListMember(listId, {
//  email_address: subscribingUser.email,
//  status: "subscribed",
//  merge_fields: {
//  FNAME: subscribingUser.firstName,
//  LNAME: subscribingUser.lastName
// }
// });
//If all goes well logging the contact's id

//  res.sendFile(__dirname + "/success.html")
//  console.log(
// `Successfully added contact as an audience member. The contact's id is ${
//  response.id
//  }.`
// );
// }

//Running the function and catching the errors (if any)
// ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LESSON*************************
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page

//  run().catch(e => res.sendFile(__dirname + "/failure.html"));
// });















const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require("https");

const app = express();
// the public folder which holds the css
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// sending the signup.html file to the browser as soon as request is made on localhost3000
app.get ("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lastName
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/2526c2b9d0";

  const options = {
    method: "POST",
    auth: "odera:8339e49dd2cb1a5979650bbfbb6da04a-us17"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode ===200){
      res.sendFile(__dirname + "/sucess.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();


});




// post route for the button on the success.html page which redirects to the home route
app.post("/sucess.html", function(req, res){
  res.redirect("/");
});

// chnaged from 3000 to process.env.PORT || 3000 when i am ready to deply
app.listen(process.env.PORT || 3000, function(){
  console.log("server is runing on port 3000");
});
//
//
// // api key mailchimp
// // 8339e49dd2cb1a5979650bbfbb6da04a-us17
// // audience
// // 2526c2b9d0
