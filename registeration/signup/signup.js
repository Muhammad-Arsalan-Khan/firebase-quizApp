import {
  db,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  auth,
} from "../../firebase.js";


const authCheck = () => {
    console.log("i ma authCheck")
    const userUid = localStorage.getItem("QuizAppUid")
    //console.log("userUid", userUid)
    if (userUid) {
    window.location.replace("../../index.html")
    }
}
window.authCheck = authCheck;

let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmpassword = document.querySelector("#confirm-password");

window.SignIn = SignIn;
async function SignIn() {
  try {
    if (
      !firstName.value ||
      !lastName.value ||
      !email.value ||
      !password.value ||
      !confirmpassword.value
    ) {
      alert("fill the filed");
      return
    }
    if (password.value !== confirmpassword.value) {
      alert("Password not match");
      return
    }
    const createUser = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    alert("User successfully SignUp!");
    const UserInfo = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      type: "user",
    };
    const docRef = await setDoc(
      doc(db, "QuizAppUserRegisteration", createUser.user.uid),
      { ...UserInfo, uid: createUser.user.uid }
    );
    console.log("user successfully added");
    window.location.replace("../../index.html")
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage, errorCode);
  }
}
