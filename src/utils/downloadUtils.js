// utils/downloadUtils.js
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadHTML = (htmlContent, fileName) => {
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName || 'draft.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadPDF = async (htmlContent, fileName) => {
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
      scale: 2, // Improve resolution
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    let heightLeft = imgHeight;

    let position = 0;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      if (heightLeft > 0) {
        pdf.addPage();
      }
      heightLeft -= pageHeight;
    }

    pdf.save(fileName || 'MyCoverLetter.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    document.body.removeChild(container); // Clean up
  }
};
