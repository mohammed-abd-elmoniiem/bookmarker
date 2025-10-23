

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css'

import { animate, scale } from 'motion';

var regexName = /^[a-zA-Z0-9]{3,}$/;



  /* 
    url  => scheme://(  127.8.8.8 | www.ex.com ) :port / path ? parameters #fragement
  */
  
var regexURL = /^(http|https|mailto|ws|wss|dns|ftp|ftps):(\/\/)?(((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))(\.(([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))){3})|(www\.)?[a-zA-Z0-9]+(-?[a-zA-Z0-9])+\.(com|org|net|io|eg))(:[0-9]{1,5})?((\/[\w]*))*(\?([a-zA-Z]+=\w*(&[a-zA-Z]+=\w*)*))?(#([a-zA-Z][a-zA-Z0-9]*)?)?$/;




var siteName = document.querySelector('#site-name');
var siteURL = document.querySelector("#site-url");
var btnSubmit = document.querySelector('#btn-submit');
var items = document.querySelector('.items');



console.log(siteName , siteURL , btnSubmit,items)



var bookmarkList= getBookmarksLocal() ||  [];


// get the get the 
function getBookmarksLocal(){
  return JSON.parse( localStorage.getItem('bookmarks'));
 
}

function storeBookmoarksLocal(){
  localStorage.setItem('bookmarks' , JSON.stringify(bookmarkList));
}


  // get the site icon +++++++++++++++++++++++++++++++++++++++++++++
  window.getSiteIcon = function(url){

  var result = url.match(/^(http|https|mailto|ws|wss|dns|ftp|ftps):(\/\/)?(((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))(\.(([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))){3})|(www\.)?[a-zA-Z0-9]+(-?[a-zA-Z0-9])+\.(com|org|net|io|eg))/)[0]

  console.log(result[0])
  if(result.index != -1){
    return `${result}/favicon.ico'`
  }
  return 'images/favicon.ico'
}

// -----------------------------------------


// display bookmarks after loading the html
displayBookmarks()

// add new bookmark

btnSubmit.addEventListener('click',function(event){

  if(isValid(siteName , regexName) & isValid(siteURL , regexURL)){
      bookmarkList.push(createBookmarkObj());
      displayBookmarks();
      storeBookmoarksLocal();
      // resetInput()

  }


})

// ----------------------------------------





// reset inputs
function resetInput(){
  siteName.value= null;
  siteName.classList.remove('is-valid');
  siteURL.value = null;
  siteURL.classList.remove('is-invalid');

}

// create new bookmark object

function createBookmarkObj(){
  return{
    siteName:siteName.value ,
    siteURL:siteURL.value ,
    index:bookmarkList.length ||0
    
  }
}


// display bookmarks

function displayBookmarks(){
  var str = '';

  for(var bookmark of bookmarkList){
    str += `
    
      
        
           
            <div data-index="${bookmark.index}" class="item p-3 rounded-3">
            
              <a href = "${bookmark.siteURL}" target="_blank" class="image d-block rounded-circle overflow-hidden">
                <img
                  class="w-100 h-100 object-fit-cover"
                  src=${getSiteIcon(bookmark.siteURL)}
                  alt="site icon"
                />
              
              </a>
              <p class="">${bookmark.siteName}</p>

              <i onclick="removeBookmark(${bookmark.index})" class="fa fa-trash-alt"></i>
            </div>

        
         
    `
  }

  items.innerHTML = str;
}
// ------------------------------------








// remove bookmark++++++++++++++++++++++
window.removeBookmark = function(index){
  
  bookmarkList.splice(index,1);
  storeBookmoarksLocal();

  displayBookmarks();

}
// validations +++++++++++++++++++++++++++++++

siteName.addEventListener('input',function (eve){
  // var regex = /^[a-zA-Z0-9]{3,}$/gm;

  console.log(isValid(this ,regexName ));
})
siteURL.addEventListener('input',function(eve){

  console.log(isValid(this ,regexURL ));


})



function isValid(target , regex){


   

  if(regex.test(target.value)){
    
    target.classList.add('is-valid');
    target.classList.remove('is-invalid');
    target.nextElementSibling.classList.add('opacity-0');
    target.nextElementSibling.classList.remove('opacity-100');
// console.log(target , regex ,target.value)
   
    return true;
    
  }else{
    target.classList.add('is-invalid');
    target.classList.remove('is-valid');
   
    target.nextElementSibling.classList.add('opacity-100');
    target.nextElementSibling.classList.remove('opacity-0');

  

    return false;
     
   
  }

}
