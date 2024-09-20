import "./App.css";
import * as React from "react";
import Table from "@mui/material/Table";
import { TableBody } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function App() {
  const [tableData, setTableData] = React.useState([]);
  const [addingProductFom, setAddingProductFom] =React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [category, setCategory] = React.useState<string>("");

  const getTabInfos = () => {
    fetch("http://localHost:3001/product")
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.log(error));
  };

  const addingProduct = async(name: string, price: number, category: string ) => {
    await fetch("http://localHost:3001/product", {
      method: 'POST',
      body: JSON.stringify({
      name: name,
      price: price,
      categoryId: category,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addingProduct(name, price, category);
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Category </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.categoryId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <button onClick={getTabInfos}>get Products from BDD</button>
          <button onClick={() => setAddingProductFom(true)}>
            Add a product
          </button>
          {addingProductFom && (
            <>
              <form onSubmit={handleSubmit}>
              <br />
                <label>
                  Name : <br />
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <br />
                <label>
                  Price : <br />
                  <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                </label>
                <br />
                <label>
                  Category : <br />
                  <input
                    type="text"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </label>
                <br />
                <input type="submit" value="Submit" />
              </form>
            </>
          )}
        </header>
      </div>
    </>
  );
}

export default App;
