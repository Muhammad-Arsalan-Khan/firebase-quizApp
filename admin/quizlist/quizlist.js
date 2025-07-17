import { collection, getDocs, db, updateDoc, doc } from "../../firebase.js";

// let title = document.getElementById("title");
// let Category = document.getElementById("Category");
// let btn = document.getElementById("btn");
let container = document.getElementById("container");

async function getQuizList() {
  try {
    const quizList = await getDocs(collection(db, "QuizData"));
    container.innerHTML = "";
    quizList.forEach((doc) => {
      const title = doc.data().title;
      const Category = doc.data().Category;
      const isActive = doc.data().isActive;
    //   console.log(title, Category, isActive);
      container.innerHTML += `<div class='quiz-container'>
                <h3 class='title' id='title'>${title}</h3>
                <p class='Category' id='Category'>${Category}</p>
                ${
                  isActive
                    ? `<button class='btn btnGreen' id=${doc.id} onclick="InactiveQuiz(this)">Active</button>`
                    : `<button class='btn btnRed' id=${doc.id} onclick="activeQuiz(this)" >Inactive</button>`
                }
            </div>`;
    });
  } catch (error) {
    console.error("Error getting documents: ", error.message, error.code);
  }
}
window.getQuizList = getQuizList;

async function InactiveQuiz(e) {
    try {
        let id = e.id;
        let updateQuiz = await updateDoc(doc(db, "QuizData", id), {
            isActive: false,
        });
        getQuizList();
    } catch (error) {
        console.error("Error getting documents: ", error.message, error.code);
    }
}
window.InactiveQuiz = InactiveQuiz;

async function activeQuiz(e) {
    try {
        let id = e.id;
        let updateQuiz = await updateDoc(doc(db, "QuizData", id), {
            isActive: true,
        });
        getQuizList();
    } catch (error) {
        console.error("Error getting documents: ", error.message, error.code);
    }
}
window.activeQuiz = activeQuiz;