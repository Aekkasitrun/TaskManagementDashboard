import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/Dashboard.tsx"),
        route("tasks", "routes/Tasks.tsx")
] satisfies RouteConfig;
