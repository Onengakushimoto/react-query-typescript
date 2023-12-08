import { ReactElement } from "react";
import { Route, Routes as RouteWrapper } from "react-router-dom";

import { Calendar } from "../appointments/Calendar";
import { AllStaff } from "../staff/AllStaff";
import { Treatments } from "../treatments/Treatments";
import { Signin } from "../user/Signin";
import { UserProfile } from "../user/UserProfile";
import { Home } from "./Home";

export function Routes(): ReactElement {
  return (
    <RouteWrapper>
      <Route path="/Staff" Component={AllStaff} />
      <Route path="/Calendar" Component={Calendar} />
      <Route path="/Treatments" Component={Treatments} />
      <Route path="/signin" Component={Signin} />
      <Route path="/user/:id" Component={UserProfile} />
      <Route path="/" Component={Home} />
    </RouteWrapper>
  );
}
