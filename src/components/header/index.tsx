import AccountMenuButton from "@/components/profile-button";
import { theme } from "@/modules/mui-config";
import { CloseSharp, MenuSharp } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  DrawerNavLink,
  Header,
  HeaderNav,
  Logo,
  LogoWrapper,
  NavDrawerButton,
  NavDrawerButtons,
  NavDrawerContent,
  NavItems,
  NavLink,
  ScrollContext,
} from "./styles";

import type { PropsWithoutRef } from "react";
import { PlainLink } from "@/styles/shared";

const links = [
  { href: "/tags/art", text: "Art" },
  { href: "/tags/tech", text: "Tech" },
  { href: "/tags/mental-health", text: "Mental Health" },
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
];

export type AppHeaderProps = PropsWithoutRef<{
  position: "dynamic" | "relative";
}>;

export default function AppHeader(props: AppHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContextRef = useRef<HTMLDivElement>(null);
  const isScreenMd = useMediaQuery(theme.breakpoints.down("md"));
  const [isNavOpen, setNavOpen] = useState(false);

  const onNavClose = () => setNavOpen(false);

  useEffect(() => {
    switch (props.position) {
      case "dynamic": {
        const header = headerRef.current;
        const observerOptions = {
          threshold: 0,
          rootMargin: `${-header!.offsetHeight}px`,
        };

        const observer = new IntersectionObserver((entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            document.body.classList.remove("sticky-header");
          } else {
            document.body.classList.add("sticky-header");
          }
        }, observerOptions);

        observer.observe(scrollContextRef!.current as Element);

        return () => {
          observer.disconnect();
        };
      }

      case "relative": {
        document.body.classList.add("relative-header");
        return () => {
          document.body.classList.remove("relative-header");
        };
      }

      default:
        break;
    }
  }, [props.position]);

  return (
    <>
      <ScrollContext ref={scrollContextRef} />

      <Header ref={headerRef}>
        <LogoWrapper href="/">
          <Logo>DISROBE</Logo>
        </LogoWrapper>

        <HeaderNav>
          {!isScreenMd ? (
            <NavItems>
              {links.map(({ text, href }) => (
                <li key={href}>
                  <NavLink href={href}>{text}</NavLink>
                </li>
              ))}
            </NavItems>
          ) : (
            <NavDrawerButton onClick={() => setNavOpen(!isNavOpen)}>
              <MenuSharp />
            </NavDrawerButton>
          )}
          <AccountMenuButton />
        </HeaderNav>
      </Header>

      <Drawer anchor="right" open={isNavOpen} onClose={onNavClose}>
        <NavDrawerButtons>
          <IconButton size="small" onClick={() => setNavOpen(!isNavOpen)}>
            <CloseSharp />
          </IconButton>
        </NavDrawerButtons>
        <NavDrawerContent>
          <List>
            {links.map(({ text, href }) => (
              <ListItem key={href}>
                <DrawerNavLink href={href} onClick={onNavClose}>
                  {text}
                </DrawerNavLink>
              </ListItem>
            ))}
          </List>
        </NavDrawerContent>
      </Drawer>
    </>
  );
}
