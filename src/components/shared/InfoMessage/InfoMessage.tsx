import {
  faExclamationTriangle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Typography from "@mui/joy/Typography";
import { InfoMessageIcon, LoaderAndErrorContainer } from "styles";

export interface InfoMessageProps {
  id: string;
  icon?: IconDefinition;
  primaryMessage?: string;
  secondaryMessage?: string;
}

const DEFAULT_ICON = faExclamationTriangle;
const DEFAULT_PRIMARY_MESSAGE = "Oops! There was an error fetching the data.";

/**
 * The InfoMessage component displays a Info Message with an icon, primaryMessage, secondaryMessage
 *
 * @component
 * @example
 * ```tsx
 * <InfoMessage {...infoMessageProps} />
 * ```
 *
 * @param id - The id of the InfoMessage
 * @param icon - The icon of the InfoMessage
 * @param primaryMessage - The primary message of the InfoMessage
 * @param secondaryMessage - The secondaryMessage of the InfoMessage
 *
 * @return A React component that represents the info message of a page
 */
function InfoMessage({
  id,
  icon = DEFAULT_ICON,
  primaryMessage = DEFAULT_PRIMARY_MESSAGE,
  secondaryMessage,
}: InfoMessageProps) {
  return (
    <LoaderAndErrorContainer id={id}>
      <InfoMessageIcon icon={icon}></InfoMessageIcon>
      <Typography level="body-lg">{primaryMessage}</Typography>
      <Typography level="body-sm">{secondaryMessage}</Typography>
    </LoaderAndErrorContainer>
  );
}

export default InfoMessage;
