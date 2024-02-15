import { useContext } from "react";
import UserContext from '../utils/UserContext';
import MainSearchAppBar from "../components/main_navbar";


export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <MainSearchAppBar username={user.username} />

      <h1>homepage</h1>

      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>Please log in to continue</p> // redirect here to auth_page
      )}
    </div>
  );
};
