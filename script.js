const myKey = "WWJUgTlwlv3O3ygkvY8EdqgSvFweLsMK";

/* formats query */
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
  
  
  /* makes fetch call to giphy api*/
  function callGiphy(searchTerm){
    const gifURLbase = "https://api.giphy.com/v1/gifs/search";
  
    const keyValueObj = {
  
     api_key: myKey,
     q : searchTerm,
     limit: 25
    };
  
    const myQuery = formatQueryParams(keyValueObj);
    const mySerach = gifURLbase + "?" + myQuery;
    
  
     fetch(mySerach)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })      
      .then(responseJson => displayData(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  
  }
  
  /* clipboardJS */
  function copyToClipboard(){
  
    var clipboard = new ClipboardJS('.btn');
    $("#user-input").val("copied");
    
  
  }
  
  
  
  /* results to dom */
  function displayData(responseJsonObj){


    if(responseJsonObj.data.length === 0){
       window.alert('invalid serach')
    }
  
    let numOfObjReturned = 25;
   
    for(let x=0; x < numOfObjReturned; x++){
      
  
     $("#my-results-list").append(`
        <li>
        <img src="${responseJsonObj.data[x].images.original.url}" 
        alt="${responseJsonObj.data.title}" >
        <div class="display-info">
        <button type="button" onclick="copyToClipboard()"  class="btn" id="copy-button btn" data-clipboard-text="${responseJsonObj.data[x].bitly_url}">copy to clipboard</button>
        </div>
        </li>`);
    }
  }
  
  /* gets input from textfield and search button is used */
  function watchForm() {
    $('#myForm').submit(event => {
      event.preventDefault();
      const value = $('#user-input').val();
      if (value === ""){
        window.alert('please enter a valid serach')
      } else{
      $('.intro').hide();
      clearList();
      callGiphy(value);
      }
    });
  }
  
  
  function clearList(){
    $('#my-results-list').empty();
  }
  
  function callRandomGiphy(searchTerm){
  
    const gifURLRandom = "https://api.giphy.com/v1/gifs/random";
    const keyValueObj = {
  
     api_key: myKey,
     tag : searchTerm, 
  
   };
  
    const myQuery = formatQueryParams(keyValueObj);
    const mySerach = gifURLRandom + "?" + myQuery;
    
  
    fetch(mySerach)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })      
      .then(responseJson => displayRandomResult(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  
  }
  
  function displayRandomResult(responseJsonObj){
  
    $("#my-results-list").append(`<li>
        <img src="${responseJsonObj.data.images.original.url}"
        alt="aGif" id="random-result">
        <div class="display-info">
        <button type="button"  class="btn" id="copy-button btn" data-clipboard-text="${responseJsonObj.data.bitly_url}">copy to clipboard</button>
        </div>
        </li>`);
  
  }
  
  function userHitsRandom(){
    
    $("#random-button").click(function (){
      
      const value = $("#user-input").val();
      if (value === ""){
        window.alert('Please enter a search term too.')
      } else{
        $('.intro').hide();
        clearList();
        callRandomGiphy(value);
        
      }
    });
  }
  
  /* query trending gifs */
  function searchTrending(){
  
    const gifURLTrending = "https://api.giphy.com/v1/gifs/trending";
    const myKeys = {
      api_key : myKey,
      limit: 20
    };
  
    const myQuery = formatQueryParams(myKeys);
    const theSearch = gifURLTrending + "?" + myQuery;
    
    
    fetch(theSearch)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })      
      .then(responseJson => displayData(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  
  }
  
  function userHitsTrending(){
  
    $("#trending-button").click(function(){
      $('.intro').hide();
      $("#user-input").empty();
      clearList();
      searchTrending();
      
    });
  
  }

  function connectionVerification(){

    const isOnline = window.navigator.isOnline;

    window.addEventListener('offline',offline)
    

    if (!isOnline){
      offline()
    } 

    function offline(){
      window.alert('you are not connected to the internet')
    }
    

  }
  
  function runTheApp(){
    
    watchForm();
    userHitsRandom();
    userHitsTrending();
    connectionVerification();
   
  }
  
  $(runTheApp);
