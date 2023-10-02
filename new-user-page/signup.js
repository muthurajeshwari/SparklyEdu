let submitBtn = document.querySelector(".btn");

submitBtn.addEventListener("click", () => {
  let detailObj = {};

  detailObj.pass = document.querySelector(".pass input").value;

  if (detailObj.pass === document.querySelector(".Cpass input").value) {
    detailObj.name = document.querySelector(".name input").value;
    detailObj.dob = document.querySelector(".dob input").value;
    detailObj.email = document.querySelector(".email input").value;

    if (!detailObj.name) {
      alert("Name can't be Empty, please enter");
    }

    if (!detailObj.dob) {
      alert(" DOB can't be Empty, please enter");
    }

    if (!detailObj.email) {
      alert(" Email can't be Empty, please enter");
    }

    if(detailObj.name && detailObj.dob && detailObj.email && detailObj.pass){

        postData()

    }

    
    //Code to POST Vaiable to Node
    async function postData() {

        const url = '/api/addNewUser'; 

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(detailObj),
        });
  
        const result = await response.json();

        if(result.message == "updated"){
          alert("New Account Created succesfully, Please Login!")
          window.location.href = "/login"
        }
    }



  } else {
    alert("Password is not same");
  }
});
