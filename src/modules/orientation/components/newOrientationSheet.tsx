import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetCreateNew({ open }: { open: string | React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={() => {}}>{open}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nouvelle recherche</SheetTitle>
          <SheetDescription>
            Effectuez une nouvelle recherche en remplissant les champs
            ci-dessous
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
