
module.exports = {
    async rewrites() {
        return [
            {
                source: `/${encodeURIComponent('опрос')}`,
                destination: '/survey',
            },
        ]
    }
}