const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pdfService = require('../services/pdfService');
const docxService = require('../services/docxService');

// Export as PDF
router.get('/resume/:id/pdf', auth, async (req, res) => {
  try {
    const pdfBuffer = await pdfService.generatePDF(
      req.params.id,
      req.user.id
    );
    
    const resume = await Resume.findById(req.params.id);
    const fileName = `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`.toLowerCase();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Export Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Export as DOCX
router.get('/resume/:id/docx', auth, async (req, res) => {
  try {
    const docxBuffer = await docxService.generateDOCX(
      req.params.id,
      req.user.id
    );
    
    const resume = await Resume.findById(req.params.id);
    const fileName = `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.docx`.toLowerCase();
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(docxBuffer);
  } catch (error) {
    console.error('DOCX Export Error:', error);
    res.status(500).json({ error: 'Failed to generate DOCX' });
  }
});

module.exports = router;