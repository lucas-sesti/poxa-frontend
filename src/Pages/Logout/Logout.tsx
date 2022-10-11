import { useEffect } from "react";
import { oauth } from "lib/OAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/user.slice";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    oauth.logout();
    dispatch(setUser(null));

    navigate("/", { replace: true });
  }, []);

  return <></>;
}
