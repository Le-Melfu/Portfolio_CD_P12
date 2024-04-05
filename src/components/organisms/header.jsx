import LogoBand from '../molecules/logo_band'

const Header = () => {
  return (
    <header>
      <LogoBand/>
      <nav class="menu">
        <ul>
          <li>Home</li>
          <li>CV</li>
          <li>Musique</li>
          <li>Galerie de Figurines</li>
        </ul>
      </nav>
    </header>
  )
};

export default Header;

