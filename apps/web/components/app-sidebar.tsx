// "use client";

// import {
//   CreditCardIcon,
//   FolderOpenIcon,
//   HistoryIcon,
//   KeyIcon,
//   LogOutIcon,
//   StarIcon,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { toast } from "sonner";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "components/ui/sidebar";
// import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";
// import { authClient } from "@/lib/auth-client";

// const menuItems = [
//   {
//     title: "Main",
//     items: [
//       {
//         title: "Workflows",
//         icon: FolderOpenIcon,
//         url: "/workflows",
//       },
//       {
//         title: "Credentials",
//         icon: KeyIcon,
//         url: "/credentials",
//       },
//       {
//         title: "Executions",
//         icon: HistoryIcon,
//         url: "/executions",
//       },
//     ],
//   },
// ];

// export const AppSidebar = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarHeader>
//         <SidebarMenuItem>
//           <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
//             <Link href="/" prefetch>
//               <Image
//                 src="/logos/logo.svg?v=3"
//                 alt="Zeno"
//                 width={30}
//                 height={30}
//               />
//               <span className="font-semibold text-sm">Zeno</span>
//             </Link>
//           </SidebarMenuButton>
//         </SidebarMenuItem>
//       </SidebarHeader>
//       <SidebarContent>
//         {menuItems.map((group) => (
//           <SidebarGroup key={group.title}>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {group.items.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       tooltip={item.title}
//                       isActive={
//                         item.url === "/"
//                           ? pathname === "/"
//                           : pathname.startsWith(item.url)
//                       }
//                       asChild
//                       className="gap-x-4 h-10 px-4"
//                     >
//                       <Link href={item.url} prefetch>
//                         <item.icon className="size-4" />
//                         <span>{item.title}</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>
//       <SidebarFooter>
//         <SidebarMenu>
//           {!hasActiveSubscription && !isLoading && (
//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 tooltip="Upgade to Pro"
//                 className="gap-x-4 h-10 px-4"
//                 onClick={() => {
//                   toast.info(
//                     "Billing is not configured in this local environment.",
//                   );
//                 }}
//               >
//                 <StarIcon className="h-4 w-4" />
//                 <span>Upgrade to Pro</span>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           )}
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               tooltip="Billing Portal"
//               className="gap-x-4 h-10 px-4"
//               onClick={() => {
//                 toast.info(
//                   "Billing is not configured in this local environment.",
//                 );
//               }}
//             >
//               <CreditCardIcon className="h-4 w-4" />
//               <span>Billing Portal</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               tooltip="Sign out"
//               className="gap-x-4 h-10 px-4"
//               onClick={() =>
//                 authClient.signOut({
//                   fetchOptions: {
//                     onSuccess: () => {
//                       router.push("/login");
//                     },
//                   },
//                 })
//               }
//             >
//               <LogOutIcon className="h-4 w-4" />
//               <span>Sign out</span>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// };


"use client";

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
  UsersIcon,
  ChevronUp,
  User,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "components/ui/sidebar";

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
      {
        title: "Team Members",
        icon: UsersIcon,
        url: "/team",
      },
    ],
  },
];

export const AppSidebar = ({ user }: { user?: { name: string; email: string; image?: string; id: string } }) => {
  const router = useRouter();
  const pathname = usePathname();

  // frontend-only mock values
  const hasActiveSubscription = false;
  const isLoading = false;

  const fallbackText = user?.name ? user.name.substring(0, 2).toUpperCase() : "U";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href="/" prefetch>
              <Image
                src="/logos/logo.svg?v=3"
                alt="Zeno"
                width={85}
                height={25}
              />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      asChild
                      className="gap-x-4 h-10 px-4"
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.image || ""} alt="User" />
                    <AvatarFallback className="rounded-lg bg-neutral-800 text-white">{fallbackText}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name || "User"}</span>
                    <span className="truncate text-xs text-neutral-400">{user?.email || "user@example.com"}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-neutral-900 border-neutral-800 text-white"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.image || ""} alt="User" />
                      <AvatarFallback className="rounded-lg bg-neutral-800 text-white">{fallbackText}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name || "User"}</span>
                      <span className="truncate text-xs text-neutral-400">{user?.email || "user@example.com"}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neutral-800" />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white">
                    <Link href="/settings">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white">
                    <Link href="/settings?tab=preferences">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-neutral-800" />
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 focus:text-white text-red-400 focus:text-red-400"
                  onClick={() => {
                    toast.success("Signed out");
                    router.push("/login");
                  }}
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
