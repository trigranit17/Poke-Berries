"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { postProduct, ProductPayload } from "@/store/slices/productsSlice";
import { useAppDispatch } from "@/store";
import { RootState } from "@/store";

export default function AddPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit") ?? "";
  const dispatch = useAppDispatch();
  const { loading } = useSelector((s: RootState) => s.products);

  const [payload, setPayload] = useState<ProductPayload>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  });

  useEffect(() => {
    if (edit) {
      setPayload((p) => ({ ...p, title: `Edit: ${edit}` }));
    }
  }, [edit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await dispatch(postProduct(payload)).unwrap();
      alert("Product posted (fake API). Redirecting to list.");
      router.push("/");
    } catch (err) {
      alert("Failed to post product");
      console.error(err);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add / Edit Product</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-3"
      >
        <div>
          <label className="block text-sm">Title</label>
          <input
            required
            value={payload.title}
            onChange={(e) => setPayload({ ...payload, title: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Price</label>
            <input
              required
              type="number"
              step="0.01"
              value={payload.price}
              onChange={(e) =>
                setPayload({ ...payload, price: Number(e.target.value) })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Category</label>
            <input
              required
              value={payload.category}
              onChange={(e) =>
                setPayload({ ...payload, category: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm">Image URL</label>
          <input
            value={payload.image}
            onChange={(e) => setPayload({ ...payload, image: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Description</label>
          <textarea
            required
            value={payload.description}
            onChange={(e) =>
              setPayload({ ...payload, description: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-3 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-3 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
