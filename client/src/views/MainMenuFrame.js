import logo from '../logo.svg';

function MainMenuElement(username)
{
  const elems = [3];

  elems[0] = (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>);
  
  elems[1] = (
    <h1>Hello, World!</h1>
  );
  elems[2] = (
    <h2>Hello, {username}!</h2>
  );
  return elems;
}

export default MainMenuElement;