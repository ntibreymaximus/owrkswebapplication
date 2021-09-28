import { Link } from "react-router-dom";
import { Container, Sidebar, Sidenav, Nav, Button } from "rsuite";
import AddModal from "../modal/addModal";
import Dashboard from "./dashboard";
import SupplierTable from "./helpers/Tables/SupplierTable";
import useFetchSupplier from "./Hooks/useFetchSupplier";
export default function Suppliers() {
  const [show, setShow] = useState(false);
  const [supplierData, setSuppplierData] = useState([]);
  const [myloading, setLoading] = useState(true);
  const [myerror, setError] = useState("");
  const FetchSupplier = async () => {
    const { users, loading, error } = await useFetchSupplier();
    setLoading(loading);
    setSuppplierData(users);
    setError(error);
  };
  FetchSupplier();
  const results = (
    <>
      <SupplierTable supplier={supplierData} />
    </>
  );
  return (
    <Container className="container">
      <div className="navbar">
        <Sidebar className="sidenavigation">
          <Sidenav>
            <Sidenav.Header className="sidebarheader">
              <h3 className="sidebarheaderh3">Welcome to</h3>
              <h1 className="sidebarheaderh1">OWRKS</h1>
            </Sidenav.Header>
            <Sidenav.Body className="sidenavigationbody">
              <Nav>
                <Link to="/dashboard" className="navlink">
                  <Nav.Item className="navitem ">Dashboard</Nav.Item>
                </Link>
                <Link to="/users" className="navlink">
                  <Nav.Item className="navitem">Users</Nav.Item>
                </Link>
                <Link to="/products" className="navlink">
                  <Nav.Item className="navitem">Products</Nav.Item>
                </Link>
                <Link to="/suppliers" className="navlink">
                  <Nav.Item className="navitem navitemactive">
                    Suppliers
                  </Nav.Item>
                </Link>
                <Link to="/transactions" className="navlink">
                  <Nav.Item className="navitem">Transactions</Nav.Item>
                </Link>
                <Link to="/">
                  <Button className="logoutbutton">Logout</Button>
                </Link>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </Sidebar>
      </div>
      <div className="navcontent">
        <div class="container-fluid searchoptions">
          <form class="d-flex">
            <input
              className="form-control searchforminput"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button className="searchbutton">Search</Button>
            <Button className="addbutton" onClick={() => setShow(true)}>
              Add Supplier
            </Button>
            <AddModal
              title="Add Supplier"
              onClose={() => setShow(false)}
              show={show}
              onSubmit={<Dashboard />}
              button="Add Supplier"
            ></AddModal>
            <Button className="deletebutton">Delete Supplier</Button>
          </form>
        </div>
        <div>{!myloading ? results : "Loading ..."}</div>
      </div>
    </Container>
  );
}
