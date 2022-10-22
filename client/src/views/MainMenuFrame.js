import logo from '../logo.svg';
import './MainMenuStyle.css';

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
      <button class="inlineText" id="login">Login</button>
    </div>
  ); 

  return elems;
}

export default MainMenuElements;