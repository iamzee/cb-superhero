import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { authenticate } from "../helpers/auth";

export default function Callback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = location.hash.slice(
      location.hash.indexOf("=") + 1,
      location.hash.indexOf("&")
    );

    const getUser = async () => {
      const { data } = await axios({
        method: "GET",
        url: `${process.env.ONEAUTH_URL}/api/users/me`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      authenticate({
        token: accessToken,
        user: data,
      });

      navigate("/");
    };
    getUser();
  }, []);

  return <div>Loading...</div>;
}
