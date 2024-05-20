import { useRoutes } from "react-router-dom";
import routes from "./router";
import useStore from "./store";
import { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "./api/types";

function App() {
  const content = useRoutes(routes);
  const store = useStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMe = async (Authorization: string) => {
      setLoading(true);
      try {
        const { data } = await axios.get<IUser>("/user/me", {
          headers: {
            Authorization,
          },
        });
        store.authUser = data;
      } catch (error) {
        localStorage.removeItem("__token");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("__token");
    const userToken = localStorage.getItem("__user");

    if (token && !userToken) {
      getMe(`Bearer ${token}`);
    }
    if (token && userToken) {
      const user = JSON.parse(userToken);
      store.setAuthUser(user);
    }
  }, []);

  if (loading) return <p>fetching user...</p>;
  return content;
}

export default App;
