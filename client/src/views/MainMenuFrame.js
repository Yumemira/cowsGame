import logo from '../logo.svg';
import './MainMenuStyle.css';
import ReactDOM from 'react-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

function MainMenuElements()
{
  const elems = [3];

  //TODO: container main with contents, container upperFrame, top-right account button
  // upper frame with buttons that represents play, forum and about links to go;
  elems[0] = (
    <footer>
      <div id="upperFrame">
        <nav>
          <a>Play</a>|
          <a>Forum</a>|
          <a>About</a>
        </nav>
      </div>
    </footer>
  );

  //main container with content loads dynamicly
  elems[1] = (
    <main>
      
    </main>
  ); 

  elems[2] = (
    <div id="userProfile">
      <p class="inlineText">{"<<"}</p>
      <button class="inlineText" id="login" onClick="loginInstantiate()">Login</button>
    </div>
  ); 

  return elems;
}

function loginInstantiate()
{

  root.render(<loginElement />);
}

export default MainMenuElements;

class loginElement extends React.Component
{
  render() {
    return (
      <section id="loginMenu">
        <form id="logregField">
          <fieldset>
            <legend>Register:</legend>
            <label for="email">email: </label>
            <input type="email" name="email"></input>
            <label for="username">name: </label>
            <input type="text" name="username"></input>
            <label for="password">password: </label>
            <input type="password" name="password"></input>
            <label for="repeatPassword">repeat: </label>
            <input type="password" name="repeatPassword"></input>
            <button name="submitForm" value="Register"></button>
          </fieldset>
        </form>
      </section>
    );
  }
}