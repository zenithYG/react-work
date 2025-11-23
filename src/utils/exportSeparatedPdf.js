import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default async function exportSeparatedPdf(page1, fileName) {
    const pdf = new jsPDF("p", "mm", "a4");

    // 📌 글자 가독성을 살리는 최적 값 (scale: 2)
    const canvas = await html2canvas(page1, {
        scale: 2,
        useCORS: true
    });

    const pxToMm = 0.264583;
    const margin = 8;
    const pageWidth = 210 - margin * 2;
    const pageHeight = 297 - margin * 2;

    const imgWidthMm = canvas.width * pxToMm;
    const imgHeightMm = canvas.height * pxToMm;
    const scale = pageWidth / imgWidthMm;
    const scaledHeightPx = (pageHeight / pxToMm) / scale;
    const totalPages = Math.ceil(canvas.height / scaledHeightPx);

    for (let page = 0; page < totalPages; page++) {
        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = canvas.width;
        cropCanvas.height = scaledHeightPx;

        const ctx = cropCanvas.getContext("2d");

        // 🏳 흰 배경 적용 (투명 → 검정 방지 + 글자 대비 증가)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, cropCanvas.width, cropCanvas.height);

        ctx.drawImage(
            canvas,
            0, page * scaledHeightPx,
            canvas.width, scaledHeightPx,
            0, 0,
            canvas.width, scaledHeightPx
        );

        // 📌 JPEG 품질을 0.75로 올려 글자 선명도 개선
        const imgData = cropCanvas.toDataURL("image/jpeg", 0.75);

        if (page !== 0) pdf.addPage();

        pdf.addImage(imgData, "JPEG", margin, margin, pageWidth, pageHeight);
    }

    pdf.save(fileName);
}
