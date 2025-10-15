"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchBerryDetail } from "@/utils/api";

// 🧩 Definisikan tipe sesuai struktur data dari PokeAPI
interface BerryFlavor {
  flavor: { name: string };
  potency: number;
}

interface BerryDetail {
  name: string;
  growth_time: number;
  size: number;
  max_harvest: number;
  natural_gift_power: number;
  flavors: BerryFlavor[];
  firmness?: { name: string };
}

export default function Detail() {
  const router = useRouter();
  const params = useParams();
  const name = params?.name as string;

  // 🧠 Gunakan tipe BerryDetail, bukan any
  const [data, setData] = useState<BerryDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    fetchBerryDetail(name)
      .then((d: BerryDetail) => setData(d))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [name]);

  if (!name) return <div>Invalid berry</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <button
          onClick={() => router.back()}
          className="px-3 py-1 border rounded"
        >
          Back
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : data ? (
          <div>
            <h2 className="text-2xl font-semibold mb-2 capitalize">
              {data.name}
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Growth Time:</strong> {data.growth_time}
              </li>
              <li>
                <strong>Size:</strong> {data.size}
              </li>
              <li>
                <strong>Max Harvest:</strong> {data.max_harvest}
              </li>
              <li>
                <strong>Natural Gift Power:</strong> {data.natural_gift_power}
              </li>
              <li>
                <strong>Flavors:</strong>
                <ul className="ml-4 list-disc">
                  {data.flavors.map((f) => (
                    <li key={f.flavor.name}>
                      {f.flavor.name}: potency {f.potency}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <strong>Firmness:</strong> {data.firmness?.name ?? "-"}
              </li>
            </ul>
          </div>
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
}
