import { TextLink } from "@/styles/shared";
import {
  FacebookRounded,
  Instagram,
  MailOutline,
  Twitter,
} from "@mui/icons-material";
import { ListItemIcon, ListItemText } from "@mui/material";
import { Linkedin, PhoneOutline } from "mdi-material-ui";
import Link from "next/link";
import {
  ContactListItem,
  Contacts,
  Copyright,
  DisrobeLogo,
  FooterColTitle,
  FooterColumn,
  FooterGrid,
  QuickLink,
  QuickLinks,
  SocialLink,
  Socials,
  StyledFooter,
} from "./styles";

export default function Footer() {
  return (
    <StyledFooter>
      <FooterGrid>
        <FooterColumn>
          <DisrobeLogo href={"/"}>Disrobe</DisrobeLogo>

          <Socials>
            <SocialLink href={"/"} rel="noopener">
              <FacebookRounded />
            </SocialLink>
            <SocialLink href={"/"} rel="noopener">
              <Instagram />
            </SocialLink>
            <SocialLink href={"/"} rel="noopener">
              <Twitter />
            </SocialLink>
            <SocialLink href={"/"} rel="noopener">
              <Linkedin />
            </SocialLink>
          </Socials>

          <Copyright>
            Copyright &copy; Disrobe {new Date().getFullYear()}, All rights
            reserved.
          </Copyright>
        </FooterColumn>

        <FooterColumn>
          <FooterColTitle>Contact Us</FooterColTitle>

          <Contacts dense>
            <ContactListItem
              disableGutters
              href={"phone:+919962606241"}
              component={TextLink}
            >
              <ListItemIcon>
                <PhoneOutline />
              </ListItemIcon>
              <ListItemText>+91 99626 06241</ListItemText>
            </ContactListItem>

            <ContactListItem
              disableGutters
              href={"phone:+919962606241"}
              component={TextLink}
            >
              <ListItemIcon>
                <PhoneOutline />
              </ListItemIcon>
              <ListItemText>+91 95000 62931</ListItemText>
            </ContactListItem>

            <ContactListItem
              disableGutters
              href={"mailto:disrobeblog@gmail.com"}
              component={TextLink}
            >
              <ListItemIcon>
                <MailOutline />
              </ListItemIcon>
              <ListItemText>disrobeblog@gmail.com</ListItemText>
            </ContactListItem>
          </Contacts>
        </FooterColumn>

        <FooterColumn>
          <FooterColTitle>Quick Links</FooterColTitle>

          <QuickLinks>
            <QuickLink disableGutters href="/" component={TextLink}>
              Home
            </QuickLink>
            <QuickLink disableGutters href="/about" component={TextLink}>
              About
            </QuickLink>
          </QuickLinks>
        </FooterColumn>
      </FooterGrid>
    </StyledFooter>
  );
}
