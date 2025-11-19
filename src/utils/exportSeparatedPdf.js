import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default async function exportSeparatedPdf(page1, fileName) {
    const pdf = new jsPDF("p", "mm", "a4");

    const canvas = await html2canvas(page1, {
        scale: 2,
        useCORS: true,
    });

    const pxToMm = 0.264583;
    const margin = 8;                    // ✔ 상·하단 마진 유지
    const pageWidth = 210 - margin * 2;
    const pageHeight = 297 - margin * 2;

    const imgWidthMm = canvas.width * pxToMm;
    const imgHeightMm = canvas.height * pxToMm;

    const scale = pageWidth / imgWidthMm;

    const scaledHeightPx = (pageHeight / pxToMm) / scale;

    const totalPages = Math.ceil(canvas.height / scaledHeightPx);

    for (let page = 0; page < totalPages; page++) {
        // 새로운 잘린 캔버스 만들기
        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = canvas.width;
        cropCanvas.height = scaledHeightPx;

        const ctx = cropCanvas.getContext("2d");

        // 특정 영역 잘라서 그리기
        ctx.drawImage(
            canvas,
            0,
            page * scaledHeightPx,
            canvas.width,
            scaledHeightPx,
            0,
            0,
            canvas.width,
            scaledHeightPx
        );

        const imgData = cropCanvas.toDataURL("image/png");

        if (page !== 0) pdf.addPage();

        pdf.addImage(
            imgData,
            "PNG",
            margin,
            margin,
            pageWidth,
            pageHeight
        );
    }

    pdf.save(fileName);
}
