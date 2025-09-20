//Installing the requirements
const fs =require('fs');
const path = require('path');

//Installing the Router
const express = require('express');
const router = express.Router();

//Paths
const projectsDataPath = path.join(__dirname,'../public/projects.json')


/**
 * @swagger
 * components:
 *   schemas:
 *     Projects API :
 *       type: object
 *       properties:
 *         project_id:
 *           type: string
 *           example: "AeroCETProject001"
 *         project_name:
 *           type: string
 *           example: "AeroCET Drone Project"
 *         project_head:
 *           type: string
 *           example: "Alex"
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2023-01-15"
 *         end_date:
 *           type: string
 *           format: date
 *           example: "2023-12-31"
 *         status:
 *           type: string
 *           example: "In Progress"
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     description: Returns a list of projects stored in projects.json.
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Projects API'
 *       500:
 *         description: Internal server error (file read or JSON parse error)
 */



router.get('/projects',(req,res)=>{
    fs.readFile(projectsDataPath, "utf8",(err,data)=>{
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

