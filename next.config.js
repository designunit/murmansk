const backend = process.env.BACKEND_URL;
if (!backend) {
    console.log("BACKEND_URL not set");
    process.exit(1);
}

module.exports = {
    async rewrites() {
        return [
            {
                source: `/${encodeURIComponent("опрос")}`,
                destination: "/survey",
            },
            {
                source: "/api/v1/:path*",
                destination: `${backend}/:path*`,
            },
        ];
    },
};
