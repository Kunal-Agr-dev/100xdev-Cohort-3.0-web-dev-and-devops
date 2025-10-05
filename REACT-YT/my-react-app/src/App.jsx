import Button from "./Button.jsx";
import Header from "./Header.jsx";
import Student from "./Student.jsx";
import UserGreeting from "./UserGreeting.jsx"
import Fruit from "./Fruit.jsx";
import ProfilePic from "./ProfilePic.jsx";
import MyComponent1 from "./MyComponent1.jsx";
import Counter from "./Counter.jsx";
import MyComponent2 from "./MyComponent2.jsx";
import ColorPicker from "./ColorPicker.jsx";
import MyComponent3 from "./MyComponent3.jsx";
import MyComponent4 from "./MyComponent4.jsx";
import ToDoList from "./ToDoList.jsx";
import TestingMe from "./TestingME.jsx";

function App() {
  return(
    <>
      <Header/>
      <Button/> <br/><br/>
      <ProfilePic/>
      <Student name="Kamlesh" age={20} isStudent={false}/>
      <Student name="Yogesh" age={21} isStudent={true}/>
      <Student name="Dogesh" age={41} />
      <UserGreeting username="BroCode" isLoggedIn={true}/>
      <h2>LIST:</h2>
      <Fruit/>
      <MyComponent1/>
      <hr/>
      <Counter/>
      <hr/>
      <MyComponent2/>
      <hr/>
      <ColorPicker/>
      <hr/>
      <MyComponent3/>
      <hr/>
      <MyComponent4/>
      <hr/>
      <ToDoList/>
      <hr/>
      <TestingMe/>
      <hr/>
    </>
  );
}



export default App

