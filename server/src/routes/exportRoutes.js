import express from 'express';
import auth from '../middleware/auth.js';
import pdfService from '../services/pdfService.js';
import docxService from '../services/docxService.js';
// If you use Resume model, import it too:
import Resume from '../models/Resume.js';

const router = express.Router();

// Export as PDF
router.get('/resume/:id/pdf', auth, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Resume ID is required' });
    }

    console.log('Starting PDF generation request for resume:', req.params.id);
    const pdfBuffer = await pdfService.generatePDF(req.params.id, req.user.id);

    if (!pdfBuffer || pdfBuffer.length === 0) {
      console.error('PDF Buffer is empty or null');
      return res.status(500).json({ error: 'PDF generation failed - empty buffer' });
    }

    console.log('PDF generated successfully, size:', pdfBuffer.length);

    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const safeName = resume.personalInfo?.fullName?.replace(/[^a-z0-9]/gi, '_') || 'resume';
    const fileName = `${safeName}_${Date.now()}.pdf`.toLowerCase();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Cache-Control', 'no-cache');

    res.send(pdfBuffer);
    console.log('PDF sent successfully');
  } catch (error) {
    console.error('Detailed PDF Export Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Other routes remain same...

export default router;
