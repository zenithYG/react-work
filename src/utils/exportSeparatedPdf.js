import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default async function exportSeparatedPdf(page1, fileName) {
    if (!page1) return;

    await document.fonts?.ready;
    const originalImages = await Promise.all(
        Array.from(page1.querySelectorAll('img[data-pdf-original-image]')).map(async (image) => {
            await image.decode();
            const response = await fetch(image.currentSrc || image.src);
            if (!response.ok) throw new Error('Failed to load original resume photo');
            return { image, data: new Uint8Array(await response.arrayBuffer()) };
        })
    );

    const canvas = await html2canvas(page1, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FFFFFF"
    });

    const pxToMm = 0.264583;
    const margin = 8;

    const imgWidthMm = canvas.width * pxToMm;
    const imgHeightMm = canvas.height * pxToMm;

    const pdfWidth = 210;
    const contentWidth = pdfWidth - margin * 2;
    const scale = contentWidth / imgWidthMm;
    const contentHeight = imgHeightMm * scale;
    const pdfHeight = contentHeight + margin * 2;

    const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
        compress: true
    });

    const imgData = canvas.toDataURL("image/png");

    pdf.addImage(
        imgData,
        "PNG",
        margin,
        margin,
        contentWidth,
        contentHeight
    );

    // Embed the original photo over the screenshot to preserve its full resolution.
    const pageRect = page1.getBoundingClientRect();
    const mmPerPixel = contentWidth / pageRect.width;
    for (const { image, data } of originalImages) {
        const rect = image.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        const fit = Math.min(rect.width / image.naturalWidth, rect.height / image.naturalHeight);
        const width = image.naturalWidth * fit;
        const height = image.naturalHeight * fit;
        pdf.addImage(
            data,
            'JPEG',
            margin + (rect.left - pageRect.left + (rect.width - width) / 2) * mmPerPixel,
            margin + (rect.top - pageRect.top + (rect.height - height) / 2) * mmPerPixel,
            width * mmPerPixel,
            height * mmPerPixel
        );
    }

    pdf.save(fileName);
}
