import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const DashboardUI = () => {
  const { user } = useAuth(); // Get logged-in user
  console.log(user);
  return (
    <div>
      <h1>I am the user dashboard</h1>
      <h2>Hi {user.email}</h2>
    </div>
  );
};

export default DashboardUI;
