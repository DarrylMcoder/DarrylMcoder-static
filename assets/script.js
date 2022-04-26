function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function decrypt(crypted,key) {
        var alpha = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
        var decrypted_str = "";
        var found = false;
        for(var i = 0; i < crypted.length; i++) {
          var crypted_val = crypted.charAt(i);
          for(var j = 0; j < key.length; j++){
            var key_val = key.charAt(j);
            var alpha_val = alpha.charAt(j);
            if(key_val == crypted_val) {
              decrypted_str += alpha_val;
              found = true;
            }
          }
          if(found != true) {
            decrypted_str += crypted_val;
          }
          found = false;
        }
        return decrypted_str;
      }



function loadLinks(url,id) {
  var linksHTML = '';
  fetch(url).then(res => {
    res.text().then(text => {
      return JSON.parse(text);
    }).then(links => {
      for (const [key, value] of Object.entries(links)) {
      linksHTML += '<a href=\"' + value + '\">' + key + '</a>  ';
    }
    var elem = document.getElementById(id);
      console.log(elem)
    elem.innerHTML += linksHTML;
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
}