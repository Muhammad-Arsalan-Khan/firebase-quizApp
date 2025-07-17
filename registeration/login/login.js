import {
  doc,
  auth,
  signInWithEmailAndPassword,
  getDoc,
  db,
} from "../../firebase.js";

const authCheck = () => {
  console.log("i ma authCheck");
  const userUid = localStorage.getItem("QuizAppUid");
  //console.log("userUid", userUid)
  if (userUid) {
    window.location.replace("../../user/dashboard/dashboard.html");
  }
};
window.authCheck = authCheck;

let email = document.querySelector("#email");
let password = document.querySelector("#password");

window.login = login;
async function login() {
    try {
      if (!email.value || !password.value) {
        alert("fill the filed");
        return;
      }
      const createUser = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      alert("User successfully Login!");
      localStorage.setItem("QuizAppUid", JSON.stringify(createUser.user.uid));

      const userData = doc(db, "QuizAppUserRegisteration", createUser.user.uid);
      const docSnap = await getDoc(userData);
      const userType = docSnap.data();
      userType.type === "admin"
        ? window.location.assign("../../admin/dashboard/dashboard.html")
        : window.location.replace("../../user/dashboard.html");
      // if (userType.type === "admin") {
          
      //     window.location.assign("../../admin/dashboard/dashboard.html")
      // } else {
      //     window.location.replace("../../user/dashboard/dashboard.html")
      // }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
    }
}
