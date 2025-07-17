import { collection, addDoc, db } from "../../firebase.js";


let title = document.getElementById("title");
let Category = document.getElementById("Category");
let Question = document.getElementById("Question");
let Option1 = document.getElementById("Option-1");
let Option2 = document.getElementById("Option-2");
let Option3 = document.getElementById("Option-3");
let Option4 = document.getElementById("Option-4");
let correctAnswer = document.getElementById("correct-ans");
let questioArray = [];


function addQuestion() {
    if(!Question.value || !Option1.value || !Option2.value || !Option3.value || !Option4.value || !correctAnswer.value) {
        alert("Please fill all the fields");
        return;
    }
  let questionInfo = {
    Question: Question.value,
    options : [Option1.value, Option2.value, Option3.value, Option4.value],
    correctAnswer: correctAnswer.value,
  };
  questioArray.push(questionInfo);
  console.log(questioArray);
  Question.value = "";
  Option1.value = "";
  Option2.value = "";
  Option3.value = "";
  Option4.value = "";
  correctAnswer.value = "";
}
window.addQuestion = addQuestion;


async function CreateQuiz(){
    try {
        if(!title.value || !Category.value || questioArray.length === 0){
            alert( "Please fill all the fields" );
            return;
        }
        const quizData = {
            title: title.value,
            Category: Category.value,
            questions: questioArray,
            isActive: false,
        }
        const docRef = await addDoc(collection(db, "QuizData"), quizData);
        alert("Quiz created successfully");
        title.value = "";
        Category.value = "";
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
window.CreateQuiz = CreateQuiz;