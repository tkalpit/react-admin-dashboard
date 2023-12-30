const Table = ({ columns, data, isDataLoading }) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(columns).map((col, key) => {
            return <th key={key}>{col}</th>;
          })}
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
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
            </tr>
          ))
        ) : !isDataLoading ? (
          <tr>
            <td className="no-product" colSpan="5">
              Data Not Available
            </td>
          </tr>
        ) : (
          <tr>
            <td className="no-product" colSpan="5">
              Loading...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default Table;
