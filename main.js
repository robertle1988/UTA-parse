
/**
 * Suppose to be a background job
 * get 20 events at current date from  mavsorg
 */

Parse.Cloud.define('mavsorgAPI',function(request,status){
      Parse.Cloud.httpRequest({
        
        url: 'https://mavorgs.collegiatelink.net/events/search?pagesize=20',
        success: function(httpResponse){
          var response = JSON.parse( httpResponse.text);
          var data = response.Results
          
          
          var events = Parse.Object.extend("Events");

          for (i = 0; i< data.length; i++){
            var event = new events();
            event.set("eventName",data[i].Name);
            event.set("imageURL",data[i].EventFlyerUrl);

            // extract event start date and end date
            var date = data[i].EventDate.split(" ");
            var startDateString = date[0] +" "+date[1]+" "+date[2];
            //var startDate = new Date(startDateString);
            var endDateString = date[0] + " "+date[4]+" "+date[5];

            event.set("startDate",startDateString);
            event.set("endDate",endDateString);

            event.save(null,{
              success: function(event){
                console.log(event.id + "created");
              },
              error: function(event,error){
                console.log(error.message);
              }
            
            
            });
          }
         
          status.success("Created list!");

        },
        error:function(httpResponse){
            console.error('Request failed with response code' + httpResponse.status);     
        }
     });
 });



 // Screen events before adding

 // Parse.Cloud.beforeSave("Events",function(request,response){
 //  var events = Parse.Object.extend("Events");
 //  var event = new events();
  
 //  var nameQuery = new Parse.Query("Events");
 //  nameQuery.equal("eventName",request.object.get("eventName"));
 
 //  *
 //  var dateQuery = new Parse.Query("Events");
 //  dateQuery.equal("startDate",request.object.get("startDate"));
  
  
 // var mainQuery = new Parse.Query.and(nameQuery,dateQuery);
  
 //  nameQuery.find({
 //    success: function(results){
 //      response.error("This event was already created!");
 //    },
 //    error: function(err){
 //      response.success();
 //    }
 //   });
 
 
 // });

