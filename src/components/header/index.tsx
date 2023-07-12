import { useEffect, useRef } from "react";
import {
  Header,
  HeaderNav,
  Logo,
  LogoWrapper,
  NavItems,
  NavLink,
  ScrollContext,
} from "./styles";

import type { PropsWithoutRef } from "react";
import useAuth from "@/hooks/use-user";

const links = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
];

export type AppHeaderProps = PropsWithoutRef<{
  dynamicPosition?: boolean;
}>;

export default function AppHeader(props: AppHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContextRef = useRef<HTMLDivElement>(null);

  const [auth] = useAuth();
  console.log(auth);

  // on Component Mount
  useEffect(() => {
    if (props.dynamicPosition) {
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
    } else {
      document.body.classList.add("sticky-header");
      return () => {
        document.body.classList.remove("sticky-header");
      };
    }
  }, [props.dynamicPosition]);

  return (
    <>
      <ScrollContext ref={scrollContextRef} />

      <Header ref={headerRef}>
        <LogoWrapper>
          <Logo>DISROBE</Logo>
        </LogoWrapper>

        <HeaderNav>
          <NavItems>
            {links.map(({ text, href }) => (
              <li key={href}>
                <NavLink href={href}>{text}</NavLink>
              </li>
            ))}
          </NavItems>
        </HeaderNav>
      </Header>
    </>
  );
}
