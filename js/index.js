//code goes here
//////////////////////////  wait for the page to load to get form data ////////////////////
document.addEventListener('DOMContentLoaded', function() {
    userinfo();
    
            
  });
/////////////////////////////////////////////////////////////////////////////////
const userurl = "https://api.github.com/search/users?q=";
const userrepo = "https://api.github.com/users/" // add user/repos
const urepo = "/repos";

let userurlwq = "octocat"
//let userdatakeys=[];
//let userdatavalues=[];



////////////////////////////////////////////get user search results  ///////////////////
function fetchGetUsers(data){
   
 fetch(data,{
    method: "GET",
    headers:
    {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    }
    //,body: JSON.stringify(jsonobject)
  })
      .then(response => response.json())
      .then(json => JSON.stringify(createelements(json)))
    //.then(json => console.log(json))
    // .then(json => userinfo(json))
      .catch(error => console.log(error))

                                                                       

}; 
//////////////////////////////////////////// end fetch /////////////////////////////

 /////////////////////////////  form submit data  /////////////////////////////
 function userinfo(){
    let getsearchdata = document.getElementById("github-form");
    let getdata = document.getElementById("search");
    getsearchdata.addEventListener("submit", function(e){
                        e.preventDefault();
                        
                       //console.log("line 148");
                       // const submitform = e.target;
                       // let formdata = getsearchdata.search.value;
                       fetchGetUsers(userurl+getdata.value);
    
            });
    };  
 ///////////////////////////////////////////////////////// create elements ////////////////////////   
//function createelements(user1,value1,avatar,repo){
function createelements(data2){
    let user1=[];
    let value1=[];
  for ( let key in data2){
       
    //console.log(key);
   // console.log(key,Array.isArray(data2[key]));
      if(Array.isArray(data2[key])){
          //console.log(data2[key].length);  //
          //data2[key][0];
         // createelements(userdatakeys,userdatavalues);
               for(let i=0; i<data2[key].length;i++){
                 // console.log(data2[key][i]);
                 // console.log(typeof data2[key][0]=== 'object');
                         user1.push(Object.keys(data2[key][i]));
                         value1.push(Object.values(data2[key][i]));
                         
                     // userdataarray=[data2[key][i]];
                         };
                  };
          };
    // console.log(value1.length);
     let usern;
      
      const mainul = document.getElementById('user-list');
      for(let y=0; y<user1.length;y++){
            ///////////////////// add user name - main key /////////////// 
            let user = user1[y];
            let value = value1[y];
             for(let a=0; a<user.length;a++){
              
                  if(user[a]=="login"){
                          const li =document.createElement("li");
                          li.setAttribute("id", value[a]);         
                          li.textContent = "User Name: "+value[a].toString();
                          mainul.append(li);
                         usern = value[a];
                      };
                  };
                
          //  ///////////////////// add user avator //////////////
                 for(let b=0; b<user.length;b++){   
                         if(user[b]=="avatar_url"){
                           //console.log(usern);

                          const username = document.getElementById(usern);
                          const li =document.createElement("li");
                          const a =document.createElement("a");
                          li.setAttribute("id", "avatar_url"); 
                          a.setAttribute('href',value[b])
                          //li.href = value[b];     
                          li.textContent ="Avator: ";
                          a.textContent = "URL";
                          username.append(li);
                          li.append(a);
                         };
                       };  
          //   /////////////////// element for user repo fetch  //////////////////////
                 for(let b=0; b<user.length;b++){   
                  if(user[b]=="login"){
                  const username = document.getElementById(usern);
                          
                  const li =document.createElement("li");
                  const lib = document.createElement("button");
                  li.setAttribute("id", "user_repos");  
                  lib.setAttribute("id",usern) ;
                  //lib.setAttribute('onclick',userrepoinfo());
                  lib.setAttribute("value",usern);
                  lib.textContent = "Click Here";     
                  li.textContent = ("User repos - ");
                  username.append(li);
                  lib.addEventListener('click',function(e){
                            fetchGetrepos(userrepo+e.target.id+urepo,e.target.id)
                              //console.log(e.target.id);
                            });
                  li.append(lib);
                  };

                  
                };  
                
      };
             
            
     };

/////////////////////////////////////////// get user repos  /////////////////////////
function fetchGetrepos(data2,repouser){
  ////////////////////////////////////////////////////// fetch user repo data ///////////////////////////   
  //console.log(data2);       
  fetch(data2,{
     method: "GET",
     headers:
     {
       'Content-Type': 'application/json',
       'Accept': 'application/vnd.github.v3+json'
     }
     //,body: JSON.stringify(jsonobject)
   })
       .then(response => response.json())
       .then(json => JSON.stringify(getrepo(json,repouser)))
     //.then(json => console.log(json))
     // .then(json => userinfo(json))
       .catch(error => console.log(error))
      };
 /////////////////////////////////////////////////////// end fetch /////////////////////////////
 
  
 ////////////////// add user repo  ////////////////
    
  function getrepo(data3,repouser){                                  
            // console.log(data2,repouser);
   //console.log(typeof data2 === 'object')
   // console.log(Array.isArray(data3));
  //console.log(data3);

   const repoeul = document.getElementById("repos-list");
  
    while (repoeul.firstChild) {
      repoeul.removeChild(repoeul.firstChild);
    }
 
    
    //////////////////////////////////////// create user repo elements   ////////////////////////////////
    const li =document.createElement("li");
    li.setAttribute("id", "url"+repouser);         
    li.textContent = "User Name: "+repouser;
    repoeul.append(li);



  ///////////////////////////////////////////   Manipulate repo data ///////////////////////////////  
//for(let p=0; p<data3.length;p++){
  for (let data2 of data3){
//console.log(data2);

       //data3[p].forEach(data2 => {
//console.log(Array.isArray(data2));
  
               
            for ( let key in data2){
              
           // console.log(key+":"+data2[key]);

                    
          
         // usern = value[a];
                      if(key.includes("url")){
                    //         //console.log(key+":"+data2[key]);
                        if(data2[key].includes("https://api.github.com/repos")){
                                 const username = document.getElementById("url"+repouser);
                                   const li =document.createElement("li");
                                   const a =document.createElement("a");
                                 li.setAttribute("id", "repos-"+repouser); 
                                  a.setAttribute('href',data2[key])
                                  li.href = data2[key];     
                                   li.textContent ="Repos: ";
                                   a.textContent = data2[key];
                                  username.append(li);
                                   li.append(a);
                            };
                          };


              
                  };

  };

  //console.log(repodatavalues.includes("https://api.github.com/users/"));
// //console.log(repodatakeys)
// //console.log(repodatavalues.includes("https://api.github.com/users/"));
  };
/////////////////////// End user repo for Dom //////////////////////////////////

