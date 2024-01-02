import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import "./AddProduct.scss";
const AddProduct = ({
  isOpen,
  handleClose,
  handleSubmitProduct,
  categories,
}) => {
  const [selectedCat, setSelectedCat] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [brandName, setBrandName] = useState("");

  const handleChange = (event) => {
    setSelectedCat(event.target.value);
  };
  const handleAddProduct = () => {
    const productInfo = {
      title: title,
      price: price,
      category: selectedCat,
      description: description,
      brand: brandName,
      rating: rating,
    };
    handleSubmitProduct(productInfo);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent className="modal-body-content">
        <TextField
          className="mg-b-24"
          required
          fullWidth
          id="outlined-required"
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className="mg-b-24"
          fullWidth
          id="outlined-required"
          label="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          className="mg-b-24"
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCat}
          label="Category"
          placeholder="Select Category"
          onChange={handleChange}
        >
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <MenuItem value={category} key={category}>
                  {category}
                </MenuItem>
              );
            })}
        </Select>
        <TextField
          className="mg-b-24"
          fullWidth
          id="outlined-required"
          label="Rating"
          onChange={(e) => setRating(e.target.value)}
        />
        <TextField
          className="mg-b-24"
          fullWidth
          id="outlined-required"
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-required"
          label="Brand"
          onChange={(e) => setBrandName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button variant="outlined" onClick={handleAddProduct}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddProduct;
