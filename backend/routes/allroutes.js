var express = require("express");
var router = express.Router();

// Load User model
const Rec = require("../models/recruiter");
const Applicant = require("../models/applicant");
const Login = require("../models/logins");
const Job = require("../models/jobs");



// Getting all the recs
router.get("/recs", function (req, res) {
    Rec.find(function (err, recs) {
        if (err) {
            console.log(err);
        } else {
            res.json(recs);
        }
    })
});

//Getting all the applicants
router.get("/applicants", function (req, res) {
    Applicant.find(function (err, applicants) {
        if (err) {
            console.log(err);
        } else {
            res.json(applicants);
        }
    })
});

// Add a recruiter to db done
router.post("/rec/register", function (req, res) { recregister(req, res); });
async function recregister(req, res) {
    const newRec = new Rec({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        bio: req.body.bio,
        //rating:'0'
    });


    var rec = await Rec.findOne({ email: req.body.email })

    // Check if user email exists
    if (rec) return res.status(200).json({ error: "Already there bro" });

    // var newrec = await newRec.save();
    //  if(!newrec) return res.status(200).json({error: "Already there bro"});
    newRec.save().then((arg) => { console.log(arg); })
        .catch((err) => { return res.status(200).json({ error: err }); })

    const newLogin = new Login({
        email: req.body.email,
        password: req.body.password,
        usertype: 0

    });

    var newlogin = await newLogin.save();
    if (!newlogin) return res.status(404).json({ error: "Already there bro" });

    if (newlogin)
        return res.status(200).json("DONE CREATED A NEW REC")



};

//Add an Applicant to db done
router.post("/applicant/register", function (req, res) { appregister(req, res) });
async function appregister(req, res) {
    console.log(req.body);

    const newApplicant = new Applicant({
        name: req.body.name,
        email: req.body.email,
        education: req.body.education,
        skillset: req.body.skillset,
        rating: '0',
        password: req.body.password
    });


    var applicant = await Applicant.findOne({ email: req.body.email })
    // Check if user email exists
    if (applicant) {
        return res.status(200).json({
            error: "already existing bruh"
        });
    }

    if (!applicant) {
        var s1 = await newApplicant.save();
        if (s1.error) { return res.json({ "error": "unknown error" }) }


        const newLogin = new Login({
            email: req.body.email,
            password: req.body.password,
            usertype: 1
        });

        var s2 = newLogin.save();
        if (!s2.error)
            return res.status(200).json(s2);
        else
            return res.status(200).json(s2.error);

    }
};

//login with password done
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Login.findOne({ email: email, password: password }).then(login => {
        // Check if user email exists
        if (!login) {
            return res.status(200).json({ error: "Invalid Email or Wrong Password" });
        }
        else {
            res.status(200).json(login);
            console.log(login);

        }
    });

});


