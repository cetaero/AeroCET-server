const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     AnnouncementsAPI:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         heading:
 *           type: string
 *           example: "Technical Team Recruitment Results"
 *         message:
 *           type: string
 *           example: "Welcome to the Technical Team of Aero CET!"
 *         excel:
 *           type: string
 *           example: "/xlsxDownload/technical_results.xlsx"
 */

/**
 * @swagger
 * /api/announcements:
 *   get:
 *     summary: Get all announcements
 *     description: Get the Results, Announcements, Notices, etc from announcements.json
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AnnouncementsAPI'
 *       500:
 *         description: Internal Server Error (Error in reading the file or parsing JSON data)
 */



// Announcements Route
router.get('/announcements', (req, res) => {
  const filePath = path.join(__dirname, '../public/announcements.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading announcements.json:', err);
      return res.status(500).json({ error: 'Error reading announcements data' });
    }

    try {
      const announcements = JSON.parse(data);
      res.json(announcements);
    } catch (parseError) {
      console.error('Error parsing announcements.json:', parseError);
      res.status(500).json({ error: 'Error parsing announcements data' });
    }
  });
});

module.exports = router;
