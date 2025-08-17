import { useQuery } from "@tanstack/react-query";

const BestSellers = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["best-sellers"],
    queryFn: async () => {
      const res = await fetch("https://server-two-rosy-34.vercel.app/best-sellers");
      return res.json();
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
console.log(products)
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Best Sellers – Trusted by Thousands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md hover:shadow-lg p-4 flex flex-col"
          >
            <img src={product.image} alt={product.title} className="h-40 w-full object-cover rounded" />
            <h3 className="mt-3 text-lg font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-600 dark:text-white">{product.genericName}</p>
            <p className="mt-2 font-bold text-green-700">${product.price?.toFixed(2)}</p>
            {/* <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
              Add to Cart
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
