import { elevation } from "@/styles/shared";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const ScrollContext = styled("div")`
  position: absolute;
  height: 100vh;
  width: 100vw;

  visibility: hidden;
  pointer-events: none;
  opacity: 0;
`;

export const Header = styled("header")`
  position: relative;
  width: 100%;
  padding: 0 30vh;
  top: 0;
  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  height: var(--app-header-height);

  .sticky-header & {
    position: fixed;
    border-bottom: 2px solid rgba(255, 255, 255, 0.15);
    background-color: ${({ theme }) => theme.palette.background.default};

    ${elevation(0.1)}
  }
`;

export const LogoWrapper = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;

  ion-icon {
    font-size: 2.4rem;
    color: general.$primary-color;
  }
`;

export const Logo = styled("span")`
  font-size: 2.4rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const HeaderNav = styled("nav")`
  display: flex;
  gap: 3rem;
`;

export const NavItems = styled("ul")`
  display: flex;
  list-style: none;
  align-items: center;
  gap: 3rem;
  transition: all 0.3s ease;
`;

export const NavLink = styled(Link)`
  font-size: 1.8rem;
  position: relative;

  &:active,
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  &:visited,
  &:link {
    color: inherit;
    text-decoration: none;
  }

  /* hover effects */
  &::after {
    content: "";
    position: absolute;
    height: 3px;
    bottom: -3px;
    background-color: ${({ theme }) => theme.palette.primary.main};

    left: 0;
    right: 100%;
    transition: right ease-out 0.2s;
  }

  &:hover::after {
    right: 0;
  }
`;
