import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";

export interface ReviewParams {
  content: string;
  medicineId: string;
  customerId: string;
}

export const reviewService = {
  addReview: async (params: ReviewParams) => {
    try {
      const res = await fetch(`${CLIENT_BACKEND_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(params),
      });

      const review = await res.json();

      return review;
    } catch (err) {
      console.error(err);
      return {
        data: null,
        error: { message: "Something went wrong while adding review" },
      };
    }
  },
};
