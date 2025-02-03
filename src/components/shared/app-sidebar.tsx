import { Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Accueil",
    url: "/home",
    icon: Home,
  },
  {
    title: "Orientation",
    url: "/home/orientation",
    icon: Inbox,
  },
  {
    title: "Actualités",
    url: "/home/news",
    icon: Search,
  },
  {
    title: "Paramètres",
    url: "/home/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const activeRoute = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold mb-2">
            <Link
              className="text-2xl text-black font-semibold hover:cursor-pointer"
              href={"/home"}
            >
              EduNExt
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="my-16">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="py-5 data-[active=true]:bg-secondary data-[active=true]:hover:bg-secondary/90 hover:bg-secondary"
                    asChild
                    isActive={activeRoute === item.url}
                  >
                    <Link className="my-1" href={item.url}>
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
