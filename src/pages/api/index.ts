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