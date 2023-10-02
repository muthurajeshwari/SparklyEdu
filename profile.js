const Id = window.localStorage.getItem("sessionId");
const currentCourse = window.location.pathname.split(".")[0].split("/")[1]

let completedItems = []

let secElements = document.querySelectorAll(".video-title");
let iframeElement = document.querySelector(".video iframe");


secElements.forEach((element) => {
  element.addEventListener("click", function () {
    iframeElement.setAttribute("src", element.getAttribute("data"));
    iframeElement.setAttribute("list-item", element.parentElement.className);

    
      if(completedItems.includes(element.parentElement.className)){
        document.querySelector(".completion-button").innerText = "Completed";
        document.querySelector(".completion-button").style.color = "#008000"
      }else{
        document.querySelector(".completion-button").innerText = "Mark as Completed";
        document.querySelector(".completion-button").style.color = "#0A0AFF"
      }

  });
});

let completionButton = document.querySelector(".completion-button")

completionButton.addEventListener("click", ()=>{

  updateCourseDetails(currentCourse, iframeElement.getAttribute("list-item"))

})

function updateCourseDetails(courseId, item){

  let detailObj = {
    id : Id,
    course: courseId,
    item: item
  }

  console.log("Course Details, Called", courseId , item)

  async function postData() {

    const url = '/api/updateCourse'; 

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detailObj),
    });

    const result = await response.json();

    if(result){
      updateDOM(result)
    }
  }

  postData()

  
}


function getCourseStatus(){

  let detailObj = {
    id : Id,
    course: currentCourse,
  }

  async function postData() {

    const url = '/api/getCourse'; 

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detailObj),
    });

    const result = await response.json();

    if(result){
      updateDOM(result)
    }
  }

  postData()



}


getCourseStatus()


function updateDOM(arr){
  
  completedItems = arr

  let totalitem = document.querySelector(".course-items").children

  document.querySelector(".name .progress").innerText = `Progress : ${arr.length}/${totalitem.length}`

  for (let index = 0; index < totalitem.length; index++) {

    if(completedItems.includes(totalitem[index].className)){
      totalitem[index].style.color = "#008000"
    }
    
  }

  if(completedItems.includes(iframeElement.getAttribute("list-item"))){
    document.querySelector(".completion-button").innerText = "Completed";
    document.querySelector(".completion-button").style.color = "#008000"
  }else{
    document.querySelector(".completion-button").innerText = "Mark as Completed";
    document.querySelector(".completion-button").style.color = "#0A0AFF"
  }

}





























// This function will be called when the YouTube Iframe API is ready
// function onYouTubeIframeAPIReady() {
//   Create a new YT.Player object
//   const player = new YT.Player('ytplayer', {
//     events: {
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }

// This function will be called when the player's state changes
// function onPlayerStateChange(event) {
//   if (event.data === YT.PlayerState.ENDED) {
//     Video has ended
//     console.log('Video finished');
//   }
// }
