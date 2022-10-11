import { CheckoutForm } from "models/components/form";
import { UserParams } from "models/user";
import { cleanCpfMask } from "utils/cpf/cpf.utils";
import { userService } from "services/user/user.service";
import { oauth } from "../../../lib/OAuth";
import { AnyAction, Dispatch } from "redux";
import { setUser } from "../../../store/user/user.slice";

export async function createUser(
  form: CheckoutForm,
  dispatch: Dispatch<AnyAction>
) {
  const userData: UserParams = {
    email: form.email,
    full_name: form.full_name,
    cpf: cleanCpfMask(form.cpf),
    phone: form.phone,
    password: form.password,
  };

  await userService.createUser(userData);
  await oauth.login(userData.email, userData.password);
  const user = await userService.getOne("me");

  dispatch(setUser(user));

  return user;
}
