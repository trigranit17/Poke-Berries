// src/pages/index.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { fetchBerries, removeBerry } from "@/store/slices/berriesSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, loading } = useSelector((s: RootState) => s.berries);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBerries());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const arr = items.filter((d) => d.name.toLowerCase().includes(q));
    arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [items, search]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const paginated = filtered.slice(
    (page - 1) * perPage,
    (page - 1) * perPage + perPage
  );

  useEffect(() => setPage(1), [search, perPage]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Berries</h1>
        <Link href="/add">
          <div className="bg-blue-600 text-white px-3 py-2 rounded">Add</div>
        </Link>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm">Per page:</label>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="border px-2 py-1 rounded"
            >
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="border px-3 py-2 rounded w-full md:w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="px-3 py-2">No</th>
                <th className="px-3 py-2">Name (A→Z)</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-4">
                    Loading...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4">
                    No results
                  </td>
                </tr>
              ) : (
                paginated.map((item, idx) => (
                  <tr key={item.name} className="border-t">
                    <td className="px-3 py-2">
                      {(page - 1) * perPage + idx + 1}
                    </td>
                    <td className="px-3 py-2">
                      <Link href={`/detail/${item.name}`}>
                        <div className="text-blue-600 underline">
                          {item.name}
                        </div>
                      </Link>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <Link
                          href={`/add?edit=${encodeURIComponent(item.name)}`}         
                        >
                          <div className="text-sm px-2 py-1 border rounded">
                            Edit
                          </div>
                        </Link>
                        <button
                          onClick={() => dispatch(removeBerry(item.name))}
                          className="text-sm px-2 py-1 border rounded text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            Showing {paginated.length} of {total} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 border rounded"
              disabled={page === 1}
            >
              Prev
            </button>
            <div className="px-3 py-1">
              {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 border rounded"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
