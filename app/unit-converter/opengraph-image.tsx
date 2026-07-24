import { toolOgImage, size, contentType } from "@/lib/og";
import { getToolBySlug } from "@/lib/racks";

export { size, contentType };

const tool = getToolBySlug("unit-converter")!;

export default function Image() {
  return toolOgImage(tool.name);
}
