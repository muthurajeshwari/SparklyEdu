let sessionId = window.localStorage.getItem("sessionId");
let sessionTime = window.localStorage.getItem("sessionTime");
let sessionName = window.localStorage.getItem("sessionName");


sessionTime = new Date(sessionTime)

if (sessionId && sessionTime) {

  const currentDate = new Date();

  if(currentDate <= sessionTime){

    proceed()

  }else{

    alert("Session timeOut, Please login");
    window.location.href = "/login";

  }

} else {
  alert("Unauthorized access, Please login");
  window.location.href = "/login";
}


function proceed(){

    try {
        

        if(sessionName){

            if(document.querySelector(".name .profile")){
    
                document.querySelector(".name .profile").innerText = sessionName
            }

            if(document.querySelector(".main .heading")){
    
                document.querySelector(".main .heading").innerText = `Welcome, ${sessionName}`
            }
        }


        
    } catch (error) {
        
    }

}