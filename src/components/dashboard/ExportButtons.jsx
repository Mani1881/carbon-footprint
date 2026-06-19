import { useState } from 'react';
import PropTypes from 'prop-types';
import { Download, FileText, Loader2 } from 'lucide-react';

export default function ExportButtons({ targetRef }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportImage = async () => {
    if (!targetRef.current) return;
    try {
      setIsExporting(true);
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: '#0f172a', // match dark theme background
        scale: 2, // better resolution
        useCORS: true,
        logging: false
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'My_EcoTrace_Score.png';
      link.click();
    } catch (error) {
      console.error('Failed to export image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    if (!targetRef.current) return;
    try {
      setIsExporting(true);
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate PDF dimensions based on the canvas aspect ratio
      const pdf = new jsPDF('landscape', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const targetWidth = imgWidth * ratio;
      const targetHeight = imgHeight * ratio;
      
      // Center the image
      const x = (pdfWidth - targetWidth) / 2;
      const y = (pdfHeight - targetHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, targetWidth, targetHeight);
      pdf.save('My_EcoTrace_Report.pdf');
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
      <button 
        onClick={handleExportImage} 
        disabled={isExporting}
        className="btn-secondary flex items-center gap-2 text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Download dashboard as image"
      >
        {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
        Save Image
      </button>
      <button 
        onClick={handleExportPDF} 
        disabled={isExporting}
        className="btn-secondary flex items-center gap-2 text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Download dashboard as PDF report"
      >
        {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
        Export PDF
      </button>
    </div>
  );
}

ExportButtons.propTypes = {
  targetRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
};
