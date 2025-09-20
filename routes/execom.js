const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     ExecomMember:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "SUPARNA"
 *         role:
 *           type: string
 *           example: "Captain"
 *         imgURL:
 *           type: string
 *           format: uri
 *           example: "/execom/1.jpg"
 *     ExecomByYear:
 *       type: object
 *       additionalProperties:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/ExecomMember'
 *       example:
 *         "2025":
 *           - id: 1
 *             name: "SUPARNA"
 *             role: "Captain"
 *             imgURL: "/execom/1.jpg"
 *           - id: 2
 *             name: "AMALA"
 *             role: "Vice Captain"
 *             imgURL: "/execom/2.JPG"
 *         "2026":
 *           - id: 1
 *             name: "TEST@NAME"
 *             role: "test@role"
 *             imgURL: "/execom/1.JPG"
 */

/**
 * @swagger
 * /api/execom:
 *   get:
 *     summary: Get all execom members grouped by year
 *     description: Returns the execom members grouped by year from execom.json
 *     responses:
 *       200:
 *         description: Execom members grouped by year
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExecomByYear'
 *       500:
 *         description: Internal server error (file read or JSON parse error)
 */


router.get('/execom', (req, res) => {
  const filePath = path.join(__dirname, '../public/execom.json');

  // Read the JSON file and send it as a response
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

module.exports = router;
