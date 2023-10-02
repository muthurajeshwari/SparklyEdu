
let buttonElement = document.querySelector(".btn");

const dataObj = {}
buttonElement.addEventListener("click", function () {

  let emailelement = document.querySelector(".email input").value;

  let pwdelement = document.querySelector(".pass input").value;

  dataObj.password = pwdelement
  dataObj.email = emailelement
  postData();

});


async function postData() {

  const url = '/api/checkuser'; 

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataObj),
  });

  const result = await response.json();
  console.log(result)
  if(result.message == "Success"){

    const currentDate = new Date();

    // Add 2 hours to the current time
    const newDate = new Date(currentDate.getTime() + (2 * 60 * 60 * 1000));

    window.localStorage.setItem("sessionId", result.session)
    window.localStorage.setItem("sessionTime", newDate)
    window.localStorage.setItem("sessionName", result.name);

    window.location.href = "/frontpage.html"

  }
  if(result.message == "Incorrect Password"){
    alert(result.message)    
  }

  if(result.message == "Email doesn't exists, Create New Account"){
    alert(result.message)    
  }

}
