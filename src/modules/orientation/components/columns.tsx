"use client";

const StatusCell = ({ isResolved }: { isResolved: boolean }) => {
  return (
    <div>
      {isResolved ? (
        <div className="py-1 border rounded-lg text-center bg-green-200">
          <p> Resolve </p>
        </div>
      ) : (
        <div className="py-1 rounded-lg text-center bg-red-400">
          <p> Unresolve</p>
        </div>
      )}
    </div>
  );
};

export const columns = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: { row: { original: { date: string } } }) => (
      <div>{row.original.date}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }: { row: { original: { name: string } } }) => (
      <div>{row.original.name}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }: { row: { original: { email: string } } }) => (
      <div>{row.original.email}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }: { row: { original: { phone: string } } }) => (
      <div>{row.original.phone}</div>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }: { row: { original: { message: string } } }) => (
      <div>{row.original.message}</div>
    ),
  },
  {
    accessorKey: "isResolved",
    header: "Status",
    cell: ({ row }: { row: { original: { isResolved: boolean } } }) => (
      <StatusCell isResolved={row.original.isResolved ?? false} />
    ),
  },
];
