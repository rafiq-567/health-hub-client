import { Link } from 'react-router';

const CategoryCard = ({ category }) => {
  const { categoryName, imageURL, medicineCount } = category  || {};
    

  return (
    <Link to={`/categories/${categoryName}`}>
      <div className="rounded shadow p-4 hover:shadow-lg transition bg-white">
        <img src={imageURL} alt={name} className="w-full h-30 object-cover rounded" />
        <h3 className="text-lg font-semibold mt-2">{categoryName}</h3>
       
        <p className="text-sm text-gray-600">{medicineCount} Medicines</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
