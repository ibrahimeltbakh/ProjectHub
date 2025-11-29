import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

interface PdfFonts {
  pdfMake?: {
    vfs?: Record<string, string>;
  };
}
const typedPdfFonts = pdfFonts as unknown as PdfFonts;

if (typedPdfFonts?.pdfMake?.vfs) {
  pdfMake.vfs = typedPdfFonts.pdfMake.vfs;
}

export default pdfMake;
