import { Link } from "react-router-dom";

function Nav() {
  
  // variable para sacar la informacion del usuario guardada en el localstorage
  const user = JSON.parse(localStorage.getItem('user')) 
  
  return (
    <>
      <nav>
        <ul>
          <li><Link to={'/about'}>About</Link></li>
          <li><Link to={'/menu'}>Menu</Link></li>
          <li><Link to={'/reservations'}>Reservations</Link></li>
          <li><Link to={'/cart'}>Cart</Link></li>
          {/* si el usuario no ha hecho login se muestra el link login. 
          Si ya ha hecho login se muestra el link de logout */}
          <li>{localStorage.getItem('user')=== null ? (
            <Link to={'/login'}>Login</Link>
            ):(
              // muestra el nombre del usuaro guardado en la variable user
            <Link to={'/logout'}>Hi {user.name}</Link>
            )}
            </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
