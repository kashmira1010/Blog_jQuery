var comment_array = [];
var user_array = [];
var post_array = [];

jQuery(document).on('click','#get_data',function(){
  usersData();
  jQuery('#get_data').hide();
});
  

  if(!localStorage.a_comment && !localStorage.a_user && !localStorage.a_post ){
    jQuery('#get_data').show(); 
}
  else{
      jQuery('#get_data').hide();
      user_array = JSON.parse(localStorage.a_user);
      comment_array = JSON.parse(localStorage.a_comment);
      post_array = JSON.parse(localStorage.a_post);
      display_data();
      //console.log(user_array);
      //console.log(comment_array);
      //console.log(post_array);
  }

function usersData(){
var new1Promise = new Promise(function (res, rej){
    $.ajax({
      type: "GET",
          url: "https://jsonplaceholder.typicode.com/users",
          success: function(comment) {
                    res(comment);
          },
          error: function(err) {
                  rej(err);
          }
    });
  });
var new2Promise = new Promise(function (res, rej){
    $.ajax({
      type: "GET",
          url: "https://jsonplaceholder.typicode.com/comments",
          success: function(user) {
                    res(user);
          },
          error: function(err) {
                  rej(err);
          }
    });
  });
var new3Promise = new Promise(function (res, rej){
    $.ajax({
      type: "GET",
          url: "https://jsonplaceholder.typicode.com/posts",
          success: function(post) {
                    res(post);
          },
          error: function(err) {
                  rej(err);
          }
  });
});

Promise.all([new1Promise, new2Promise, new3Promise]).then(function(data){
  if(data[0]){
    localStorage.a_user = JSON.stringify(data[0]);
    user_array = JSON.parse(localStorage.a_user);
    //console.log(user);
  }
  if(data[1]){
      localStorage.a_comment = JSON.stringify(data[1]);
      comment_array = JSON.parse(localStorage.a_comment)

    }
      //console.log(comment);
  if(data[2]){
      localStorage.a_post = JSON.stringify(data[2]);
      post_array = JSON.parse(localStorage.a_post);
    }
  display_data();
});
}


function display_data(){
  var html = "";  
  //console.log(user_array);
  for(var i = 0; i<user_array.length; i++){
    for(var j = 0; j<post_array.length; j++){
      if(user_array[i].id == post_array[j].userId){
        html += `<p id = "user_name_${i}">Name: ${user_array[i].name}</p>
                 <p id = "user_post_${i}">Title: ${post_array[i].title}</p>
                 <p id = "user_post_${i}">Description: ${post_array[i].body}</p>
                 <button id = "like_btn_${i}">Liked</button>
                 <button id = "comment_btn_${i}">Comment</button>
                 <button id = "delete_btn_${i}">Delete</button>`
       }
    }
  }
  jQuery('#display').html(html);
}

