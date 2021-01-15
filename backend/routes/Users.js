var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Rec = require("../models/recruiter");
const Applicant = require("../models/applicant");
const Login = require("../models/logins");
const Job=require("../models/jobs");
const applicant = require("../models/applicant");

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

    const newLogin = new Login({    
        email: req.body.email,
        password: req.body.password,
        usertype:0
        
    });

    newLogin.save()
        .then(login => {
            res.status(200).json(login);
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

    const newLogin = new Login({    
        email: req.body.email,
        password: req.body.password,
        usertype:1
    });

    newLogin.save()
        .then(login => {
            res.status(200).json(login);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

//newlogin with password
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
        Login.findOne({email: email, password: password}).then(login => 
        {
            // Check if user email exists
            if (!login) {
                return res.status(404).json({
                    error: "Invalid Email or Wrong Password",
                });
            }
            else{
                res.send("Login sucess");
                return rec;
                
            }
        });
    
});


//newjob creation
router.post("/newjob", (req, res) => {
    const newJob = new Job({
        title: req.body.title,
        rec_name: req.body.rec_name,
        rec_email: req.body.rec_email,
        max_applications: req.body.max_applications,
        num_positions :req.body.num_positions,
        /*date_of_posting : {
            type: Date,
            required: false,
            default: Date.now
        },*/
        deadline : req.body.deadline,
        skillset : req.body.skillset,
        jobType: req.body.jobType,
        duration: req.body.duration,
        salary: req.body.salary
        });

    newJob.save()
        .then(job => {
            res.status(200).json(job);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

//update profile for an applicant
router.post("/applicant/update", (req, res) => {
    let gmail=req.body.email;

    let myquery={email:gmail};
    let newvalues={$push: { skillset: req.body.skillset}};
        Applicant.updateOne(myquery,newvalues,function(){
            res.status(200).json("DONE")

        });

});






module.exports = router;

