"use client";

import MedicineCard from "@/components/modules/homePage/medicineCard";
import { getMedicineService } from "@/components/service/get-medicine.service";
import { useEffect, useState } from "react";

// Type definition (User provide kora)
type Medicine = {
  id: string;
  title: string;
  image: string;
  stock: number;
  price: number;
  _count: {
    review: number;
  };
};

// API response-er full JSON structure
interface MedicineResponse {
  data: Medicine[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
}

export default function MedicineListPage() {
  // Mocking the provided data structure
  const [apiResponse, setApiResponse] = useState<MedicineResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  // Note: Bastobe apni useEffect diye API theke data fetch korben queries pathiye
  // Example: fetch(`/api/medicine?page=${currentPage}`)

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const medicine = await getMedicineService.getMedicine();
        console.log(medicine);
        setMedicines(medicine?.data);
        setApiResponse(medicine);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicine();
  }, []);

  const { totalPage = 1 } = apiResponse?.pagination || {};

  return (
    <div className=" lg:max-w-[1000px] xl:max-w-[1280px]  mx-auto px-4 py-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl mx-auto w-max font-bold mb-8 text-gray-800 text-center ">
        All Medicines
      </h1>

      {/* Responsive Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 id-cols-4 gap-6">
        {medicines?.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>

      {/* Pagination UI */}
      {totalPage > 1 && (
        <div className="flex justify-center items-center mt-12 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {[...Array(totalPage)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-md border ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                } transition-colors`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPage}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* No Data State */}
      {medicines.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No medicines found.</p>
        </div>
      )}
    </div>
  );
}
