import { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse } from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const getUrl = id => {
        switch (id) {
            case 'sklon-karla':
                return (
                    'https://script.google.com/macros/s/AKfycbyp8TexKZAqtUrsWjeiMbMwvtcT3GV5qdteQm2KBS_QYgclFRhMpxBetBeibezFjk_g7w/exec'
                )

            default:
                return ('')
        }
    }

    await fetch(
        getUrl(JSON.parse(req.body).id),
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
    // await axios.post(
    //     getUrl(JSON.parse(req.body).id),
    //     req.body as string,
    // )
    // .then((axiosRes: AxiosResponse) => {
    //     res
    //         .status(axiosRes.status)
    //         .json(axiosRes.data)
    // })
}