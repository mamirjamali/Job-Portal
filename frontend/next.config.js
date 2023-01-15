/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://127.0.0.1:8000",
    MAPBOX_ACCESS_TOKEN:"pk.eyJ1IjoibWFuaXJqYW1hbGkiLCJhIjoiY2xjeGI3Nmx2MGd2czNvcDduMXV2dHRrdyJ9.ab1DFx_yxpCKhSDl2udVGg"
  },
}

module.exports = nextConfig
