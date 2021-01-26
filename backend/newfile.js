router.post("/appfilters", function (req, res) {


    console.log(req.body.title);
    job.find({}).sort({ salary: -1 })
        .then(
            function (jobs, err) {
                if (jobs)
                    res.status(200).json(jobs);

                else res.status(400).json(err);
            }


        )
});

