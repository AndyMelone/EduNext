import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const fake_datas = [
  {
    id: 1,
    Date: "2021-09-01",
    Serie_Bac: "C",
    point_bac: "252",
    Secteur_Desire: "Informatique",
    domaine_predit: "Informatique",
  },
];

export const ResearchListDataTable = () => {
  return (
    <Table className="rounded-md border ">
      <TableHeader className="border rounded">
        <TableRow>
          <TableHead className="w-[100px]">DATE</TableHead>
          <TableHead>SECTEUR FAVORI</TableHead>
          <TableHead>SERIE BAC</TableHead>
          <TableHead>POINT (BAC)</TableHead>
          <TableHead className="">DOMAINE PREDIT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fake_datas.map((fake_data) => (
          <TableRow key={fake_data.id}>
            <TableCell className="font-medium">{fake_data.Date}</TableCell>
            <TableCell>{fake_data.Secteur_Desire}</TableCell>
            <TableCell>{fake_data.Serie_Bac}</TableCell>
            <TableCell>{fake_data.point_bac}</TableCell>
            <TableCell className="text-right">
              {fake_data.domaine_predit}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
