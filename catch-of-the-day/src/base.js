import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCxfc3ZnNYHsI13xziQIsVxCVWv3sOI6z0",
    authDomain: "catch-of-the-day-b1f53.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-b1f53.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

// Default export
export default base;