import { collection, getDocs, db } from "../../firebase.js";

let scoreInfo = document.getElementById("scoreInfo")

async function fetchScore() {
  let quizId = localStorage.getItem("quizId");
  const querySnapshot = await getDocs(collection(db, "quizzScore"));
  querySnapshot.forEach((doc) => {
    let userId = doc.data().userId
    if(userId == quizId){
        scoreInfo.innerHTML += `<tr><td>${doc.data().quizTitle}</td>
                    <td>${doc.data().quizcategory}</td>
                    <td>${doc.data().correct}</td>
                    <td>${doc.data().wrong}</td>
                    <td>${doc.data().percentage}</td><tr>`
    }
  });
}
window.fetchScore = fetchScore;
