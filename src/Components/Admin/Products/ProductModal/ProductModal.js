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
import "./ProductModal.scss";
const ProductModal = ({
  isOpen,
  handleClose,
  handleSubmitProduct,
  categories,
  data,
  action = "ADD",
}) => {
  const [selectedCat, setSelectedCat] = useState(data?.category || "");
  const [title, setTitle] = useState(data?.title || "");
  const [price, setPrice] = useState(data?.price || "");
  const [description, setDescription] = useState(data?.description || "");
  const [rating, setRating] = useState(data?.rating || "");
  const [brandName, setBrandName] = useState(data?.brand || "");
  const modalHeading = action === "UPDATE" ? "Update Product" : "Add Product";

  const handleChange = (event) => {
    setSelectedCat(event.target.value);
  };
  const handleProductAction = () => {
    const productInfo = {
      title: title,
      price: price,
      category: selectedCat,
      description: description,
      brand: brandName,
      rating: rating,
    };
    handleSubmitProduct(productInfo, action, data?.id);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{modalHeading}</DialogTitle>
      <DialogContent className="modal-body-content">
        <TextField
          className="mg-b-24"
          required
          fullWidth
          id="outlined-required"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className="mg-b-24"
          fullWidth
          id="outlined-required"
          label="Price"
          value={price}
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
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <TextField
          className="mg-b-24"
          fullWidth
          id="outlined-required"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-required"
          label="Brand"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleProductAction}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ProductModal;
