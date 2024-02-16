import './RootContainer.css';
import { IonInput, IonItem, IonLabel, IonList, IonButton } from '@ionic/react';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <IonList>
        <IonItem>
          <IonLabel position="floating">First name</IonLabel>
          <IonInput placeholder=""></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Last name</IonLabel>
          <IonInput placeholder=""></IonInput>
        </IonItem>
      </IonList>
      <IonButton expand="block">Continue</IonButton>
    </div>
  );
};

export default ExploreContainer;
