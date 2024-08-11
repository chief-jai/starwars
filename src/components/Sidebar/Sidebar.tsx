import { useEffect, useRef, useState } from "react";
import {
  CustomNavLink,
  CustomSheet,
  Logo,
  NavItem,
  NavItemsContainer,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthEurope,
  faFilm,
  faRocket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const sidebarReference = sidebarRef.current;

    if (!sidebarReference) return;

    sidebarReference.addEventListener("mouseenter", handleMouseEnter);
    sidebarReference.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (!sidebarReference) return;

      sidebarReference.removeEventListener("mouseenter", handleMouseEnter);
      sidebarReference.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <CustomSheet data-testid="sidebar" $isOpen={isOpen} ref={sidebarRef}>
      <Logo src="./src/assets/starwars.png" alt="Logo" />
      <NavItemsContainer $isOpen={isOpen}>
        <NavItem>
          <FontAwesomeIcon icon={faUsers} />
          {isOpen && <CustomNavLink to="/">Characters</CustomNavLink>}
        </NavItem>
        <NavItem>
          <FontAwesomeIcon icon={faFilm} />
          {isOpen && <CustomNavLink to="/films">Films</CustomNavLink>}
        </NavItem>
        <NavItem>
          <FontAwesomeIcon icon={faEarthEurope} />
          {isOpen && <CustomNavLink to="/planets">Planets</CustomNavLink>}
        </NavItem>
        <NavItem>
          <FontAwesomeIcon icon={faRocket} />
          {isOpen && <CustomNavLink to="/starships">Starships</CustomNavLink>}
        </NavItem>
      </NavItemsContainer>
    </CustomSheet>
  );
}

export default Sidebar;
