import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import MainLayout from "./Components/Layout/MainLayout";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];

        // Condition to skip wrapping page inside Main layout
        if (page.default.layout === undefined) {
            page.default.layout =
                page.default.layout ||
                ((page) => <MainLayout children={page} />);
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        // The color of the progress bar...
        color: "#01007d",
    },
});
