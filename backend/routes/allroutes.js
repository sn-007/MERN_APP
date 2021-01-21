var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Rec = require("../models/recruiter");
const Applicant = require("../models/applicant");
const Login = require("../models/logins");
const Job=require("../models/jobs");
const { application } = require("express");


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


    Rec.findOne({email: req.body.email}).then(rec => 
        {
            // Check if user email exists
            if (rec) 
            {
                return res.status(404).json({
                    error: "Invalid Email or Wrong Password",
                });
            }
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


    Applicant.findOne({email: req.body.email}).then(applicant => 
        {
            // Check if user email exists
            if (applicant) 
            {
                return res.status(404).json({
                    error: "already existing bruh"
                });
            }
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

//login with password
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
    let lang=req.body.skillset;
    let name =req.body.name;

    let myquery={email:gmail};
    let newvalues={$push: { skillset:lang}};
    let newvalues2= { name:name};
        if(lang) Applicant.updateOne(myquery,newvalues).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        if(name) Applicant.updateOne(myquery,newvalues2).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        
        
        
        
        res.status(200).json("DONE");
        
});
        

//get all jobs
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
    let sort=req.body.sort,uppper=req.body.upper,lower=req.body.lower,jobType=req.body.jobType;
    let title=req.body.title;
    if(!title) title=""
    if(!jobType) jobType="";
   if(!uppper) uppper=999999999900;
    if(!lower) lower=0;


    if(sort===1){
        console.log(req.body.title);
        Job.find( {$and:[ { title: {$regex:title},salary: { $gt: lower, $lte: uppper }, jobType:{$regex:jobType} }]}).sort({salary:-1}).then(function(jobs,err) {
            if (jobs) {
                res.status(200).json(jobs);
                console.log("from sort===1")
            } else {
                res.status(400).json(err);
            }
        })
        .catch(res.status(404))}
    else{
        Job.find({ "title": {$regex:title}, salary: { $gt: lower, $lte: uppper },jobType:{$regex:jobType} }).then(function(err,jobs) {
            if (err) {
                res.status(200).json(err);
            } else {
                res.status(400).json(jobs);
            }
        })
        .catch(res.status(404))
    }
    
});

//update profile for the Recruiter
router.post("/rec/update", (req, res) => {
    let gmail=req.body.email;
    let phone=req.body.phone;
    let name =req.body.name;
    let bio=req.body.bio;

    let myquery={email:gmail};
    let newvalues={phone:phone};
    let newvalues2= { name:name};
    let newvalues3= { bio:bio};
        if(phone) Rec.updateOne(myquery,newvalues).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        if(name) Rec.updateOne(myquery,newvalues2).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        if(bio) Rec.updateOne(myquery,newvalues3).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        
        res.status(200).json("DONE");
        
});

//My Applications
router.post("/myapps", function(req, res) {myapps(req,res);});
async function myapps(req,res){
    var jobs=[],i=-1;
    var ans =[];
    var applicant = await Applicant.findOne({email:req.body.email});

		if (!applicant) {console.log("fuck");}
        else if(applicant) 
        {
            for(i=0;i<applicant.jobsapplied.length;i++)
            {
                jobs.push(applicant.jobsapplied[i]);
            }
        }
        //console.log("sollu");
        //console.log(jobs);

        for(i=0;i<jobs.length;i++)
        {
           // let temp=jobs.length;
            //console.log(temp);
            let title =jobs[i].title;
            var job = await Job.findOne({title:title})
            if(job)
            {
                ans.push(job);
                //console.log(ans);
                //console.log("value of i is " + i);
                /*if(i===jobs.length)
                    {   console.log("if loki vachindi");
                        res.status(200).json(ans);
                        return;
                    }*/
            }
        }
        console.log("____________________")
        if(ans) res.status(200).json(ans);
        else res.status(200).json("error"); }


//all jobs of a recruiter
router.post("/myjobs", function(req, res) {myjobs(req,res);});
async function myjobs(req,res){
    var i=-1;
    var ans =[];
    var jobs = await Job.find({rec_email:req.body.email});

		if (!jobs) {console.log("fuck");}
        console.log(jobs.length)
        for(i=0;i<jobs.length;i++)
        {
           // let temp=jobs.length;
            //console.log(temp);
            /*if(Date > jobs[i].deadline)
            {
                console.log("fuck");
                continue;
            }*/
            var temp={"title":"","date_of_posting":"","number_of_applicants":"","max_applications":""};
            temp.title =jobs[i].title;
            temp.date_of_posting= jobs[i].date_of_posting;
            temp.number_of_applicants=jobs[i].applicants.length;
            temp.max_applications=jobs[i].num_positions;
            ans.push(temp);

           
        }
        console.log("____________________")
        if(ans) res.status(200).json(ans);
        else res.status(200).json("error : no jobs found bruh"); }














module.exports = router;

