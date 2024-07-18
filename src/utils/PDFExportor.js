import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const exportToPdf = async (element, fileName = 'document.pdf') => {
  // 임시 스타일 시트 생성
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      body {
        font-size: 12px;
        line-height: 1.5;
      }

      h1, h2, h3, h4, h5, h6 {
        font-size: 1.2em;
      }

      .container {
        width: 210mm; /* A4 width */
        padding: 20mm;
        margin: 0;
      }

      /* Adjust other styles as needed */
    }
  `;
  document.head.appendChild(style);

  const canvas = await html2canvas(element, { scale: 2 }); // 스케일을 높여 더 나은 해상도
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(fileName);

  // 임시 스타일 시트 제거
  document.head.removeChild(style);
};

export default exportToPdf;
