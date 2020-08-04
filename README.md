# codeSample
*This repo is intended to show sample code snippets, not a full project.*
A link to the full website can be found here: https://webmall.azurewebsites.net/

This code is from the creation of the website for the start-up company WebMall. WebMall is an eCommerce application where customers and merchants can connect in real
time via live video streaming. The network is designed to improve communication and engagement with customers and business owners. To find this component, use the navigation bar to clikck on Forums to view the New Forums page and All Forums.

Technologies used for this portion of the project includes Reactjs, Javascript, Nodejs, CSS3, Bootstrap, and SQL.

ForumsThreadsService
---------------------
  ●Used Nodejs to connect the service file to the MySQl database, calling information related to the stored CRUD procedures.
  
ForumsThreadsController
-----------------------
  ●Used Nodejs to create RESTful API controllers to process client side commands by returning data based on HTTPS requests. 
  
Threads
--------
  ●Designed with Reactjs, this component  allows users to create new forums for topics of discussion with the community.
  
  ●Upon a successful get call, each thread in the database will be mapped and paginated to the screen. 
  
  ●The deleteFromDom and updatesThread functions are being passed to the singleThread component and are utilizing the virtual dom to delete or update the items without refreshing 
  the page.
  
  ●The onEdit function is being passed to the singleThreads components, and when the edit button is clicked the original form will show on the screen with the previous data          populated in the form. 
