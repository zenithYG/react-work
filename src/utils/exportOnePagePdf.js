import exportSeparatedPdf from "./exportSeparatedPdf";

export default function exportOnePagePdf(element, fileName = "resume.pdf") {
    return exportSeparatedPdf(element, fileName);
}
