import Card from "@mui/joy/Card";
import { ReactElement } from "react";

interface PreviewCardProps {
  src: string;
  content?: ReactElement;
}

function PreviewCard({ content, src }: PreviewCardProps) {
  return (
    <Card sx={{ minHeight: "250px", width: "22%" }}>
      <img src={src} srcSet={`${src} 2x`} style={{ aspectRatio: 1 }} />

      {content}
    </Card>
  );
}

export default PreviewCard;
