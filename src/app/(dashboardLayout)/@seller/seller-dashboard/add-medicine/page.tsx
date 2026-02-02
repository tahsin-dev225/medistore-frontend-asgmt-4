"use client";
import { CLIENT_BACKEND_URL } from "@/components/layout/home-category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getCookie } from "@/actions/cookie.action";
import { MedicineParams } from "@/actions/medicine.action";
import { medicineService } from "@/components/service/medicine.service";

type Category = {
  id: string;
  name: string;
  image: string;
  createdAt: string;
};

export default function AddMedicineForm() {
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm({
    defaultValues: {
      title: "",
      categoryId: "",
      image: "",
      stock: 0,
      price: 0,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("creatind medicine...");
      try {
        await medicineService.addMedicine(value);
        form.reset();
        return toast.success("Medicine addd successfully", { id: toastId });
      } catch (err) {
        return toast.error(
          "Someting went wrong, Error in add medicine catch.",
          {
            id: toastId,
          },
        );
      }
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${CLIENT_BACKEND_URL}/api/category`);
        const data = await res.json();
        setCategories(data as Category[]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5 max-w-lg md:min-w-xl mx-auto bg-white p-6 rounded-xl border"
    >
      {/* TITLE */}
      <form.Field name="title">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Medicine Title</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <p className="text-sm text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* CATEGORY */}
      <form.Field name="categoryId">
        {(field) => (
          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={field.state.value}
              onValueChange={(value) => field.handleChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {field.state.meta.errors ? (
              <p className="text-sm text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      {/* IMAGE */}
      <form.Field name="image">
        {(field) => (
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* STOCK */}
      <form.Field name="stock">
        {(field) => (
          <div className="space-y-2">
            <Label>Stock</Label>
            <Input
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
          </div>
        )}
      </form.Field>

      {/* PRICE */}
      <form.Field name="price">
        {(field) => (
          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
          </div>
        )}
      </form.Field>

      {/* SUBMIT */}
      <Button type="submit" className="w-full bg-green-700">
        Add Medicine
      </Button>
    </form>
  );
}
