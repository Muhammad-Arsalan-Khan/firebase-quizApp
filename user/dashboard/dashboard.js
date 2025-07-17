import { collection, getDocs, db, updateDoc, doc } from "../../firebase.js";

let container = document.getElementById("container");


async function getQuiz() {
  try {
    const quizList = await getDocs(collection(db, "QuizData"));
    container.innerHTML = "";
    quizList.forEach((doc) => {
      const title = doc.data().title;
      const Category = doc.data().Category;
      const isActive = doc.data().isActive;
      if(isActive){
        container.innerHTML += `<div class='quiz-container'>
                <h3 class='title' id='title'>${title}</h3>
                <p class='Category' id='Category'>${Category}</p>
                <button class='btn btnGreen' id=${doc.id} onclick="QuizStart(this)">Quiz Start</button>
            </div>`;
      }
    });
  } catch (error) {
    console.error("Error getting documents: ", error.message, error.code);
  }
}
window.getQuiz = getQuiz;

async function QuizStart(e) {
    try {
        let id = e.id;
        localStorage.setItem("quizId", id);
        window.location.assign("../quizApp/quizApp.html");
    } catch (error) {
        console.error("Error getting documents: ", error.message, error.code);
    }
}
window.QuizStart = QuizStart;




