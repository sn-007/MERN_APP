var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Rec = require("../models/recruiter");
const Applicant = require("../models/applicant");




// Getting all the recs
router.get("/recs", function(req, res) {
    Rec.find(function(err, recs) {
		if (err) {
			console.log(err);
		} else {
			res.json(recs);
		}
	})
});



//Getting all the applicants
router.get("/applicants", function(req, res) {
    Applicant.find(function(err, applicants) {
		if (err) {
			console.log(err);
		} else {
			res.json(applicants);
		}
	})
});




// Add a recruiter to db
router.post("/rec/register", (req, res) => {
    const newRec = new Rec({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        rating:'0'
    });

    newRec.save()
        .then(rec => {
            res.status(200).json(rec);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});




//Add an Applicant to db
router.post("/applicant/register", (req, res) => {
    const newApplicant = new Applicant({
        name: req.body.name,
        email: req.body.email,
        //date: req.body.date,
        education:req.body.education,
        skillset : req.body.skillset,
        rating : '0',
        password: req.body.password
    });

    newApplicant.save()
        .then(applicant => {
            res.status(200).json(applicant);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});




// Login for both guys
router.post("/login", (req, res) => {
	const email = req.body.email;
    // Find user by email
    let findflag=0;
    Applicant.findOne({ email })
        .then(applicant => {
		    // Check if user email exists
            if (applicant) 
            {
                res.send(" APPlicant Email Found");
                findflag=1;
                return applicant;
            }
        else{
            return 0;}
				
    })
        .catch( ( ) => {findflag = 0} );
    //checking for recruiter if applicant not found
    if(!findflag) 
    {
        Rec.findOne({ email }).then(rec => 
        {
            // Check if user email exists
            if (!rec) {
                return res.status(404).json({
                    error: "incorrect details",
                });
            }
            else{
                res.send(" REC Email Found");
                return rec;
                
            }
        })
        .catch(() => {findflag=-1});

    }
    
});



module.exports = router;

