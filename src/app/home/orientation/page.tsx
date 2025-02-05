"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import { ResearchListDataTable } from "@/features/orientation/components/research-list-data-table";
import NewResearchFormDrawer from "@/features/orientation/components/new-research-form-drawer";

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div>
        <div className="flex justify-end mx-2 my-4">
          <Button onClick={() => setIsDrawerOpen(true)}>
            Nouvelle recherche
          </Button>
        </div>

        <ResearchListDataTable />
      </div>
      <NewResearchFormDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
