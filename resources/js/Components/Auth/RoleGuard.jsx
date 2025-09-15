import React from "react";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import useUserStore from "../../Stores/User/userStore";

export default function RoleGuard({ allowedRoles, children }) {
    const user = useUserStore((state) => state.user);

    if (user && !allowedRoles.includes(user.role || "")) return;

    return children;
}
