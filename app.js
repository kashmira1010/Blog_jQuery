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
    // localStorage.a_post = JSON.stringify(data[2]);
    //  post_array = JSON.parse(localStorage.a_post);
        
      for(var i=0; i<data[2].length; i++)
      {
        // console.log(data[2][i]["userId"]);
            var obj = {
                "userId" : data[2][i]["userId"],
                "body" : data[2][i]["body"],
                "id" : data[2][i]["id"],
                "title" : data[2][i]["title"],
               "islike" : 'Like'
             };
        post_array.push(obj);      
      }
       localStorage.a_post = JSON.stringify(post_array);
      // console.log(post_array);
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

        html += `<div id = "post_${post_array[j].id}">
                 <p id = "user_name_${i}"><strong>Name:</strong> ${user_array[i].name}</p>
                 <p id = "user_post_${i}"><strong>Title: </strong> ${post_array[i].title}</p>
                 <p id = "user_post_${i}"><strong>Description:</strong> ${post_array[j].body}</p>
                 <button id = "like_btn_${j}"> ${post_array[j]['islike']} </button>
                 <button id = "comment_btn_${j}">Comment</button>
                 <button id = "delete_btn_${j}">Delete</button>
                 </div>`
       }
    }
  }
  jQuery('#display').html(html);
}

jQuery(document).on('click', 'button[id^="comment_btn_"]', function(){
  var commentHtml = "";
  var tr_id = jQuery(this).attr('id').replace('comment_btn_', 'post_');
  var trr = jQuery(this).attr('id').replace('comment_btn_', '');
  var index_val = Number(trr);
  var tempId = tr_id.replace('post_', 'temp_');
  var err = jQuery('#'+ tempId).attr('id');
  if(err){
    $(".remove").remove();
  }
  else{
    for(var i = 0; i<comment_array.length; i++){
      if(post_array[index_val].id == comment_array[i].postId){
        commentHtml += `<div class = "remove" id = "temp_${index_val}"><p>Comment: ${comment_array[i].body}</p></div>`

      }
    }
  commentHtml += `<div id= "div_id_${index_val}"><input type="text" class = "remove" id="txt_id_${index_val}" placeholder="Add comment">
                  <button class = "remove" id = "add_comment_${index_val}">Submit</button>`
  }
   jQuery('#delete_btn_'+index_val).after(commentHtml); 
}); 

 jQuery(document).on('click','button[id^="add_comment_"]',function(){
    var add_new = "";
    var postId = $(this).attr('id').substr(12, 4);
    var postnewid = postId + 1;
    var comment_value = jQuery("#txt_id_"+ postId).val();
    if(jQuery("#txt_id_"+ postId).val() != ""){
      var entry = {
        "body" : comment_value,
        "postId" : postnewid
      };
  comment_array.push(entry);
  add_new += `<div class = "remove" id = "temp_${postId}"><p>Comment: ${comment_value}</p></div>`
  jQuery('#div_id_'+ postId).before(add_new);
  jQuery("#txt_id_"+ postId).val("");
  //jQuery('#div_id_'+ postId).before("Comment " + comment_value);
  localStorage.a_comment = JSON.stringify(comment_array);
  }
});

jQuery(document).on('click', 'button[id^="delete_btn_"]', function(){
  var tr_id = jQuery(this).attr('id').replace('delete_btn_', 'post_');
  var trr = jQuery(this).attr('id').replace('delete_btn_', '');
  var trr_num = Number(trr);
  post_array.slice(trr_num ,1);
  var index_val = trr_num  + 1;
  jQuery("#post_" +index_val).remove();
  localStorage.a_post = JSON.stringify(post_array);
});

jQuery(document).on('click', 'button[id^="like_btn_"]', function(){
  var tr_id = jQuery(this).attr('id').replace('like_btn_', '');
  var trr_num = Number(tr_id);

  if(post_array[trr_num]['islike'] != true){
    post_array[trr_num]['islike'] = 'Liked';    
    $(this).html('Liked');    
    localStorage.a_post = JSON.stringify(post_array);
  }
});