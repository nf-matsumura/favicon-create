import sharp from "sharp";
import fs from "fs";
import pngToIco from "png-to-ico";

const svgFilePath = "icon.svg";
const tempPngFilePath = "icon.png";
const icoFilePath = "icon.ico";

const svgBuffer = fs.readFileSync(svgFilePath);

try {
  await sharp(svgBuffer).png().toFile(tempPngFilePath);

  const pngBuffer = await sharp(tempPngFilePath).toBuffer();

  const icoBuffer = await pngToIco(pngBuffer);

  fs.writeFileSync(icoFilePath, icoBuffer);
  console.log("Successfully converted SVG to ICO");
  fs.unlinkSync(tempPngFilePath);
} catch (err) {
  console.error("Error converting SVG to ICO:", err);
}
