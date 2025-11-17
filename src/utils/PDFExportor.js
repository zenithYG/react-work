import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * A4 페이지에 margin 적용 + 자동 페이지 분할 PDF Export
 */
const exportToPdfA4 = async (
  element,
  fileName = 'document.pdf',
  marginMm = 15 // ← 원하는 A4 마진(mm)
) => {

  console.log("📄 [PDF] A4 자동 페이지 분할 + 마진 적용 Export 시작");

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');

  // px → mm 변환
  const pxToMm = 0.264583;

  // A4 사이즈
  const pageWidth = 210;
  const pageHeight = 297;

  // 출력 가능한 영역 (마진 제외)
  const printableWidth = pageWidth - marginMm * 2;
  const printableHeight = pageHeight - marginMm * 2;

  // 캔버스 실제 크기 mm
  const imgWidthMm = canvas.width * pxToMm;
  const imgHeightMm = canvas.height * pxToMm;

  // A4 안에 width 기준으로 맞춤
  const scale = printableWidth / imgWidthMm;
  const scaledHeightMm = imgHeightMm * scale;

  const pdf = new jsPDF('p', 'mm', 'a4');

  let remainingHeight = scaledHeightMm;
  let positionY = marginMm;

  while (remainingHeight > 0) {
    pdf.addImage(
      imgData,
      'PNG',
      marginMm,        // ← 왼쪽 마진
      positionY,       // ← 상단 마진
      printableWidth,  // 마진 제외 영역 너비
      scaledHeightMm   // 실제 이미지 scaling
    );

    remainingHeight -= printableHeight;

    if (remainingHeight > 0) {
      pdf.addPage();
      positionY -= printableHeight; // 다음 페이지로 넘어가며 영역 이동
    }
  }

  pdf.save(fileName);
  console.log("📄 PDF Export 완료 with margin!");
};

export default exportToPdfA4;
