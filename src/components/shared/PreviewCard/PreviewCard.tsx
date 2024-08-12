import Card from "@mui/joy/Card";
import { ReactElement } from "react";

interface PreviewCardProps {
  src: string;
  content?: ReactElement;
}

/**
 * The PreviewCard component displays a preview card with an image and some dynamic card content
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCard {...previewCardProps} />
 * ```
 *
 * @param src - The source of the image to be displayed in the preview
 * @param content - The content of the preview card
 *
 * @return A React component that represents the preview card
 */
function PreviewCard({ content, src }: PreviewCardProps) {
  return (
    <Card sx={{ minHeight: "150px", width: "18%" }}>
      <img src={src} srcSet={`${src} 2x`} style={{ aspectRatio: 1 }} />

      {content}
    </Card>
  );
}

export default PreviewCard;
