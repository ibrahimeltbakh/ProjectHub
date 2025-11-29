declare module "pdfmake/build/pdfmake" {
  interface TDocumentDefinitions {
    content: unknown;
    styles?: Record<string, unknown>;
    defaultStyle?: Record<string, unknown>;
  }

  interface CreatePdf {
    download: (fileName?: string) => void;
    open: () => void;
    print: () => void;
  }

  const pdfMake: {
    vfs: Record<string, string>;
    createPdf: (docDefinition: TDocumentDefinitions) => CreatePdf;
  };

  export default pdfMake;
}

declare module "pdfmake/build/vfs_fonts" {
  const pdfFonts: {
    pdfMake: {
      vfs: Record<string, string>;
    };
  };

  export default pdfFonts;
}
