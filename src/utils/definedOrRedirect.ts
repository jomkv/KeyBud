import { redirect } from "react-router-dom";

function definedOrRedirect(param: string | undefined): asserts param is string {
  if (param === undefined) {
    redirect("/");
  }
}

export default definedOrRedirect;
