import { Outlet } from "react-router-dom";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

const AuthLayout = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Penny Track</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Outlet />
      </IonContent>
    </>
  );
};

export default AuthLayout;
