"use client";

import { Suspense } from "react";
import AddPageContent from "./AddPageContent";

export default function AddPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <AddPageContent />
    </Suspense>
  );
}
