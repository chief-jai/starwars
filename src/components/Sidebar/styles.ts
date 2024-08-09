import Sheet from "@mui/joy/Sheet";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface Props {
  $isOpen: boolean;
}

const CustomSheet = styled(Sheet)<Props>`
  background: linear-gradient(180deg, #2e457a 20%, #4374cd 85%);
  height: 100vh;
  width: ${({ $isOpen = true }) => ($isOpen ? "250px" : "72px")};
  transition: width 0.3s ease-in-out;
  padding: 16px;
  color: white !important;

  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Logo = styled.img`
  width: 4em;
`;

const NavItemsContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: ${({ $isOpen = true }) => ($isOpen ? "flex-start" : "center")};
  transition: align-item 3s ease-in-out;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0px;
`;

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
`;

export { CustomSheet, Logo, NavItemsContainer, NavItem, CustomNavLink };
