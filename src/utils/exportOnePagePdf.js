// utils/exportOnePagePdf.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default async function exportOnePagePdf(element, fileName = "resume.pdf") {
    if (!element) return;

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FFFFFF"
    });

    const pxToMm = 0.264583;
    const margin = 8;

    const imgWidthMm = canvas.width * pxToMm;
    const imgHeightMm = canvas.height * pxToMm;

    const pdfWidth = 210; // A4 width
    const contentWidth = pdfWidth - margin * 2;

    const scale = contentWidth / imgWidthMm;
    const contentHeight = imgHeightMm * scale;

    const pdfHeight = contentHeight + margin * 2;

    const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [pdfWidth, pdfHeight]
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.85);

    pdf.addImage(
        imgData,
        "JPEG",
        margin,
        margin,
        contentWidth,
        contentHeight
    );

    pdf.save(fileName);
}