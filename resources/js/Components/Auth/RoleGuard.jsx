import React from "react";
import { usePage } from "@inertiajs/react";

export default function RoleGuard({ allowedRoles, children }) {
    const user = usePage().props.auth.user;

    if (user && !allowedRoles.includes(user.role_name || "")) return;

    return children;
}
