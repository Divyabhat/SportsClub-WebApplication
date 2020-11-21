  function member() {
      //  var data = document.createElement("DIALOG");

      var thanksDialog = document.getElementById("ThanksDialog");
      var thanksContent = document.getElementById("ThanksContent");
      var close = document.getElementById("close");

      // When the user clicks the button, open the modal 
      document.getElementById("heading").innerHTML = "Thank you for signing up!";
      var msg = " Name:" + document.getElementById("name").value;
      msg += ",Email:" + document.getElementById("email").value;
      msg += ",Type:" + document.getElementById("value1").value;
      msg += ",Comments:" + document.getElementById("comment").value;
      document.getElementById("ThanksText").innerHTML = msg;
      thanksDialog.style.display = "block";
      thanksContent.style.display = "block";


      close.onclick = function () {
          thanksDialog.style.display = "none";
          thanksContent.style.display = "none";
      }


  }