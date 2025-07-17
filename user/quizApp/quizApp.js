import { doc, getDoc, db, addDoc, collection, updateDoc  } from "../../firebase.js";

let indexNo = 0;
let CorrectAns = 0;
let WrongAns = 0;
let quizData = "";

let Question = document.getElementById("question-container");
let Option = document.getElementById("option");
let Button = document.getElementById("btn");

function quizHandler() {
  var UiQuestion = quizData[indexNo].Question;
  var UiOption = quizData[indexNo].options;
  Question.innerHTML = UiQuestion;
  Option.innerHTML = "";
  // console.log(UiOption)
  for (var opt of UiOption) {
    Option.innerHTML += `<li onclick='checkHandler(this)'>${opt}</li>`;
  }
}
window.quizHandler = quizHandler;

async function getQuizData() {
  const id = localStorage.getItem("quizId");
  const docRef = doc(db, "QuizData", id);
  const docSnap = await getDoc(docRef);
  let quizAllData = docSnap.data();
  quizData = docSnap.data().questions;
  quizHandler();
  return { data: quizAllData };
}
window.getQuizData = getQuizData;

function nextQuestion() {
  if (indexNo < quizData.length - 1) {
    indexNo++;
    quizHandler();
    if (indexNo == quizData.length - 1) {
      Button.innerHTML = "Submit";
    }
  } else {
    onSubmit();
  }
}
window.nextQuestion = nextQuestion;

function checkHandler(opt) {
  var userAns = opt.innerText;
  var correctAns = quizData[indexNo].correctAnswer;
  if (userAns === correctAns) {
    CorrectAns++;
    opt.style.backgroundColor = "green";
  } else {
    WrongAns++;
    opt.style.backgroundColor = "red";
  }
  var allOptions = Option.children;
  for (var i = 0; i < allOptions.length; i++) {
    allOptions[i].style.pointerEvents = "none";
  }
}
window.checkHandler = checkHandler;

async function onSubmit() {
  try {
    const fetchQuizData = await getQuizData();
    let quizcategory = fetchQuizData.data.Category;
    let quizTitle = fetchQuizData.data.title;
    let totalQuestion = quizData.length;
    let correct = CorrectAns;
    let wrong = WrongAns;
    let userId = localStorage.getItem("quizId");
    let percentage = Math.round((CorrectAns / totalQuestion) * 100);
    //console.log(totalQuestion, correct, wrong, fetchQuizData, quizcategory, quizTitle, id, percentage)
    let saveObj = {
      totalQuestion,
      correct,
      wrong,
      percentage,
      userId,
      quizTitle,
      quizcategory,
    };
    let res = await addDoc(collection(db, "quizzScore"), saveObj);
    const updataDoc = doc(db, "quizzScore", res.id);
    await updateDoc(updataDoc, {
      ScoreId: res.id
    });
    alert("submit")
    window.location.assign("../quizScoreList/quizScoreList.html")
  } catch (error) {
    console.error("Error adding document: ", error, error.message, error.code);
  }
}
window.onSubmit = onSubmit;
