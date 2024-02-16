import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import RootContainer from '../components/RootContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Root</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Root</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RootContainer name="Root page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
