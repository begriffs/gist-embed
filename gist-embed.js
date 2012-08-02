//author: Blair Vanderhoof
//https://github.com/blairvanderhoof/gist-embed
$(function(){
  var gistMarkerId = 'gist-';
  
  //find all code elements
  $('code').each(function(){
    var $elem, id, url;
    $elem = $(this);

    id = $elem.attr('id') || '';
    //if the id doesn't begin with 'gist-', then ignore the code block
    if (!id || id.indexOf('gist-') !== 0) return false;

    //make block level so loading text shows properly
    $elem.css('display', 'block');
    
    //get the numeric id from the id attribute of the element holder
    id = id.substr(0, gistMarkerId.length) === gistMarkerId ? id.replace(gistMarkerId, '') : null;

    //make sure result is a numeric id
    if(!isNaN(parseInt(id, 10))){
      url = 'https://gist.github.com/' + id + '.json';
      //loading
      $elem.html('Loading gist ' + url + ' ...');
      //request the json version of this gist
      $.ajax({ 
        url: 'https://gist.github.com/'+id+'.json', 
        dataType: 'jsonp', 
        timeout: 10000,
        success: function(response){
          //the html payload is in the div property
          if(response && response.div){
            //add the html to your element holder
            $elem.html(response.div);
          }else{
            $elem.html('Failed loading gist ' + url);
          }
        },
        error: function(){
          $elem.html('Failed loading gist ' + url);
        }
      }); 
    }else{
      $elem.html('Failed loading gist with incorrect id format: ' + $elem.attr('id'));
    }
  });
});