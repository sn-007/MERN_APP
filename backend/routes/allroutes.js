var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Rec = require("../models/recruiter");
const Applicant = require("../models/applicant");
const Login = require("../models/logins");
const Job=require("../models/jobs");


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
            //res.status(200).json(rec);
        })
        .catch(err => {
            res.status(400).send(err);
            return 0;
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
            //res.status(200).json(applicant);
        })
        .catch(err => {
            res.status(400).send(err);
            return 0;
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
            res.status(200).json(job.title);
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

//joblisting dashboard
router.post("/listjobs", function(req, res) {
    Job.find(function(err, jobs) {
		if (err) {
			console.log(err);
		} else {
			res.json(jobs);
		}
	})
});

//applying to a job
router.post("/apply/newjob", function(req, res) {
    let jobtitle=req.body.title, sop=req.body.sop, email=req.body.email;//email of applicant
    let myquery={email:email}, newvalues={$push: { jobsapplied: { title:jobtitle}}};
    
    //adding into applicants
    Applicant.updateOne(myquery,newvalues).then(x=>{console.log(x);})
                                            .catch(err => { res.status(400).send(err);return 0;});

    //Applicant.updateOne(myquery,newvalues);
    //adding into jobs
    myquery={title:jobtitle}, newvalues={$push: { applicants:{ email:email,sop:sop}}};
    Job.updateOne(myquery,newvalues).then(x=>{res.status(200).json("DONE");console.log(x);})
                                    .catch(err => { res.status(400).send(err);return 0;});

    //Job.updateOne(myquery,newvalues);

    
});

//filters
router.post("/appfilters", function(req, res) {
    let val=req.body.title,sort=req.body.sort,uppper=req.body.upper,lower=req.body.lower;
    //console.log(sort);
    if(!val) val ="" ;
   if(!uppper) uppper=999999999900;
    if(!lower) lower=0;


    if(sort===1){
        Job.find({ "title": {$regex:val},salary: { $gt: lower, $lte: uppper } } ).sort({"salary":-1}).then(function(jobs,err) {
            if (jobs) {
                res.status(200).json(jobs);
                console.log("from sort===1")
            } else {
                res.status(400).json(err);
            }
        })
        .catch(res.status(404))}
    else{
        Job.find({ "title": {$regex:val}, salary: { $gt: lower, $lte: uppper } }).then(function(err,jobs) {
            if (err) {
                res.status(200).json(err);
            } else {
                res.status(400).json(jobs);
            }
        })
        .catch(res.status(404))
    }
    
});

//fuck bro









module.exports = router;

