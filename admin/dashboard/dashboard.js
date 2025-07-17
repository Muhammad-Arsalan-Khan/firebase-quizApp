import { collection, getDocs, db, doc, getDoc } from "../../firebase.js";

async function fetchScore() {
  const querySnapshot = await getDocs(
    collection(db, "QuizAppUserRegisteration")
  );
  querySnapshot.forEach(async (doc) => {
    console.log(doc.id, " => ", doc.data().firstName);
  });

  const quizzScore = await getDocs(
    collection(db, "quizzScore")
  );
  quizzScore.forEach(async (Score) => {
    console.log(Score.id, " => ", Score.data());
  });
}
window.fetchScore = fetchScore;


function logout() {
  localStorage.removeItem("quizId")
  localStorage.removeItem("QuizAppUid")
  
  fetchScore()
}
window.logout = logout;