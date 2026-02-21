export const getAllProducts = (req, res) => {
  res.json([
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
  ]);
};

export const getSingleProduct = (req, res) => {
  const { id } = req.params;
  res.json({ id, name: `Product ${id}` });
};

