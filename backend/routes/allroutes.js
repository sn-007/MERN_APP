var express = require("express");
var router = express.Router();

// Load User model
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
router.post("/rec/register", function(req,res) {recregister(req,res);} );
async function recregister(req, res) 
{
    const newRec = new Rec({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        bio:req.body.bio,
        //rating:'0'
    });


    var rec = await Rec.findOne({email: req.body.email})
        
            // Check if user email exists
            if (rec)  return res.status(200).json({error: "Already there bro"});
            
   // var newrec = await newRec.save();
      //  if(!newrec) return res.status(200).json({error: "Already there bro"});
        newRec.save().then((arg)=>{console.log(arg);})
                    .catch((err)=>{return res.status(200).json({error:err});})

    const newLogin = new Login({    
        email: req.body.email,
        password: req.body.password,
        usertype:0
        
    });

    var newlogin = await newLogin.save();
    if(!newlogin) return res.status(404).json({error: "Already there bro"});

    if(newlogin)
        return res.status(200).json("DONE CREATED A NEW REC")



};

//Add an Applicant to db
router.post("/applicant/register", (req, res) => {
    const newApplicant = new Applicant({
        name: req.body.name,
        email: req.body.email,
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
                return res.status(200).json({
                    error: "already existing bruh"
                });
            }
        });

    newApplicant.save()
        .then(applicant => {
            //res.status(200).json(applicant);
        })
        .catch(err => {
            res.status(200).json({"error":"PLease check fields"});
            return 0;
        });

    const newLogin = new Login({    
        email: req.body.email,
        password: req.body.password,
        usertype:1
    });

    newLogin.save()
        .then(login => {
            return res.status(200).json(login);
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
                return res.status(200).json({error: "Invalid Email or Wrong Password"});
            }
            else{
                res.status(200).json(login);
                console.log(login);
                
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
    let name =req.body.name;
    let skillset=req.body.skillset;
    let education=req.body.education;
    let password=req.body.password;

    let myquery={email:gmail};
    let newvalues1= { password:password};
    let newvalues2= { name:name};
    let newvalues3= { skillset:skillset};
    let newvalues4= { education:education};
    
    
        if(password) Applicant.updateOne(myquery,newvalues1).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        if(name) Applicant.updateOne(myquery,newvalues2).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        if(skillset) Applicant.updateOne(myquery,newvalues3).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        if(education) Applicant.updateOne(myquery,newvalues4).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        
        
        
        
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
    let title=req.body.title, sop=req.body.sop, email=req.body.email;//email of applicant
    let myquery={email:email}, newvalues={$push: { jobsapplied: { title:title}}};
    
    //adding into applicants
    Applicant.updateOne(myquery,newvalues).then(x=>{console.log(x);})
                                            .catch(err => { res.status(400).send(err);return 0;});

    //Applicant.updateOne(myquery,newvalues);
    //adding into jobs
    myquery={title:title}, newvalues={$push: { applicants:{ email:email,sop:sop}}};
    Job.updateOne(myquery,newvalues).then(x=>{res.status(200).json("DONE");console.log(x);})
                                    .catch(err => { res.status(400).send(err);return 0;});

    //Job.updateOne(myquery,newvalues);

    
});

//filters
router.post("/appfilters", function(req, res) {
    let sort=req.body.sort,uppper=req.body.upper,lower=req.body.lower,jobType=req.body.jobType;
    let title=req.body.title;
    if(!title) title="";
    if(!jobType || jobType==="x") jobType="";
   if(!uppper) uppper=999999999900;
    if(!lower) lower=0;



    if(sort==="1"){
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
            var obj={"title":"","status":"","date_of_Application":"","salary":"","rec_name":""}
            let title =jobs[i].title;
            var job = await Job.findOne({title:title})
            if(job)
            {
                obj.title=title;obj.status=jobs[i].status;obj.date_of_Application=jobs[i].date_of_Application;
                obj.salary=job.salary;obj.rec_name=job.rec_name
                ans.push(obj);
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
    var jobs = await Job.find({rec_email:req.body.rec_email});

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


//delete and update the job listings
router.post("/job/update",function (req, res) {jobupdate(req,res);});
async function jobupdate(req,res)
 {
    if(Number(req.body.delete)==1)
    {
        let temp= await Job.deleteOne( { title: req.body.title } );
        let applicants= await Applicant.find({});
        for(var i=0;i<applicants.length;i++)
        {
            
            for(var j=0;j<applicants[i].jobsapplied.length;j++)
            {
                if(applicants[i].jobsapplied[j].title==req.body.title)
                {
                    console.log("vachindi bro");
                    console.log(req.body.title);
                    temp= await Applicant.updateOne({_id: applicants[i]._id}, { $pull: {jobsapplied: {title:req.body.title} } } );
                }
            }
        }
        return res.status(200).json(temp);
    }
    else{


    let title=req.body.title;
    let max_applications=req.body.max_applications;
    let num_positions =req.body.num_positions;
    let deadline=req.body.deadline;

    let myquery={title:title};
    
    let newvalues1= { max_applications:max_applications};
    let newvalues2= { deadline:deadline};
    let newvalues3= { num_positions:num_positions};

        if(max_applications!=""&&max_applications) Job.updateOne(myquery,newvalues1).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        if(deadline!=""&&deadline) Job.updateOne(myquery,newvalues2).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        if(num_positions!=""&&num_positions) Job.updateOne(myquery,newvalues3).then((x)=>{console.log(x);}).catch((err)=>{res.status(404).json(err);})
        
        res.status(200).json("DONE");}
        
};

//find all the applicants to a job
router.post("/findallapplications", function (req,res){findallapplications(req,res);});
async function findallapplications(req,res)
{
    let title=req.body.title;
    let applicants= await Applicant.find({});
    var ans=[]
    for(var i=0;i<applicants.length;i++)
    {
        
        for(var j=0;j<applicants[i].jobsapplied.length;j++)
        {
            if(applicants[i].jobsapplied[j].title===req.body.title)
            {
                console.log("vachindi bro");
                console.log(req.body.title);
                var temp={"name":"",
                          "email":"",
                          "skillset":"",
                          "education":"",
                          "sop":"",
                          "status":"",
                          "date_of_application":""
                        };
                        temp.name=applicants[i].name;
                        temp.email=applicants[i].email;
                        temp.skillset=applicants[i].skillset;
                        temp.education=applicants[i].education;
                        temp.status=applicants[i].jobsapplied[j].status;
                        temp.date_of_application=applicants[i].jobsapplied[j].date_of_application;

                let job= await Job.findOne({title:title});
                for(var t=0;t<job.applicants.length;t++)
                {
                    if(job.applicants[t].email===applicants[i].email)
                    {
                        temp.sop=job.applicants[t].sop;
                    }
                }

            }
        }
        if(temp.sop) ans.push(temp);
        temp={};
    }
    console.log("_______");
    return res.status(200).json(ans);
}
//shortlistacceptreject
router.post("/shortlistacceptreject", function (req,res){shortlistacceptreject(req,res);});
async function shortlistacceptreject(req,res)
{
    let app_email=req.body.app_email,title=req.body.title,rec_email=req.body.rec_email,jobType="x";
    var job= await Job.findOne({title:req.body.title})
    const doj=Date.now;
    jobType=job.jobType;
    if(req.body.select)
    {
        let applicant= await Applicant.findOne({"email": app_email});

    
        
        for(var j=0;j<applicant.jobsapplied.length;j++)
        {
            if(applicant.jobsapplied[j].title===title)
            {
                console.log("vachindi bro");
                console.log(req.body.title);
                var temp1= await Rec.updateOne({email:rec_email},{ $push: {workers: {title:title,
                                                                                     name:applicant.name,
                                                                                     jobType:jobType

                                                                                    } } } );
                var temp2= await Applicant.updateOne({email:applicant.email,"jobsapplied.title":title},{ $set:{"jobsapplied.$.status":req.body.select}})
            }
        }

        res.json("okay");
    }
}

//retrieveapplicant details

router.post("/applicantprofile", function(req, res) {
    Applicant.findOne({email:req.body.email}, function(err, applicants) {
		if (err) {
			console.log(err);
		} else {
            res.json(applicants);
		}
	})
});








module.exports = router;