//newjob creation done
router.post("/newjob", (req, res) => {
    const newJob = new Job({
        title: req.body.title,
        rec_name: req.body.rec_name,
        rec_email: req.body.rec_email,
        max_applications: req.body.max_applications,
        num_positions: req.body.num_positions,
        /*date_of_posting : {
            type: Date,
            required: false,
            default: Date.now
        },*/
        deadline: req.body.deadline,
        skillset: req.body.skillset,
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

//update profile for an applicant done
router.post("/applicant/update", (req, res) => {
    let gmail = req.body.email;
    let name = req.body.name;
    let skillset = req.body.skillset;
    let education = req.body.education;
    let password = req.body.password;

    let myquery = { email: gmail };
    let newvalues1 = { password: password };
    let newvalues2 = { name: name };
    let newvalues3 = { skillset: skillset };
    let newvalues4 = { education: education };


    if (password) Applicant.updateOne(myquery, newvalues1).then((x) => { console.log(x); }).catch((err) => { res.status(404).json(err); })
    if (name) Applicant.updateOne(myquery, newvalues2).then((x) => { console.log(x); }).catch((err) => { res.status(404).json(err); })
    if (skillset) Applicant.updateOne(myquery, newvalues3).then((x) => { console.log(x); }).catch((err) => { res.status(404).json(err); })
    if (education) Applicant.updateOne(myquery, newvalues4).then((x) => { console.log(x); }).catch((err) => { res.status(404).json(err); })




    res.status(200).json("DONE");

});


//get all jobs dont change
router.post("/listjobs", function (req, res) {
    Job.find(function (err, jobs) {
        if (err) {
            console.log(err);
        } else {
            res.json(jobs);
        }
    })
});

//applying to a job
router.post("/apply/newjob", function (req, res) {
    let title = req.body.title, sop = req.body.sop, email = req.body.email;//email of applicant
    let myquery = { email: email }, newvalues = { $push: { jobsapplied: { title: title } } };

    //adding into applicants
    Applicant.updateOne(myquery, newvalues).then(x => { console.log(x); })
        .catch(err => { res.status(400).send(err); return 0; });

    //Applicant.updateOne(myquery,newvalues);
    //adding into jobs
    myquery = { title: title }, newvalues = { $push: { applicants: { email: email, sop: sop } } };
    Job.updateOne(myquery, newvalues).then(x => { res.status(200).json("DONE"); console.log(x); })
        .catch(err => { res.status(400).send(err); return 0; });

    //Job.updateOne(myquery,newvalues);


});

//filters done
router.post("/appfilters", function (req, res) { filters(req, res) })
async function filters(req, res) {
    let sort = req.body.sort, uppper = req.body.upper, lower = req.body.lower, jobType = req.body.jobType,ud=req.body.ud;
    console.log(ud);
    let title = req.body.title;
    if (!title) title = "";
    if(!ud) ud=1000;
    if (!jobType || jobType === "x") jobType = "";
    if (!uppper) uppper = 999999999900;
    if (!lower) lower = 0;
    var ans = [];

    if (sort === "1") {
        var jobs = await Job.find({ $and: [{ title: { $regex: title }, salary: { $gt: lower, $lte: uppper }, jobType: { $regex: jobType }, duration : {$lt: ud} }  ] }).sort({ salary: -1 })
        if (jobs) {
            ans = jobs;

          
        }
    }

    else if (sort === "0") {
        var jobs = await Job.find({ $and: [{ title: { $regex: title }, salary: { $gt: lower, $lte: uppper }, jobType: { $regex: jobType }, duration : {$lt: ud} }] }).sort({ salary: 1 })
        if (jobs) {
            ans = jobs;

          
        }
    }
    else if (sort === "d0") {
        var jobs = await Job.find({ $and: [{ title: { $regex: title }, salary: { $gt: lower, $lte: uppper }, jobType: { $regex: jobType }, duration : {$lt: ud} }] }).sort({ duration: 1 })
        if (jobs) {
            ans = jobs;

          
        }
    }
    else if (sort === "d1") {
        var jobs = await Job.find({ $and: [{ title: { $regex: title }, salary: { $gt: lower, $lte: uppper }, jobType: { $regex: jobType }, duration : {$lt: ud} }] }).sort({ duration: -1 })
        if (jobs) {
            ans = jobs;

          
        }
    }
    var applicant = await Applicant.findOne({ email: req.body.email });
    if (applicant.jobsapplied.length >= 10) ans.push("warning");


    for (var i = 0; i < ans.length; i++) {


        if (applicant) {
            for (var j = 0; j < applicant.jobsapplied.length; j++) {
                if (applicant.jobsapplied[j].title === ans[i].title) {

                    ans[i].found = "1";
                    if (applicant.jobsapplied[j].status === "accepted" ) 
                    {
                         console.log(applicant.jobsapplied[j].title)
                          ans.push("danger");
                    }
                }
                


            }
        }

    };
    //console.log(ans);
    res.status(200).json(ans);
}




//update profile for the Recruiter done
router.post("/rec/update", (req, res) => {
    let gmail = req.body.email;
    let phone = req.body.phone;
    let name = req.body.name;
    let bio = req.body.bio;
    let password = req.body.password;

    let myquery = { email: gmail };
    let newvalues = { phone: phone };
    let newvalues2 = { name: name };
    let newvalues3 = { bio: bio };
    let newvalues4 = { password: password };
    if (phone) Rec.updateOne(myquery, newvalues).then((x) => { console.log(x); }).catch((err) => { res.status(404).json(err); })
    if (name) Rec.updateOne(myquery, newvalues2).then((x) => { console.log(x); }).catch((err) => { res.status(404).json(err); })
    if (bio) Rec.updateOne(myquery, newvalues3).then((x) => { console.log(x); }).catch((err) => { res.status(404).json(err); })
    if (password) Rec.updateOne(myquery, newvalues4).then((x) => { console.log(x); }).catch((err) => { res.status(404).json(err); })

    res.status(200).json("DONE");

});

//My Applications done
router.post("/myapps", function (req, res) { myapps(req, res); });
async function myapps(req, res) {
    var jobs = [], i = -1;
    var ans = [];
    var applicant = await Applicant.findOne({ email: req.body.email });

    if (!applicant) { console.log("fuck"); }
    else if (applicant) {
        for (i = 0; i < applicant.jobsapplied.length; i++) {
            jobs.push(applicant.jobsapplied[i]);
        }
    }
    //console.log("sollu");
    //console.log(jobs);

    for (i = 0; i < jobs.length; i++) {
        // let temp=jobs.length;
        //console.log(temp);
        var obj = { "title": "", "status": "", "date_of_Application": "", "salary": "", "rec_name": "" }
        let title = jobs[i].title;
        var job = await Job.findOne({ title: title })
        if (job) {
            obj.title = title; obj.status = jobs[i].status; obj.date_of_Application = jobs[i].date_of_Application;
            obj.salary = job.salary; obj.rec_name = job.rec_name
            ans.push(obj);
        }
    }
    console.log("____________________")
    if (ans) res.status(200).json(ans);
    else res.status(200).json("error");
}


//all jobs of a recruiter done
router.post("/myjobs", function (req, res) { myjobs(req, res); });
async function myjobs(req, res) {
    var i = -1;
    var ans = [];
    var jobs = await Job.find({ rec_email: req.body.rec_email });

    if (!jobs) { console.log("fuck"); }
    console.log(jobs.length)
    for (i = 0; i < jobs.length; i++) {
        // let temp=jobs.length;
        //console.log(temp);
        /*if(Date > jobs[i].deadline)
        {
            console.log("fuck");
            continue;
        }*/
        var temp = { "title": "", "date_of_posting": "", "number_of_applicants": "", "max_applications": "", "rem_positions": "" };
        temp.title = jobs[i].title;
        temp.date_of_posting = jobs[i].date_of_posting;
        temp.deadline = jobs[i].deadline;
        temp.number_of_applicants = jobs[i].applicants.length;
        temp.max_applications = jobs[i].max_applications;
        temp.rem_positions = jobs[i].max_applications - jobs[i].applicants.length;
        ans.push(temp);


    }
    console.log("____________________")
    if (ans) res.status(200).json(ans);
    else res.status(200).json("error : no jobs found bruh");
}


//delete and update the job listings
router.post("/jobupdate", function (req, res) { jobupdate(req, res); });
async function jobupdate(req, res) {
    if (req.body.delete === "1") {
        let temp = await Job.deleteOne({ title: req.body.title });
        let applicants = await Applicant.find({});
        for (var i = 0; i < applicants.length; i++) {

            for (var j = 0; j < applicants[i].jobsapplied.length; j++) {
                if (applicants[i].jobsapplied[j].title == req.body.title) {
                    console.log("vachindi bro");
                    console.log(req.body.title);
                    temp = await Applicant.updateOne({ _id: applicants[i]._id }, { $pull: { jobsapplied: { title: req.body.title } } });
                }
            }
        }
        console.log("deleted");
        return res.status(200).json(temp);
    }
    else {


        let title = req.body.title;
        let max_applications = req.body.max_applications;
        let num_positions = req.body.num_positions;
        let deadline = req.body.deadline;

        let myquery = { title: title };

        let newvalues1 = { max_applications: max_applications };
        let newvalues2 = { deadline: deadline };
        let newvalues3 = { num_positions: num_positions };

        if (max_applications != "" && max_applications) Job.updateOne(myquery, newvalues1).then((x) => { console.log(x); }).catch((err) => { res.status(404).json(err); })
        if (deadline != "" && deadline) Job.updateOne(myquery, newvalues2).then((x) => { console.log(x); }).catch((err) => { res.status(404).json(err); })
        if (num_positions != "" && num_positions) Job.updateOne(myquery, newvalues3).then((x) => { console.log(x); }).catch((err) => { res.status(404).json(err); })

        res.status(200).json("DONE");
    }

};


//shortlistacceptreject
router.post("/shortlistacceptreject", function (req, res) { shortlistacceptreject(req, res); });
async function shortlistacceptreject(req, res) {
    let app_email = req.body.app_email, title = req.body.title, rec_email = req.body.rec_email, jobType = "x";
    console.log(req.body);

    var job = await Job.findOne({ title: req.body.title })
    jobType = job.jobType;
    if (req.body.select) {
        let applicant = await Applicant.findOne({ "email": app_email });



        for (var j = 0; j < applicant.jobsapplied.length; j++) {
            console.log("came");


            if (applicant.jobsapplied[j].title != title && req.body.select == "accepted" ) 
            {
                var temp3 = await Applicant.updateOne({ email: applicant.email, "jobsapplied.title": applicant.jobsapplied[j].title }, { $set: { "jobsapplied.$.status": "rejected" } });
                console.log("SKHKHSKSNKLHDKJHDKJSHKJHDJHSLDHJKLS");

            }
            


            if (applicant.jobsapplied[j].title === title) {
                
                
                if (req.body.select == "accepted") {
                    console.log("vachindi bro");
                    console.log(req.body.title);
                
                    
                    var temp1 = await Rec.updateOne({ email: rec_email }, {
                        $push: {
                            workers: {
                                title: title,
                                name: applicant.name,
                                jobType: jobType,
                                email: app_email

                            }
                        }
                    });

                }

                var temp2 = await Applicant.updateOne({ email: applicant.email, "jobsapplied.title": title }, { $set: { "jobsapplied.$.status": req.body.select } })



            }
        }

        res.json("okay");
    }
}

//retrieveapplicant details done

router.post("/applicantprofile", function (req, res) {
    Applicant.findOne({ email: req.body.email }, function (err, applicants) {
        if (err) {
            console.log(err);
        } else {
            res.json(applicants);
        }
    })
});

//retrieverec details done
router.post("/recprofile", function (req, res) {
    Rec.findOne({ email: req.body.email }, function (err, rec) {
        if (err) {
            console.log(err);
        } else {
            res.json(rec);
        }
    })
});

router.post("/findallapplications", function (req, res) { findallapplications(req, res); });
async function findallapplications(req, res) {
    let title = req.body.title;
    let applicants = await Applicant.find({});
    var ans = []
    for (var i = 0; i < applicants.length; i++) {

        for (var j = 0; j < applicants[i].jobsapplied.length; j++) {
            if (applicants[i].jobsapplied[j].status === "rejected") continue;
            if (applicants[i].jobsapplied[j].title === req.body.title) {
                console.log("vachindi bro");
                console.log(req.body.title);
                var temp = {
                    "name": "",
                    "email": "",
                    "skillset": "",
                    "education": "",
                    "sop": "",
                    "status": "",
                    "date_of_application": ""
                };
                temp.name = applicants[i].name;
                temp.email = applicants[i].email;
                temp.skillset = applicants[i].skillset;
                temp.education = applicants[i].education;
                temp.status = applicants[i].jobsapplied[j].status;
                temp.date_of_application = applicants[i].jobsapplied[j].date_of_application;

                let job = await Job.findOne({ title: title });
                for (var t = 0; t < job.applicants.length; t++) {
                    if (job.applicants[t].email === applicants[i].email) {
                        temp.sop = job.applicants[t].sop;
                    }
                }

            }
        }
        if (temp) ans.push(temp);
        temp = {
            "name": "",
            "email": "",
            "skillset": "",
            "education": "",
            "sop": "",
            "status": "",
            "date_of_application": ""
        };
    }
    console.log("_______");
    return res.status(200).json(ans);
}

router.post("/workers", function (req, res) { workers(req, res); });

async function workers(req, res) {
    var rec=await Rec.findOne({"email":req.body.email});
    console.log(rec.workers);
    return res.status(200).json(rec.workers);

}




module.exports = router;