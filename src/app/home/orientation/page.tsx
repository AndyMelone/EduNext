import { columns } from "@/modules/orientation/components/columns";
import { DataTable } from "@/modules/orientation/components/data-table";
import React from "react";

export default function page() {
  return (
    <div>
      <DataTable columns={columns} data={[]} />
    </div>
  );
}
