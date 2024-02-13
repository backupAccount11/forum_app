import { useContext } from "react";
import UserContext from './UserContext';


export default function Home() {
    const { user, setUser } = useContext(UserContext);
  
    return (
      <div>
        <h1>homepage</h1>
        <p>Hello, {user.username}</p>

        {/* <Button onClick={logout}>Logout</Button> */}
        {/* {user ? (
          <p>Welcome, {user.username}!</p>
        ) : (
          <p>Please log in to continue</p> // redirect here to auth_page
        )} */}
      </div>
    );
  };
