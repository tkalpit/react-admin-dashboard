import "./Table.scss";
const Table = ({
  columns,
  data,
  isDataLoading,
  handleEditProduct,
  handleDeleteProduct,
}) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(columns).map((col, key) => {
            return <th key={key}>{col}</th>;
          })}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 && !isDataLoading ? (
          data.map((product, key) => (
            <tr key={product.id}>
              <td>{key + 1}</td>
              <td>
                <div className="title-img">
                  <img alt="Product img" src={product.thumbnail} />
                  {product.title}
                </div>
              </td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td className="product-actions">
                <span
                  className="edit-product"
                  onClick={(e) => handleEditProduct(product)}
                >
                  Edit
                </span>
                <span
                  className="edit-product"
                  onClick={(e) => handleDeleteProduct(product)}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))
        ) : !isDataLoading ? (
          <tr>
            <td className="no-product" colSpan="6">
              Data Not Available
            </td>
          </tr>
        ) : (
          <tr>
            <td className="no-product" colSpan="6">
              Loading...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default Table;
