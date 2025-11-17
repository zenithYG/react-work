import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default async function exportSeparatedPdf(page1, fileName) {
    const pdf = new jsPDF("p", "mm", "a4");

    async function capture(el) {
        return await html2canvas(el, {
            scale: 2,
            useCORS: true,
        });
    }

    const pxToMm = 0.264583;
    const margin = 15;
    const pageW = 210 - margin * 2;
    const pageH = 297 - margin * 2;

    const pages = [page1];

    for (let i = 0; i < pages.length; i++) {
        const canvas = await capture(pages[i]);
        const imgData = canvas.toDataURL("image/png");

        const imgW = canvas.width * pxToMm;
        const imgH = canvas.height * pxToMm;

        const scale = pageW / imgW;
        const scaledH = imgH * scale;

        let remain = scaledH;
        let y = margin;

        while (remain > 0) {
            pdf.addImage(imgData, "PNG", margin, y, pageW, scaledH);

            remain -= pageH;

            if (remain > 0) {
                pdf.addPage();
                y -= pageH;
            }
        }

        if (i < pages.length - 1) pdf.addPage();
    }

    pdf.save(fileName);
}
