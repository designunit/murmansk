import { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse } from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const getUrl = id => {
        switch (id) {
            case 'sklon-karla':
                return (
                    'https://script.google.com/macros/s/AKfycbyp8TexKZAqtUrsWjeiMbMwvtcT3GV5qdteQm2KBS_QYgclFRhMpxBetBeibezFjk_g7w/exec'
                )
            case 'abram-mys':
                return (
                    'https://script.google.com/macros/s/AKfycbw-1IBZIB7dNtxfRLRYEvHj6yJ3btYfZKl0PfKhidiX9bw7bKpR7ElNXGZznhGVVOw2Xw/exec'
                )
            case 'severny':
                return (
                    'https://script.google.com/macros/s/AKfycbxJMBMcDfz1M1Ebtwe_ogreGQ9T6j-7IBh6PnBdUZu4BEt0OTHxOQhpBi_1MovVuc0/exec'
                )
            case 'skver-shmidta':
                return (
                    'https://script.google.com/macros/s/AKfycbwAnMNCLJNd2pSRAl6nHV7iksEyZ-Pprla4zGx47gOvzObhSSmLIxGaQ0LF3wc4sGti0g/exec'
                )
            case 'kildinskaya':
                return (
                    'https://script.google.com/macros/s/AKfycbzRKT1bPf5Mkp542CKOqyzT7pHg_gyl41KFSJBZlGS0M0lAfssl20_fILj1RFhIDlnZ1g/exec'
                )
            case 'dostoevskogo':
                return (
                    'https://script.google.com/macros/s/AKfycbwNE2XwUbZ5RhYlJdusADVrWASzuFwuoJ8KwcbW9RR1D0Z0WUyMztV-f5jU0GsC50_3/exec'
                )
            default:
                return (null)
        }
    }

    const url = getUrl(JSON.parse(req.body).id)
    if (!url) {
        res
            .status(500)
            .json({
                result: 'error',
                reason: 'invalid form id',
            })

        return
    }

    await fetch(
        url,
        {
            method: 'post',
            body: req.body as string
        },
    ).then(async value => {
        console.log(value.status)
        res
            .status(value.status)
            .json(await value.json())
    })
}