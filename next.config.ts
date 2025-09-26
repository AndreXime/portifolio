import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                // Aplicando essas regras a todas as rotas da API
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    // IMPORTANTE: Seja específico com a origem em produção
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: process.env.SUBDOMAIN ? process.env.SUBDOMAIN : 'http://localhost:3000',
                    },
                    // Em desenvolvimento, você pode usar "*" ou "http://localhost:3000"
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
