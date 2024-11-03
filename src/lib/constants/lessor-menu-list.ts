import {
    Users,
    Settings,
    LayoutGrid,
    LucideIcon,
    Home,
    List,
    Plus,
    Dot,
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    active: pathname.includes("/dashboard"),
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: "Contents",
            menus: [
                {
                    href: "/branch",
                    label: "Branches",
                    active: pathname.includes("/branch"),
                    icon: Home,
                    submenus: [
                        {
                            href: "/branch/1",
                            label: "Brranch",
                            active: pathname === "/branch/1",
                            icon: Dot
                        },
                        {
                            href: "/branch/add-branch",
                            label: "Add Branch",
                            active: pathname === "/branch/add-branch",
                            icon: Plus
                        },
                    ],
                },
                {
                    href: "/reservations",
                    label: "Reservations",
                    active: pathname.includes("/reservations"),
                    icon: List,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: "Settings",
            menus: [

                {
                    href: "/account",
                    label: "Account",
                    active: pathname.includes("/account"),
                    icon: Settings,
                    submenus: [],
                },
            ],
        },
    ];
}
