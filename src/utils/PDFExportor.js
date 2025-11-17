import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const exportToPdfFullPageWithMargin = async (element, fileName = 'document.pdf') => {
  console.log("📄 [PDF] Export 시작");

  const margin = 20; // mm
  const scale = 2;   // 고화질

  console.log("⚙️ 설정값 | margin(mm):", margin, "scale:", scale);

  // HTML → Canvas 변환
  console.log("🖼 html2canvas 캡처 시작");
  const canvas = await html2canvas(element, {
    scale: scale,
    useCORS: true
  });
  console.log("🖼 html2canvas 캡처 완료");

  const imgData = canvas.toDataURL('image/png');

  // Canvas 크기 (px)
  const canvasWidthPx = canvas.width;
  const canvasHeightPx = canvas.height;

  console.log("📏 Canvas Size(px):", {
    widthPx: canvasWidthPx,
    heightPx: canvasHeightPx
  });

  // px → mm 변환 (1px = 0.264583mm)
  const pxToMm = 0.264583;

  const contentWidthMm = canvasWidthPx * pxToMm;
  const contentHeightMm = canvasHeightPx * pxToMm;

  console.log("📐 변환된 콘텐츠 크기(mm):", {
    widthMm: contentWidthMm,
    heightMm: contentHeightMm
  });

  // PDF 페이지 크기 = 콘텐츠 + margin
  const pdfWidth = contentWidthMm + margin * 2;
  const pdfHeight = contentHeightMm + margin * 2;

  console.log("📄 PDF 페이지 전체 크기(mm):", {
    pdfWidth,
    pdfHeight
  });

  // jsPDF 페이지 제한 체크
  const maxJsPdfHeight = 14400; // jsPDF 내부 한계(mm)
  console.log("⚠️ jsPDF 최대 페이지 높이(mm) 기준:", maxJsPdfHeight);

  if (pdfHeight > maxJsPdfHeight) {
    console.warn("❗⚠️ PDF Height가 jsPDF 최대 허용치를 초과함 → 잘릴 가능성 있음!");
    console.warn("❗ 현재 height:", pdfHeight, ">", maxJsPdfHeight);
  } else {
    console.log("✔ PDF 높이가 jsPDF 제한 이내:", pdfHeight, "<=", maxJsPdfHeight);
  }

  // PDF 생성
  console.log("📄 jsPDF 인스턴스 생성 (커스텀 크기)");
  const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);

  // addImage 정보 출력
  console.log("🖼 addImage 설정:", {
    x: margin,
    y: margin,
    widthMm: contentWidthMm,
    heightMm: contentHeightMm
  });

  pdf.addImage(
    imgData,
    'PNG',
    margin,
    margin,
    contentWidthMm,
    contentHeightMm
  );

  console.log("💾 PDF 저장 시작…");
  pdf.save(fileName);
  console.log("✔ PDF 저장 완료 →", fileName);
};

export default exportToPdfFullPageWithMargin;
