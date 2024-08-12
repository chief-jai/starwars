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
import IconButton from "@mui/joy/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  id: string;
  title: string;
  icon: IconDefinition;
  subtitle?: string;
  description?: string;
  buttons?: Array<ReactNode>;
  className?: string;
  onBack?: () => void;
}

/**
 * The Header component displays a header with a title, icon, subtitle, description, and buttons
 *
 * @component
 * @example
 * ```tsx
 * <Header {...headerProps} />
 * ```
 *
 * @param id - The id of the header
 * @param title - The title of the header
 * @param icon - The icon of the header
 * @param subtitle - The subtitle of the header
 * @param description - The description of the header
 * @param buttons - The buttons to be displayed the header
 * @param className - The class name of the header
 * @param onBack - The function to be called when the back button is clicked
 *
 * @return A React component that represents the header of a page
 */
function Header({
  id,
  title,
  icon,
  subtitle,
  description,
  buttons,
  className,
  onBack,
}: HeaderProps) {
  return (
    <Container id={id} className={className}>
      <TextContainer>
        <TitleContainer>
          {onBack && (
            <IconButton aria-label="back" onClick={onBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </IconButton>
          )}

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
