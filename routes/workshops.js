//Installing the requirements
const fs =require('fs');
const path = require('path');

//Installing the Router
const express = require('express');
const router = express.Router();

//Paths
const workShopDataPath = path.join(__dirname,'../public/workshops.json')

/**
 * @swagger
 * components:
 *   schemas:
 *     Workshop:
 *       type: object
 *       properties:
 *         workshop_id:
 *           type: string
 *           example: "AeroCETWorkshop001"
 *         workshop_name:
 *           type: string
 *           example: "Drone Operation Basics"
 *         instructor:
 *           type: string
 *           example: "Amal Dev"
 *         assistants:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Jyotish", "Rajeev"]
 *         date:
 *           type: string
 *           format: date
 *           example: "2023-03-10"
 *         time:
 *           type: string
 *           example: "4:30 PM"
 *         duration:
 *           type: string
 *           example: "3 hours"
 *         location:
 *           type: string
 *           example: "A301"
 */

/**
 * @swagger
 * /api/workshops:
 *   get:
 *     summary: Get all workshops
 *     description: Returns a list of workshops stored in workshops.json.
 *     responses:
 *       200:
 *         description: A list of workshops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workshop'
 *       500:
 *         description: Internal server error (e.g., file read or JSON parse error)
 */


router.get('/workshops',(req,res)=>{
    fs.readFile(workShopDataPath, "utf8",(err,data)=>{
        if(err){
            console.log(`Error in reading file : `, err);
            res.status(500).json({error:"Internal Server Error"});
        }else{
            try{
                res.status(200).json(JSON.parse(data));
            }catch(parseError){
                console.error("Error in Parsing JSON", parseError);
                res.status(500).json({error:"Invalid JSON Format"})
            }
        }
    });
    
});

module.exports = router;

