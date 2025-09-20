const express = require('express');
const path = require('path');
const router = express.Router();



/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Download contact details PDF
 *     description: Provides a downloadable PDF file containing contact details.
 *     responses:
 *       200:
 *         description: PDF file successfully downloaded
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               example: "Base64-encoded PDF content"
 *               format: binary
 *       500:
 *         description: Internal server error
 */

// Route to trigger PDF download
router.get('/contact', async (req, res) => {
    const filePath = path.join(__dirname, '../public/contact/aerocet.pdf'); // Adjust path as needed
    console.log("Downloading PDF from:", filePath);

    res.download(filePath, 'aerocet.pdf', (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(err.status || 500).send("Error downloading file.");
        }
    });
});

module.exports = router;
