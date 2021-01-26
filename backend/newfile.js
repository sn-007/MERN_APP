const { response } = require("express");

<form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title </label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangetitle}
            />
          </div>
          
          <div className="form-group">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary"
            />
          </div>
        </form>

async function onSubmit(){
    const obj = {"title":this.state.title};

    response=  await axios.post('http://localhost:4000/job',obj);
           
              //console.log(response);
                alert("came");
               this.setState({users: response.data});
           
           
           
  }