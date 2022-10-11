import { useNavigate } from "react-router-dom";
import { oauth } from "lib/OAuth";
import { userService } from "services/user/user.service";
import { setUser } from "store/user/user.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { User } from "models/user";

interface Props {
  user: User;
  children: any;
  scopes?: string[];
}

export default function ProtectedRoute({ user, children, scopes = [] }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onInit = async () => {
    const isAuthenticated = await oauth.isAuthenticated();

    if (isAuthenticated) {
      if (!user) {
        const _user = await userService.getOne("me");

        dispatch(setUser(_user));

        if (scopes && scopes.length > 0) {
          if (!scopes.includes(_user.role)) {
            navigate("/", { replace: true });
          }
        }
      }
    } else {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    onInit().then();
  }, []);

  return <>{user && children}</>;
}
