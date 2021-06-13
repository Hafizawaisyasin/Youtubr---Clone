import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBd8RyfCR1e3mhmUWiRfgUpkwdES-xM06M",
    authDomain: "outube-clone-154.firebaseapp.com",
    projectId: "outube-clone-154",
    storageBucket: "outube-clone-154.appspot.com",
    messagingSenderId: "215128832784",
    appId: "1:215128832784:web:4d325dce5404cf3176c395"
  };


// const firebaseConfig = {
//   apiKey: "AIzaSyBj4c2RGmj4_W8DMDBQ3GXxT3TBimaGfwY",
//   authDomain: "yttest-7566d.firebaseapp.com",
//   projectId: "yttest-7566d",
//   storageBucket: "yttest-7566d.appspot.com",
//   messagingSenderId: "699143616524",
//   appId: "1:699143616524:web:19bf058c9036629e595629",
// };


  firebase.initializeApp(firebaseConfig)


  export default firebase.auth()