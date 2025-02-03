"use client";

import { AppSidebar } from "@/components/shared/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { usePathname } from "next/navigation";

const pages: Record<string, string> = {
  home: "Accueil",
  orientation: "Orientation",
  news: "Actualités",
  settings: "Paramètres",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const DynamicBreadcrumb = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    return (
      <div className="w-full flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            {pathSegments.map((segment, index) => {
              const href = "/" + pathSegments.slice(0, index + 1).join("/");
              const segmentName = pages[segment];
              return (
                <div key={href} className="flex items-center">
                  <BreadcrumbItem>
                    {index !== pathSegments.length - 1 ? (
                      <BreadcrumbLink href={href}>{segmentName}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{segmentName}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index !== pathSegments.length - 1 && <BreadcrumbSeparator />}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DynamicBreadcrumb />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
