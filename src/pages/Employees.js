import React, { Component } from "react";
import _ from "lodash";
import Jumbotron from "../components/Jumbotron";
import { getAllData } from "../list";

class Employees extends Component {
  state = {
    list: getAllData(),
    search: "",
    order: "asc",
  };

  handleSort = () => {
    var sort = this.state.order == "asc" ? "desc" : "asc";
    this.setState({ list: _.orderBy(getAllData(), ["first_name"], [sort]) });
    this.setState({ order: sort });
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ search: value });
  };

  handleSearch = (event) => {
    event.preventDefault();

    var search = this.state.search.toLowerCase();
    var list = _.filter(getAllData(), function (o) {
      if (
        o.first_name.toLowerCase().includes(search) ||
        o.last_name.toLowerCase().includes(search) ||
        o.role.toLowerCase().includes(search) ||
        o.department.toLowerCase().includes(search)
      )
        return o;
    });
    this.setState({ list });
  };

  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>Employees</h1>
        </Jumbotron>
        <br />
        <br />
        {/* Search */}
        <form
          className="form-inline"
          style={{ marginTop: 10 }}
          style={{ marginLeft: "30%" }}
        >
          <div className="form-group mx-sm-4">
            <input
              style={{ width: 250 }}
              onChange={this.handleInputChange}
              name="keyword"
              className="form-control"
              placeholder="Enter the search value"
            ></input>
          </div>
          <button onClick={this.handleSearch} className="btn btn-success mb-2">
            Search
          </button>
        </form>
        <br />
        {/* Search end */}
        {this.state.list.length > 0 ? (
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">
                  First Name{" "}
                  <button
                    onClick={this.handleSort}
                    className="btn btn-dark btn-sm"
                  >
                    Sort
                  </button>
                </th>
                <th scope="col">Last Name</th>
                <th scope="col">Role</th>
                <th scope="col">Department</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list.map((each, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{each.first_name}</td>
                  <td>{each.last_name}</td>
                  <td>{each.role}</td>
                  <td>{each.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No result found</div>
        )}
      </div>
    );
  }
}

export default Employees;

// function Empoyees() {
//   // // Setting our component's initial state
//   // const [employees, setEmpoyees] = useState([]);
//   // const [formObject, setFormObject] = useState({});
//   // const [sorted, setSorted] = useState(false);

//   // Load all Empoyees and store them with setEmpoyees
//   useEffect(() => {
//     loadEmpoyees();
//   }, []);

//   // Loads all employees and sets them to employees
//   function loadEmpoyees() {
//     API.getEmployees()
//       .then(res => setEmpoyees(res.data))
//       .catch(err => console.log(err));
//   }

//   // Deletes a employee from the database with a given id, then reloads employees from the db
//   function deleteEmpoyee(id) {
//     API.deleteEmpoyee(id)
//       .then(res => loadEmpoyees())
//       .catch(err => console.log(err));
//   }

//   // Handles updating component state when the user types into the input field
//   function handleInputChange(event) {
//     const { name, value } = event.target;
//     setFormObject({ ...formObject, [name]: value });
//   }

//   var { id, firstName, lastName, role, department } = formObject;

//   // When the form is submitted, use the API.saveEmployees method to save the employees data
//   // Then reload employees from the database
//   function handleFormSubmit(event) {
//     event.preventDefault();
//     if (formObject.firstName && formObject.lastName) {
//       API.saveEmployees({
//         id: formObject.id,
//         firstName: formObject.firstName,
//         lastName: formObject.lastName,
//         role: formObject.role,
//         department: formObject.department
//       })
//         .then(res => loadEmpoyees())
//         .catch(err => console.log(err));
//     }
//   }

//   function handleSearch(event) {
//     event.preventDefault();
//     API.searchByKeyword({
//       keyword: formObject.keyword
//     })
//       .then(res => setEmpoyees(res.data))
//       .catch(err => console.log(err));
//   }

//   function handleSort(event){
//     event.preventDefault();
//     setSorted(!sorted);
//     setEmpoyees(_.orderBy(employees, ['firstName'],[sorted ? "desc" : "asc"]));
//   }

//   return (
//     <React.Fragment>
//       <Jumbotron>
//         <h1>Employees Management</h1>
//       </Jumbotron>
//       <Container>

// {/* New Employee Form */}
//         <h5 style={{ marginBottom: 20 }}>Enter New Employee</h5>
//         <form style={{ width: 300 }}>
//           <Input onChange={handleInputChange} name="id" placeholder="ID" />
//           <Input
//             onChange={handleInputChange}
//             name="firstName"
//             placeholder="First Name"
//           />
//           <Input
//             onChange={handleInputChange}
//             name="lastName"
//             placeholder="Last Name"
//           />
//           <Input onChange={handleInputChange} name="role" placeholder="Role" />
//           <Input
//             onChange={handleInputChange}
//             name="department"
//             placeholder="Department"
//           />
//           <FormBtn
//             disabled={!(id && firstName && lastName && role && department)}
//             onClick={handleFormSubmit}
//           >
//             Enter Employee
//           </FormBtn>
//         </form>

// {/* Employee Listing Section */}
//         <div className="row" style={{ width: 1500 }}>
//           <div className="col">
//             <h1 style={{ paddingBottom: 40 }}>Employees List</h1>
//           </div>
//           <div className="col">
//             <form className="form-inline" style={{ marginTop: 10 }}>
//               <div className="form-group mx-sm-4">
// {/* Keyword Search */}
//                 <h5 className="m-2">Filter : </h5>
//                 <input
//                   style={{ width: 250 }}
//                   onChange={handleInputChange}
//                   name="keyword"
//                   className="form-control"
//                   placeholder="Enter the keyword"
//                 ></input>
//               </div>
//               <button
//                 disabled={!formObject.keyword}
//                 onClick={handleSearch}
//                 className="btn btn-success mb-2"
//               >
//                 Search
//               </button>
//             </form>
//           </div>
// {/* Fetch All Employee button */}
//           <div className="col">
//             <button
//               onClick={loadEmpoyees}
//               className="btn btn-info mb-2"
//               style={{ marginTop: 10 }}
//             >
//               Show All
//             </button>
//           </div>
//         </div>

// {/* Employee List Table */}
//         {employees.length ? (
//           <table className="table">
//             <thead>
//               <tr>
//                 <th scope="col">ID</th>
//                 <th scope="col">
//                   First
//     {/* Sort by First Name */}
//                   <i onClick={handleSort} className="fa fa-sort ml-2" style={{ cursor: "pointer", color: 'red' }}></i>
//                 </th>
//                 <th scope="col">Last</th>
//                 <th scope="col">Role</th>
//                 <th scope="col">Department</th>
//                 <th scope="col"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map(employee => (
//                 <tr key={employees._id}>
//                   <th scope="row">{employee.id}</th>
//                   <td>{employee.firstName}</td>
//                   <td>{employee.lastName}</td>
//                   <td>{employee.role}</td>
//                   <td>{employee.department}</td>
//   {/* Delete Employee */}
//                   <td>
//                     <DeleteBtn onClick={() => deleteEmpoyee(employee._id)} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <h3>No Results to Display</h3>
//         )}
//       </Container>
//     </React.Fragment>
//   );
// }

// export default Empoyees;
