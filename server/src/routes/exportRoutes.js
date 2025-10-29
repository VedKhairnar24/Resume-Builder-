const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pdfService = require('../services/pdfService');
const docxService = require('../services/docxService');

// Export as PDF
router.get('/resume/:id/pdf', auth, async (req, res) => {
  try {
    // Validate resume ID
    if (!req.params.id) {
      return res.status(400).json({ error: 'Resume ID is required' });
    }

    // Generate PDF
    console.log('Starting PDF generation request for resume:', req.params.id);
    const pdfBuffer = await pdfService.generatePDF(
      req.params.id,
      req.user.id
    );
    
    if (!pdfBuffer || pdfBuffer.length === 0) {
      console.error('PDF Buffer is empty or null');
      return res.status(500).json({ error: 'PDF generation failed - empty buffer' });
    }

    console.log('PDF generated successfully, size:', pdfBuffer.length);
    
    // Get resume data for filename
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Create safe filename
    const safeName = resume.personalInfo?.fullName?.replace(/[^a-z0-9]/gi, '_') || 'resume';
    const fileName = `${safeName}_${Date.now()}.pdf`.toLowerCase();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Cache-Control', 'no-cache');
    
    // Send the PDF
    res.send(pdfBuffer);
    
    console.log('PDF sent successfully');
  } catch (error) {
    console.error('Detailed PDF Export Error:', {
      error: error.message,
      stack: error.stack,
      resumeId: req.params.id,
      userId: req.user.id
    });
    
    // Send appropriate error response
    if (error.message.includes('Resume not found')) {
      res.status(404).json({ error: 'Resume not found' });
    } else if (error.message.includes('Unauthorized')) {
      res.status(403).json({ error: 'Unauthorized access to resume' });
    } else {
      res.status(500).json({ 
        error: 'Failed to generate PDF',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
});

// Generate PDF from unsaved data
router.post('/generate/pdf', auth, async (req, res) => {
  try {
    if (!req.body.resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    console.log('Starting PDF generation from form data');
    const pdfBuffer = await pdfService.generatePDFFromData(req.body.resumeData);
    
    if (!pdfBuffer || pdfBuffer.length === 0) {
      console.error('PDF Buffer is empty or null');
      return res.status(500).json({ error: 'PDF generation failed - empty buffer' });
    }

    console.log('PDF generated successfully, size:', pdfBuffer.length);
    
    // Create safe filename
    const safeName = req.body.resumeData.personalInfo?.name?.replace(/[^a-z0-9]/gi, '_') || 'resume';
    const fileName = `${safeName}_${Date.now()}.pdf`.toLowerCase();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Cache-Control', 'no-cache');
    
    // Send the PDF
    res.send(pdfBuffer);
    
    console.log('PDF sent successfully');
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Generate DOCX from unsaved data
router.post('/generate/docx', auth, async (req, res) => {
  try {
    if (!req.body.resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    console.log('Starting DOCX generation from form data');
    const docxBuffer = await docxService.generateDOCXFromData(req.body.resumeData);
    
    if (!docxBuffer || docxBuffer.length === 0) {
      console.error('DOCX Buffer is empty or null');
      return res.status(500).json({ error: 'DOCX generation failed - empty buffer' });
    }

    // Create safe filename
    const safeName = req.body.resumeData.personalInfo?.name?.replace(/[^a-z0-9]/gi, '_') || 'resume';
    const fileName = `${safeName}_${Date.now()}.docx`.toLowerCase();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', docxBuffer.length);
    res.setHeader('Cache-Control', 'no-cache');
    
    // Send the DOCX
    res.send(docxBuffer);
    
    console.log('DOCX sent successfully');
  } catch (error) {
    console.error('DOCX Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate DOCX' });
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