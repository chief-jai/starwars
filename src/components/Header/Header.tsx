import { ReactNode } from "react";
import {
  ButtonGroup,
  Container,
  SubSectionContainer,
  Subtitle,
  TextContainer,
  Title,
  TitleContainer,
  TitleIcon,
  TitleIconContainer,
} from "./styles";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface HeaderProps {
  id: string;
  title: string;
  icon: IconDefinition;
  subtitle?: string;
  description?: string;
  buttons?: Array<ReactNode>;
  className?: string;
}

function Header({
  id,
  title,
  icon,
  subtitle,
  description,
  buttons,
  className,
}: HeaderProps) {
  return (
    <Container id={id} className={className}>
      <TextContainer>
        <TitleContainer>
          <TitleIconContainer>
            <TitleIcon icon={icon} />
          </TitleIconContainer>
          <Title>{title}</Title>
        </TitleContainer>

        {(subtitle || description) && (
          <SubSectionContainer data-testid="subtitle">
            <Subtitle>
              {subtitle && <span>{subtitle}</span>} |{" "}
              {description && <span>{description}</span>}
            </Subtitle>
          </SubSectionContainer>
        )}
      </TextContainer>

      <ButtonGroup>{buttons}</ButtonGroup>
    </Container>
  );
}

export default Header;
